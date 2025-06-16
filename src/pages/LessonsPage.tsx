
import { useState } from 'react';
import LessonCard from '@/components/LessonCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const LessonsPage = () => {
  const { toast } = useToast();
  
  const [lessons] = useState([
    {
      id: 1,
      title: "Home Row Fundamentals",
      description: "Learn the foundation of touch typing with home row keys (ASDF JKL;)",
      difficulty: 'Beginner' as const,
      duration: "15 min",
      accuracy: 95,
      isCompleted: true
    },
    {
      id: 2,
      title: "Top Row Mastery",
      description: "Master the top row keys (QWERTY UIOP) with proper finger placement",
      difficulty: 'Beginner' as const,
      duration: "20 min",
      accuracy: 88,
      isCompleted: true
    },
    {
      id: 3,
      title: "Bottom Row Training",
      description: "Practice bottom row keys (ZXCVBNM) and build muscle memory",
      difficulty: 'Intermediate' as const,
      duration: "18 min",
      accuracy: 82,
      isCompleted: true
    },
    {
      id: 4,
      title: "Numbers & Special Characters",
      description: "Learn to type numbers and special characters efficiently",
      difficulty: 'Intermediate' as const,
      duration: "25 min",
      accuracy: 0,
      isCompleted: false
    },
    {
      id: 5,
      title: "Common Word Patterns",
      description: "Practice typing common English word patterns and combinations",
      difficulty: 'Intermediate' as const,
      duration: "30 min",
      accuracy: 0,
      isCompleted: false
    },
    {
      id: 6,
      title: "Advanced Punctuation",
      description: "Master complex punctuation and symbol combinations",
      difficulty: 'Advanced' as const,
      duration: "35 min",
      accuracy: 0,
      isCompleted: false
    },
    {
      id: 7,
      title: "Speed Building Drills",
      description: "Intensive drills to increase your typing speed significantly",
      difficulty: 'Advanced' as const,
      duration: "40 min",
      accuracy: 0,
      isCompleted: false
    },
    {
      id: 8,
      title: "Programming Syntax",
      description: "Practice typing code syntax and programming-specific characters",
      difficulty: 'Advanced' as const,
      duration: "45 min",
      accuracy: 0,
      isCompleted: false
    }
  ]);

  const handleStartLesson = (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    toast({
      title: "Starting Lesson",
      description: `Beginning "${lesson?.title}" - Get ready to practice!`,
    });
    // TODO: Navigate to specific lesson practice
  };

  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

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
              {completedLessons}/{lessons.length} Complete
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
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            difficulty={lesson.difficulty}
            duration={lesson.duration}
            accuracy={lesson.accuracy}
            isCompleted={lesson.isCompleted}
            onStart={() => handleStartLesson(lesson.id)}
          />
        ))}
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
