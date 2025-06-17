
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Calendar, Trophy, Target, TrendingUp, Clock } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { useState } from 'react';

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { progress, stats, loading } = useUserProgress();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Profile</h1>
            <p className="text-gray-300">Sign in to view your typing profile and progress</p>
          </div>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-8 text-center">
              <User className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Sign In Required</h3>
              <p className="text-gray-400 mb-6">
                Create an account to track your progress, earn achievements, and compete with friends.
              </p>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = 12; // Based on lesson data
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Profile</h1>
        <p className="text-gray-300">Track your typing journey and achievements</p>
      </div>

      {/* Profile Info */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                {user.user_metadata?.username || user.email?.split('@')[0]}
              </h2>
              <div className="flex items-center space-x-2 text-gray-400 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 mt-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="text-right">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-2">
                Level {stats?.current_level || 1}
              </Badge>
              <div className="text-sm text-gray-400">
                {stats?.experience_points || 0} XP
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      {loading ? (
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-gray-400">Loading your stats...</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats?.average_wpm || 0}</p>
              <p className="text-sm text-gray-400">Average WPM</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stats?.average_accuracy || 0}%</p>
              <p className="text-sm text-gray-400">Average Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{completedLessons}</p>
              <p className="text-sm text-gray-400">Lessons Complete</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{Math.round((stats?.total_typing_time || 0) / 60)}</p>
              <p className="text-sm text-gray-400">Minutes Typed</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Details */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Overall Progress</span>
            <span className="text-white">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="text-center text-gray-400">
            {completedLessons} of {totalLessons} lessons completed
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {progress.length > 0 ? (
            <div className="space-y-3">
              {progress
                .filter(p => p.last_attempted_at)
                .sort((a, b) => new Date(b.last_attempted_at).getTime() - new Date(a.last_attempted_at).getTime())
                .slice(0, 5)
                .map((attempt, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <div>
                      <div className="text-white font-medium">Lesson {attempt.lesson_id}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(attempt.last_attempted_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{attempt.best_wpm} WPM</div>
                      <div className="text-sm text-gray-400">{attempt.best_accuracy}% accuracy</div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No activity yet. Start practicing to see your progress here!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
