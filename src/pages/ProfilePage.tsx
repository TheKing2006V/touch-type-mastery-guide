import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Calendar, Trophy, Target, TrendingUp, Clock, Star } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { useState } from 'react';

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { progress, stats, loading } = useUserProgress();
  const { getUnlockedCount } = useAchievements();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Local storage for guest users
  const [guestProfile] = useLocalStorage('guest_profile', {
    displayName: 'Guest User',
    level: 1,
    xp: 0,
    joinDate: new Date().toISOString()
  });

  const [guestStats] = useLocalStorage('guest_typing_stats', {
    bestWPM: 0,
    bestAccuracy: 0,
    totalPracticeTime: 0,
    lessonsCompleted: 0
  });

  if (authLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const completedLessons = user ? progress.filter(p => p.completed).length : guestStats.lessonsCompleted;
  const totalLessons = 12; // Based on lesson data
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const currentLevel = user ? (stats?.current_level || 1) : guestProfile.level;
  const currentXP = user ? (stats?.experience_points || 0) : guestProfile.xp;
  const achievementsCount = user ? getUnlockedCount() : 0;

  if (!user) {
    return (
      <>
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Guest Profile View */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Profile</h1>
            <p className="text-gray-300">Track your typing progress and achievements</p>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-300 text-sm">
                You're viewing as a guest. <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="underline hover:text-blue-200"
                >
                  Sign in
                </button> to save your progress and unlock more features!
              </p>
            </div>
          </div>

          {/* Guest Profile Info */}
          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gray-600 text-white text-xl">
                    G
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">
                    {guestProfile.displayName}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-400 mt-1">
                    <Star className="w-4 h-4" />
                    <span>Guest User</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Browsing since today</span>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 mb-2">
                    Guest Level {currentLevel}
                  </Badge>
                  <div className="text-sm text-gray-400">
                    {currentXP} XP
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-950/80 border-gray-800">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{guestStats.bestWPM}</p>
                <p className="text-sm text-gray-400">Best Speed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-950/80 border-gray-800">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{guestStats.bestAccuracy}%</p>
                <p className="text-sm text-gray-400">Best Accuracy</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-950/80 border-gray-800">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{completedLessons}</p>
                <p className="text-sm text-gray-400">Lessons Done</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-950/80 border-gray-800">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{Math.round(guestStats.totalPracticeTime / 60)}</p>
                <p className="text-sm text-gray-400">Minutes Typed</p>
              </CardContent>
            </Card>
          </div>

          {/* Encouragement to Sign Up */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Unlock Your Full Potential</h3>
              <p className="text-gray-300 mb-6">
                Sign up to save your progress, earn achievements, compete with friends, and access advanced features.
              </p>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Sign Up Now
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
