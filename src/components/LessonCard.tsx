
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Star } from 'lucide-react';

interface LessonCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  accuracy: number;
  isCompleted: boolean;
  onStart: () => void;
}

const LessonCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  accuracy, 
  isCompleted, 
  onStart 
}: LessonCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-200 hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          {isCompleted && (
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          )}
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {isCompleted && (
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>{accuracy}% accuracy</span>
            </div>
          )}
        </div>

        <Button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isCompleted ? 'Practice Again' : 'Start Lesson'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
