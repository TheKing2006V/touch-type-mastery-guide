
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock, Star, Target, Zap, Clock, BookOpen, Award } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import AchievementPopup from '@/components/AchievementPopup';

const AchievementsPage = () => {
  const { user } = useAuth();
  const { achievements, newAchievements, checkAchievements, dismissAchievement, getUnlockedCount, getTotalCount } = useAchievements();
  const { stats } = useUserProgress();
  
  // For non-logged users, use local storage to track basic progress
  const [guestStats] = useLocalStorage('guest_typing_stats', {
    bestWPM: 0,
    bestAccuracy: 0,
    totalPracticeTime: 0,
    lessonsCompleted: 0,
    practiceStreak: 0
  });

  const currentStats = user ? {
    currentWPM: stats?.average_wpm || 0,
    bestAccuracy: stats?.average_accuracy || 0,
    practiceStreak: 0, // This would need to be tracked separately
    lessonsCompleted: stats?.total_lessons_completed || 0,
    totalPracticeTime: stats?.total_typing_time || 0
  } : {
    currentWPM: guestStats.bestWPM,
    bestAccuracy: guestStats.bestAccuracy,
    practiceStreak: guestStats.practiceStreak,
    lessonsCompleted: guestStats.lessonsCompleted,
    totalPracticeTime: guestStats.totalPracticeTime
  };

  const getAchievementIcon = (achievementId: string) => {
    switch (achievementId) {
      case 'first_30wpm':
        return <Zap className="w-6 h-6" />;
      case 'accuracy_95':
        return <Target className="w-6 h-6" />;
      case 'practice_7days':
        return <Star className="w-6 h-6" />;
      case 'lesson_10':
        return <BookOpen className="w-6 h-6" />;
      case 'speed_demon':
        return <Zap className="w-6 h-6 text-red-400" />;
      case 'perfect_score':
        return <Award className="w-6 h-6" />;
      case 'marathon':
        return <Clock className="w-6 h-6" />;
      case 'lesson_master':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  const getProgressForAchievement = (achievementId: string) => {
    switch (achievementId) {
      case 'first_30wpm':
        return Math.min((currentStats.currentWPM / 30) * 100, 100);
      case 'accuracy_95':
        return Math.min((currentStats.bestAccuracy / 95) * 100, 100);
      case 'practice_7days':
        return Math.min((currentStats.practiceStreak / 7) * 100, 100);
      case 'lesson_10':
        return Math.min((currentStats.lessonsCompleted / 10) * 100, 100);
      case 'speed_demon':
        return Math.min((currentStats.currentWPM / 60) * 100, 100);
      case 'perfect_score':
        return Math.min((currentStats.bestAccuracy / 100) * 100, 100);
      case 'marathon':
        return Math.min((currentStats.totalPracticeTime / 3600) * 100, 100);
      case 'lesson_master':
        return Math.min((currentStats.lessonsCompleted / 25) * 100, 100);
      default:
        return 0;
    }
  };

  const unlockedCount = getUnlockedCount();
  const totalCount = getTotalCount();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Achievements</h1>
        <p className="text-gray-300">Track your typing milestones and unlock rewards</p>
        
        {!user && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-300 text-sm">
              You're viewing achievements as a guest. Sign in to save your progress and unlock achievements automatically!
            </p>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {unlockedCount}/{totalCount}
            </div>
            <p className="text-gray-400">Achievements Unlocked</p>
            <Progress 
              value={(unlockedCount / totalCount) * 100} 
              className="mt-4 h-2" 
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {Math.round(currentStats.bestAccuracy)}%
            </div>
            <p className="text-gray-400">Best Accuracy</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {Math.round(currentStats.currentWPM)}
            </div>
            <p className="text-gray-400">Best Speed (WPM)</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const progress = getProgressForAchievement(achievement.id);
          const isUnlocked = achievement.unlocked;
          
          return (
            <Card 
              key={achievement.id} 
              className={`bg-gray-950/80 border-gray-800 transition-all duration-300 ${
                isUnlocked 
                  ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-gray-950/80' 
                  : 'hover:border-gray-700'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${
                    isUnlocked 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {isUnlocked ? getAchievementIcon(achievement.id) : <Lock className="w-6 h-6" />}
                  </div>
                  {isUnlocked && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className={`text-lg font-semibold ${
                    isUnlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{achievement.desc}</p>
                </div>

                {!isUnlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {isUnlocked && achievement.unlockedAt && (
                  <div className="text-xs text-yellow-400">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Categories */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Achievement Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Speed Achievements</span>
              </h4>
              <p className="text-gray-400 text-sm">Unlock by reaching typing speed milestones</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-400" />
                <span>Precision Achievements</span>
              </h4>
              <p className="text-gray-400 text-sm">Unlock by maintaining high accuracy</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Learning Achievements</span>
              </h4>
              <p className="text-gray-400 text-sm">Unlock by completing lessons and practicing</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Dedication Achievements</span>
              </h4>
              <p className="text-gray-400 text-sm">Unlock through consistent practice and time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Popups */}
      {newAchievements.map((achievement, index) => (
        <AchievementPopup
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={dismissAchievement}
        />
      ))}
    </div>
  );
};

export default AchievementsPage;
