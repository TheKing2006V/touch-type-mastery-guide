
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProgress {
  lesson_id: number;
  completed: boolean;
  best_wpm: number;
  best_accuracy: number;
  attempts: number;
  first_completed_at: string | null;
  last_attempted_at: string;
}

interface UserStats {
  total_lessons_completed: number;
  total_typing_time: number;
  average_wpm: number;
  average_accuracy: number;
  total_characters_typed: number;
  current_level: number;
  experience_points: number;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (statsError) throw statsError;

      setProgress(progressData || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    lessonId: number, 
    wpm: number, 
    accuracy: number, 
    timeElapsed: number
  ) => {
    if (!user) return;

    try {
      const existingProgress = progress.find(p => p.lesson_id === lessonId);
      const isCompleted = accuracy >= 80; // Consider lesson completed if accuracy >= 80%
      const isNewRecord = !existingProgress || wpm > existingProgress.best_wpm;

      const progressData = {
        user_id: user.id,
        lesson_id: lessonId,
        completed: isCompleted,
        best_wpm: Math.max(wpm, existingProgress?.best_wpm || 0),
        best_accuracy: Math.max(accuracy, existingProgress?.best_accuracy || 0),
        attempts: (existingProgress?.attempts || 0) + 1,
        first_completed_at: existingProgress?.first_completed_at || (isCompleted ? new Date().toISOString() : null),
        last_attempted_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_progress')
        .upsert(progressData, { onConflict: 'user_id,lesson_id' });

      if (error) throw error;

      // Update typing time in user_stats
      if (stats) {
        const { error: statsError } = await supabase
          .from('user_stats')
          .update({ 
            total_typing_time: stats.total_typing_time + timeElapsed,
            total_characters_typed: stats.total_characters_typed + (wpm * 5 * (timeElapsed / 60))
          })
          .eq('user_id', user.id);

        if (statsError) console.error('Error updating stats:', statsError);
      }

      // Refresh data
      await fetchProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getProgressForLesson = (lessonId: number) => {
    return progress.find(p => p.lesson_id === lessonId);
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return {
    progress,
    stats,
    loading,
    updateProgress,
    getProgressForLesson,
    refetch: fetchProgress
  };
};
