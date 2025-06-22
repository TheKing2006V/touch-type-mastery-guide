
import { useEffect, useState } from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

interface XPPopupProps {
  xpGained: number;
  levelUp: boolean;
  onClose: () => void;
}

const XPPopup = ({ xpGained, levelUp, onClose }: XPPopupProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!xpGained && !levelUp) return null;

  return (
    <div 
      className={`fixed top-4 left-4 z-50 xp-popup transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="space-y-2">
        {levelUp && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg shadow-xl border-2 border-purple-300 animate-bounce">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-white" />
              <div>
                <h3 className="font-bold text-white text-lg">🎉 Level Up!</h3>
                <p className="text-purple-100 text-sm">You've reached a new level!</p>
              </div>
            </div>
          </div>
        )}
        
        {xpGained > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-lg shadow-xl border-2 border-blue-300">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-white" />
              <div>
                <h3 className="font-bold text-white text-lg">+{xpGained} XP</h3>
                <p className="text-blue-100 text-sm">Experience gained!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default XPPopup;
