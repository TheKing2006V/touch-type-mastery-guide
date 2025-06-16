
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TypingTest from '@/components/TypingTest';
import { BookOpen, Trophy, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Touch Typing</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Improve your typing speed and accuracy with our comprehensive lessons and real-time feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/lessons">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Trophy className="w-5 h-5 mr-2" />
            View Achievements
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">45</p>
            <p className="text-sm text-gray-400">Average WPM</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">92%</p>
            <p className="text-sm text-gray-400">Accuracy</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">8/12</p>
            <p className="text-sm text-gray-400">Lessons Complete</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-sm text-gray-400">Achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overall Course Progress</span>
              <span className="text-white">67%</span>
            </div>
            <Progress value={67} className="h-2" />
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
                <span className="text-white">50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Numbers & Symbols</span>
                <span className="text-white">25%</span>
              </div>
              <Progress value={25} className="h-2" />
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
