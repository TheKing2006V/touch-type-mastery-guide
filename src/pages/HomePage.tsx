
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TypingTest from '@/components/TypingTest';
import { BookOpen, Trophy, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';

const HomePage = () => {
  const { user } = useAuth();
  const { progress, stats, loading } = useUserProgress();

  const completedCount = user ? progress.filter(p => p.completed).length : 8;
  const totalLessons = 12;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch Typing</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Improve your typing speed and accuracy with our comprehensive lessons and real-time feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/lessons">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
          </Link>
          <Link to="/achievements">
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white">
              <Trophy className="w-5 h-5 mr-2" />
              View Achievements
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {user && stats ? stats.average_wpm : 45}
            </p>
            <p className="text-sm text-gray-400">Average WPM</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {user && stats ? `${stats.average_accuracy}%` : '92%'}
            </p>
            <p className="text-sm text-gray-400">Accuracy</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {completedCount}/{totalLessons}
            </p>
            <p className="text-sm text-gray-400">Lessons Complete</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {user && stats ? Math.floor(stats.experience_points / 100) : 5}
            </p>
            <p className="text-sm text-gray-400">Achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">
            {user ? 'Your Progress' : 'Sample Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm">
                This is sample data. <Link to="/lessons" className="underline hover:text-blue-200">Sign in</Link> to see your actual progress!
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overall Course Progress</span>
              <span className="text-white">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Home Row Mastery</span>
                <span className="text-white">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Top Row Practice</span>
                <span className="text-white">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Bottom Row Training</span>
                <span className="text-white">{user ? Math.min(progressPercentage, 50) : 50}%</span>
              </div>
              <Progress value={user ? Math.min(progressPercentage, 50) : 50} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Numbers & Symbols</span>
                <span className="text-white">{user ? Math.min(progressPercentage, 25) : 25}%</span>
              </div>
              <Progress value={user ? Math.min(progressPercentage, 25) : 25} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Typing Test */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Typing Test</h2>
        <TypingTest />
      </div>
    </div>
  );
};

export default HomePage;
