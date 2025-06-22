
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/hooks/useGamification';
import { Star, TrendingUp, Flame, Award } from 'lucide-react';

const GameStatsBar = () => {
  const { gameStats } = useGamification();
  
  const progressPercentage = gameStats.nextLevelXP > 0 
    ? (gameStats.currentLevelXP / (gameStats.nextLevelXP - gameStats.currentLevelXP + gameStats.currentLevelXP)) * 100 
    : 0;

  return (
    <Card className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-700">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Level */}
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Level</p>
              <p className="text-xl font-bold text-white">{gameStats.level}</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="md:col-span-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Experience</span>
              <span className="text-white">
                {gameStats.currentLevelXP} / {gameStats.nextLevelXP - (gameStats.nextLevelXP - gameStats.currentLevelXP)} XP
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Streak */}
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-sm text-gray-400">Streak</p>
              <p className="text-xl font-bold text-white">{gameStats.streak} days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStatsBar;
