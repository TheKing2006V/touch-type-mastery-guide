
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '@/hooks/useGamification';
import { Calendar, Target, Zap, Trophy, CheckCircle } from 'lucide-react';

const DailyChallenge = () => {
  const { getDailyChallenge, isDailyChallengeAvailable, gameStats } = useGamification();
  const [showChallenge, setShowChallenge] = useState(false);
  
  const challenge = getDailyChallenge();
  const isAvailable = isDailyChallengeAvailable();
  const isCompleted = gameStats.dailyChallengeCompleted && gameStats.dailyChallengeDate === new Date().toDateString();

  const getIcon = () => {
    switch (challenge.type) {
      case 'numbers':
        return <Target className="w-5 h-5" />;
      case 'speed':
        return <Zap className="w-5 h-5" />;
      case 'accuracy':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (challenge.type) {
      case 'numbers':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'speed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accuracy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            Daily Challenge
          </div>
          {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <Badge className={getTypeColor()}>
              {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
            </Badge>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            +{challenge.reward} XP
          </Badge>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-1">{challenge.description}</h4>
          <p className="text-gray-400 text-sm">
            {showChallenge ? challenge.text : `${challenge.text.substring(0, 50)}...`}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowChallenge(!showChallenge)}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {showChallenge ? 'Hide' : 'Show'} Text
          </Button>
          
          {isCompleted ? (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              ✓ Completed
            </Badge>
          ) : (
            <Button
              disabled={!isAvailable}
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isAvailable ? 'Start Challenge' : 'Challenge Completed'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
