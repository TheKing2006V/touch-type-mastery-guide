import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InteractiveKeyboard from './InteractiveKeyboard';
import AchievementPopup from './AchievementPopup';
import LocalAnalytics from './LocalAnalytics';
import XPPopup from './XPPopup';
import GameStatsBar from './GameStatsBar';
import DailyChallenge from './DailyChallenge';
import { Play, RotateCcw, Clock, Target, Zap, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAchievements } from '@/hooks/useAchievements';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGamification } from '@/hooks/useGamification';

interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  correctChars: number;
  totalChars: number;
  errors: number;
}

interface TypingSession {
  date: string;
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  correctChars: number;
  totalChars: number;
}

const TypingTest = () => {
  const { toast } = useToast();
  const { achievements, newAchievements, checkAchievements, dismissAchievement } = useAchievements();
  const { gameStats, newXPGained, levelUp, awardXP, getDailyChallenge } = useGamification();
  const [sessionHistory, setSessionHistory] = useLocalStorage<TypingSession[]>('typingHistory', []);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. This is a sample text for practicing touch typing skills. Focus on accuracy first, then build up your speed gradually.");
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(new Set<string>());
  const [incorrectKeys, setIncorrectKeys] = useState(new Set<string>());
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    timeElapsed: 0,
    correctChars: 0,
    totalChars: 0,
    errors: 0
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  useEffect(() => {
    calculateStats();
  }, [userInput, timeElapsed]);

  const calculateStats = () => {
    const totalChars = userInput.length;
    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < totalChars; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }

    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;
    const words = correctChars / 5;
    const minutes = timeElapsed / 60;
    const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

    setStats({
      wpm,
      accuracy: Math.round(accuracy),
      timeElapsed,
      correctChars,
      totalChars,
      errors
    });
  };

  const saveSession = (finalStats: TypingStats) => {
    const session: TypingSession = {
      date: new Date().toISOString(),
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      duration: finalStats.timeElapsed,
      errors: finalStats.errors,
      correctChars: finalStats.correctChars,
      totalChars: finalStats.totalChars
    };

    setSessionHistory(prev => [...prev, session]);

    // Award XP based on performance
    const xpResult = awardXP(finalStats.wpm, finalStats.accuracy, finalStats.timeElapsed, isDailyChallenge);

    // Check for achievements
    checkAchievements({
      currentWPM: finalStats.wpm,
      bestAccuracy: Math.max(finalStats.accuracy, ...sessionHistory.map(s => s.accuracy)),
      practiceStreak: calculatePracticeStreak([...sessionHistory, session]),
      lessonsCompleted: sessionHistory.length + 1,
      totalPracticeTime: sessionHistory.reduce((acc, s) => acc + s.duration, 0) + finalStats.timeElapsed
    });

    if (xpResult.levelUp) {
      toast({
        title: "Level Up! 🎉",
        description: `Congratulations! You've reached level ${gameStats.level + 1}!`,
      });
    }
  };

  const calculatePracticeStreak = (sessions: TypingSession[]) => {
    if (sessions.length === 0) return 0;
    
    const sortedSessions = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 1;
    let currentDate = new Date(sortedSessions[0].date);
    
    for (let i = 1; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].date);
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        streak++;
        currentDate = sessionDate;
      } else if (daysDiff > 1) {
        break;
      }
    }
    
    return streak;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // Update correct/incorrect keys for keyboard highlighting
    const newCorrectKeys = new Set<string>();
    const newIncorrectKeys = new Set<string>();

    for (let i = 0; i < value.length; i++) {
      const inputChar = value[i];
      const targetChar = text[i];
      
      if (inputChar === targetChar) {
        newCorrectKeys.add(inputChar.toLowerCase());
      } else {
        newIncorrectKeys.add(targetChar.toLowerCase());
      }
    }

    setCorrectKeys(newCorrectKeys);
    setIncorrectKeys(newIncorrectKeys);

    if (value.length >= text.length) {
      setIsActive(false);
      const finalStats = { ...stats, timeElapsed };
      
      // Check if this completes daily challenge
      const challenge = getDailyChallenge();
      const completesChallenge = isDailyChallenge && (
        (challenge.type === 'speed' && finalStats.wpm >= challenge.target) ||
        (challenge.type === 'accuracy' && finalStats.accuracy >= challenge.target) ||
        (challenge.type === 'numbers' && finalStats.wpm >= challenge.target)
      );
      
      saveSession(finalStats);
      
      toast({
        title: completesChallenge ? "Daily Challenge Complete! 🏆" : "Test Complete!",
        description: `WPM: ${finalStats.wpm} | Accuracy: ${finalStats.accuracy}%${completesChallenge ? ` | +${challenge.reward} Bonus XP!` : ''}`,
      });
    }
  };

  const startDailyChallenge = () => {
    const challenge = getDailyChallenge();
    setText(challenge.text);
    setIsDailyChallenge(true);
    resetTest();
  };

  const resetTest = () => {
    setUserInput('');
    setCurrentIndex(0);
    setIsActive(false);
    setTimeElapsed(0);
    setCorrectKeys(new Set());
    setIncorrectKeys(new Set());
    setStats({
      wpm: 0,
      accuracy: 100,
      timeElapsed: 0,
      correctChars: 0,
      totalChars: 0,
      errors: 0
    });
    inputRef.current?.focus();
  };

  const startTest = () => {
    setIsDailyChallenge(false);
    resetTest();
    inputRef.current?.focus();
  };

  const getCurrentKey = () => {
    if (currentIndex < text.length) {
      return text[currentIndex].toLowerCase();
    }
    return undefined;
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-lg ';
      
      if (index < userInput.length) {
        className += userInput[index] === char 
          ? 'character-correct' 
          : 'character-incorrect';
      } else if (index === currentIndex) {
        className += 'text-white bg-blue-500 animate-pulse';
      } else {
        className += 'text-gray-500';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  if (showAnalytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <Button 
            onClick={() => setShowAnalytics(false)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Back to Test
          </Button>
        </div>
        <LocalAnalytics />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* XP and Achievement Popups */}
      <XPPopup 
        xpGained={newXPGained} 
        levelUp={levelUp} 
        onClose={() => {}} 
      />
      
      {newAchievements.map((achievement, index) => (
        <AchievementPopup
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={dismissAchievement}
        />
      ))}

      {/* Game Stats Bar */}
      <GameStatsBar />

      {/* Daily Challenge */}
      <DailyChallenge />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div className="wpm-counter">
                <p className="text-sm">WPM</p>
                <p className="text-2xl font-bold">{stats.wpm}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Accuracy</p>
                <p className="text-2xl font-bold text-white">{stats.accuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Time</p>
                <p className="text-2xl font-bold text-white">{Math.floor(stats.timeElapsed / 60)}:{(stats.timeElapsed % 60).toString().padStart(2, '0')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950/80 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Sessions</p>
                <p className="text-2xl font-bold text-white">{sessionHistory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Typing Area */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            {isDailyChallenge ? 'Daily Challenge' : 'Typing Test'}
            <div className="space-x-2">
              <Button
                onClick={() => setShowAnalytics(true)}
                className="bg-purple-500 hover:bg-purple-600"
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button
                onClick={startDailyChallenge}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                size="sm"
              >
                Daily Challenge
              </Button>
              <Button
                onClick={startTest}
                className="bg-blue-500 hover:bg-blue-600"
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
              <Button
                onClick={resetTest}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-black/80 rounded-lg border border-gray-700 min-h-[120px] font-mono leading-relaxed">
            {renderText()}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-4 bg-black/80 border border-gray-700 rounded-lg text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Start typing to begin the test..."
            disabled={userInput.length >= text.length}
          />
        </CardContent>
      </Card>

      {/* Interactive Keyboard */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Keyboard Guide</h3>
        <InteractiveKeyboard
          currentKey={getCurrentKey()}
          correctKeys={correctKeys}
          incorrectKeys={incorrectKeys}
          showFingerGuide={true}
        />
      </div>
    </div>
  );
};

export default TypingTest;
