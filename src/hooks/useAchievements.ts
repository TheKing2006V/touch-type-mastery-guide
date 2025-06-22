
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Achievement {
  id: string;
  name: string;
  desc: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementProgress {
  currentWPM: number;
  bestAccuracy: number;
  practiceStreak: number;
  lessonsCompleted: number;
  totalPracticeTime: number;
}

export const useAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first_30wpm', name: 'Speed Starter', desc: 'Reach 30 WPM', unlocked: false },
    { id: 'accuracy_95', name: 'Precision Master', desc: '95% accuracy', unlocked: false },
    { id: 'practice_7days', name: 'Consistent Learner', desc: '7 days streak', unlocked: false },
    { id: 'lesson_10', name: 'Dedicated Student', desc: 'Complete 10 lessons', unlocked: false },
    { id: 'speed_demon', name: 'Speed Demon', desc: 'Reach 60 WPM', unlocked: false },
    { id: 'perfect_score', name: 'Perfectionist', desc: '100% accuracy', unlocked: false },
    { id: 'marathon', name: 'Marathon Typist', desc: '60 minutes practice', unlocked: false },
    { id: 'lesson_master', name: 'Lesson Master', desc: 'Complete 25 lessons', unlocked: false }
  ]);
  
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Load achievements from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem(`achievements_${user?.id || 'guest'}`);
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, [user]);

  // Save achievements to localStorage
  useEffect(() => {
    localStorage.setItem(`achievements_${user?.id || 'guest'}`, JSON.stringify(achievements));
  }, [achievements, user]);

  const checkAchievements = (progress: AchievementProgress) => {
    const newlyUnlocked: Achievement[] = [];

    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;

        switch (achievement.id) {
          case 'first_30wpm':
            shouldUnlock = progress.currentWPM >= 30;
            break;
          case 'accuracy_95':
            shouldUnlock = progress.bestAccuracy >= 95;
            break;
          case 'practice_7days':
            shouldUnlock = progress.practiceStreak >= 7;
            break;
          case 'lesson_10':
            shouldUnlock = progress.lessonsCompleted >= 10;
            break;
          case 'speed_demon':
            shouldUnlock = progress.currentWPM >= 60;
            break;
          case 'perfect_score':
            shouldUnlock = progress.bestAccuracy >= 100;
            break;
          case 'marathon':
            shouldUnlock = progress.totalPracticeTime >= 3600; // 60 minutes in seconds
            break;
          case 'lesson_master':
            shouldUnlock = progress.lessonsCompleted >= 25;
            break;
        }

        if (shouldUnlock && !achievement.unlocked) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString()
          };
          newlyUnlocked.push(unlockedAchievement);
          return unlockedAchievement;
        }

        return achievement;
      });

      return updated;
    });

    // Add new achievements to the queue for popups
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
    }
  };

  const dismissAchievement = () => {
    setNewAchievements(prev => prev.slice(1));
  };

  const getUnlockedCount = () => achievements.filter(a => a.unlocked).length;
  const getTotalCount = () => achievements.length;

  return {
    achievements,
    newAchievements,
    checkAchievements,
    dismissAchievement,
    getUnlockedCount,
    getTotalCount
  };
};
