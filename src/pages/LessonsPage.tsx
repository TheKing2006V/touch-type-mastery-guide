
import { useState } from 'react';
import LessonCard from '@/components/LessonCard';
import LessonPractice from '@/components/LessonPractice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { lessonData, type LessonData } from '@/data/lessonData';

const LessonsPage = () => {
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  
  // Mock completed lessons state - in a real app this would come from a database
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 2, 3]));
  const [lessonStats, setLessonStats] = useState<{[key: number]: {accuracy: number, wpm: number}}>({
    1: { accuracy: 95, wpm: 18 },
    2: { accuracy: 88, wpm: 22 },
    3: { accuracy: 82, wpm: 26 }
  });

  const handleStartLesson = (lessonId: number) => {
    const lesson = lessonData.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  const handleLessonComplete = (lessonId: number, stats: { wpm: number; accuracy: number; timeElapsed: number }) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    setLessonStats(prev => ({
      ...prev,
      [lessonId]: { accuracy: stats.accuracy, wpm: stats.wpm }
    }));
    
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

  const completedCount = completedLessons.size;
  const progressPercentage = (completedCount / lessonData.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Typing Lessons
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Follow our structured curriculum to master touch typing step by step.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Course Progress
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {completedCount}/{lessonData.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonData.map((lesson) => {
          const isCompleted = completedLessons.has(lesson.id);
          const stats = lessonStats[lesson.id];
          
          return (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              difficulty={lesson.difficulty}
              duration={lesson.duration}
              accuracy={stats?.accuracy || 0}
              isCompleted={isCompleted}
              onStart={() => handleStartLesson(lesson.id)}
            />
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Learning Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Focus on Accuracy First</h4>
              <p className="text-gray-400 text-sm">Speed will naturally increase as you build muscle memory with correct finger placement.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Practice Regularly</h4>
              <p className="text-gray-400 text-sm">Consistent daily practice for 15-30 minutes is more effective than longer, infrequent sessions.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Proper Posture</h4>
              <p className="text-gray-400 text-sm">Sit up straight, keep your wrists floating, and maintain a comfortable distance from the screen.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Don't Look Down</h4>
              <p className="text-gray-400 text-sm">Resist the urge to look at the keyboard. Trust the lessons and build that muscle memory!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonsPage;
