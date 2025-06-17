
import { useState } from 'react';
import LessonCard from '@/components/LessonCard';
import LessonPractice from '@/components/LessonPractice';
import AuthModal from '@/components/AuthModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { lessonData, type LessonData } from '@/data/lessonData';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { LogIn } from 'lucide-react';

const LessonsPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { progress, stats, loading, updateProgress, getProgressForLesson } = useUserProgress();
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleStartLesson = (lessonId: number) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const lesson = lessonData.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  const handleLessonComplete = async (lessonId: number, stats: { wpm: number; accuracy: number; timeElapsed: number }) => {
    if (!user) return;

    await updateProgress(lessonId, stats.wpm, stats.accuracy, stats.timeElapsed);
    
    toast({
      title: "Lesson Completed!",
      description: `Great job! WPM: ${stats.wpm}, Accuracy: ${stats.accuracy}%`,
    });
    
    setSelectedLesson(null);
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
  };

  // If a lesson is selected, show the practice component
  if (selectedLesson) {
    return (
      <LessonPractice
        lesson={selectedLesson}
        onComplete={(stats) => handleLessonComplete(selectedLesson.id, stats)}
        onBack={handleBackToLessons}
      />
    );
  }

  // Show auth prompt if not logged in
  if (!user) {
    return (
      <>
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Typing Lessons
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Sign in to track your progress and unlock achievements as you master touch typing.
            </p>
          </div>

          <Card className="bg-gray-950/80 border-gray-800 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <LogIn className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Sign In Required</h3>
              <p className="text-gray-400 mb-6">
                Create an account or sign in to save your progress and compete with friends.
              </p>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Preview of lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
            {lessonData.slice(0, 6).map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                difficulty={lesson.difficulty}
                duration={lesson.duration}
                accuracy={0}
                isCompleted={false}
                onStart={() => setIsAuthModalOpen(true)}
              />
            ))}
          </div>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-xl">Loading your progress...</div>
      </div>
    );
  }

  const completedCount = progress.filter(p => p.completed).length;
  const progressPercentage = (completedCount / lessonData.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Typing Lessons
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Follow our structured curriculum to master touch typing step by step.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Course Progress
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {completedCount}/{lessonData.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{stats?.current_level || 1}</div>
                <div className="text-sm text-gray-400">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats?.average_wpm || 0}</div>
                <div className="text-sm text-gray-400">Avg WPM</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats?.average_accuracy || 0}%</div>
                <div className="text-sm text-gray-400">Avg Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{Math.round((stats?.total_typing_time || 0) / 60)}</div>
                <div className="text-sm text-gray-400">Minutes Typed</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Overall Progress</span>
                <span className="text-white">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonData.map((lesson) => {
          const userProgress = getProgressForLesson(lesson.id);
          const isCompleted = userProgress?.completed || false;
          const accuracy = userProgress?.best_accuracy || 0;
          
          return (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              difficulty={lesson.difficulty}
              duration={lesson.duration}
              accuracy={accuracy}
              isCompleted={isCompleted}
              onStart={() => handleStartLesson(lesson.id)}
            />
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Learning Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Focus on Accuracy First</h4>
              <p className="text-gray-300 text-sm">Speed will naturally increase as you build muscle memory with correct finger placement.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Practice Regularly</h4>
              <p className="text-gray-300 text-sm">Consistent daily practice for 15-30 minutes is more effective than longer, infrequent sessions.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Proper Posture</h4>
              <p className="text-gray-300 text-sm">Sit up straight, keep your wrists floating, and maintain a comfortable distance from the screen.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Don't Look Down</h4>
              <p className="text-gray-300 text-sm">Resist the urge to look at the keyboard. Trust the lessons and build that muscle memory!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonsPage;
