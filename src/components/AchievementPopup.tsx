
import { useEffect, useState } from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  desc: string;
  unlocked: boolean;
  icon?: string;
}

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementPopup = ({ achievement, onClose }: AchievementPopupProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = (achievementId: string) => {
    switch (achievementId) {
      case 'first_30wpm':
        return <Zap className="w-6 h-6" />;
      case 'accuracy_95':
        return <Target className="w-6 h-6" />;
      case 'practice_7days':
        return <Star className="w-6 h-6" />;
      case 'lesson_10':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-50 achievement-popup transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg shadow-xl border-2 border-yellow-300">
        <div className="flex items-center gap-3">
          <div className="achievement-badge text-white">
            {getIcon(achievement.id)}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">🏆 Achievement Unlocked!</h3>
            <p className="text-white font-semibold">{achievement.name}</p>
            <p className="text-yellow-100 text-sm">{achievement.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
