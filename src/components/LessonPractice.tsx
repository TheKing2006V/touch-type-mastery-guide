import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import InteractiveKeyboard from './InteractiveKeyboard';
import XPPopup from './XPPopup';
import { ArrowLeft, RotateCcw, Play, Pause, CheckCircle, Target, Clock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGamification } from '@/hooks/useGamification';

interface LessonData {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: {
    instruction: string;
    text: string;
    focusKeys?: string[];
  }[];
  targetAccuracy: number;
  targetWPM: number;
}

interface LessonPracticeProps {
  lesson: LessonData;
  onComplete: (stats: { wpm: number; accuracy: number; timeElapsed: number }) => void;
  onBack: () => void;
}

const LessonPractice = ({ lesson, onComplete, onBack }: LessonPracticeProps) => {
  const { toast } = useToast();
  const { newXPGained, levelUp, awardXP } = useGamification();
  
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(new Set<string>());
  const [incorrectKeys, setIncorrectKeys] = useState(new Set<string>());
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    totalChars: 0,
    errors: 0
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const currentText = lesson.exercises[currentExercise]?.text || '';
  const currentInstruction = lesson.exercises[currentExercise]?.instruction || '';
  const focusKeys = lesson.exercises[currentExercise]?.focusKeys || [];

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  useEffect(() => {
    calculateStats();
  }, [userInput, timeElapsed]);

  const calculateStats = () => {
    const totalChars = userInput.length;
    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < totalChars; i++) {
      if (userInput[i] === currentText[i]) {
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
      correctChars,
      totalChars,
      errors
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }

    // Prevent typing ahead
    if (value.length > currentText.length) {
      return;
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // Update correct/incorrect keys
    const newCorrectKeys = new Set<string>();
    const newIncorrectKeys = new Set<string>();

    for (let i = 0; i < value.length; i++) {
      const inputChar = value[i];
      const targetChar = currentText[i];
      
      if (inputChar === targetChar) {
        newCorrectKeys.add(inputChar.toLowerCase());
      } else {
        newIncorrectKeys.add(targetChar.toLowerCase());
      }
    }

    setCorrectKeys(newCorrectKeys);
    setIncorrectKeys(newIncorrectKeys);

    // Check if exercise is complete
    if (value.length >= currentText.length) {
      const finalAccuracy = Math.round((stats.correctChars / stats.totalChars) * 100);
      
      if (finalAccuracy >= lesson.targetAccuracy) {
        // Award XP for completing exercise
        awardXP(stats.wpm, finalAccuracy, timeElapsed);
        
        if (currentExercise < lesson.exercises.length - 1) {
          toast({
            title: "Exercise Complete!",
            description: `Moving to next exercise. Accuracy: ${finalAccuracy}%`,
          });
          nextExercise();
        } else {
          // Lesson complete - award bonus XP
          const bonusXP = awardXP(stats.wpm, finalAccuracy, timeElapsed);
          
          toast({
            title: "Lesson Complete!",
            description: `Great job! WPM: ${stats.wpm}, Accuracy: ${finalAccuracy}%`,
          });
          onComplete({ wpm: stats.wpm, accuracy: finalAccuracy, timeElapsed });
        }
      } else {
        toast({
          title: "Try Again",
          description: `You need ${lesson.targetAccuracy}% accuracy. Current: ${finalAccuracy}%`,
          variant: "destructive"
        });
        resetExercise();
      }
    }
  };

  const nextExercise = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      resetExercise();
    }
  };

  const resetExercise = () => {
    setUserInput('');
    setCurrentIndex(0);
    setIsActive(false);
    setIsPaused(false);
    setTimeElapsed(0);
    setCorrectKeys(new Set());
    setIncorrectKeys(new Set());
    setStats({ wpm: 0, accuracy: 100, correctChars: 0, totalChars: 0, errors: 0 });
    inputRef.current?.focus();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const getCurrentKey = () => {
    if (currentIndex < currentText.length) {
      return currentText[currentIndex].toLowerCase();
    }
    return undefined;
  };

  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'text-lg ';
      
      if (index < userInput.length) {
        className += userInput[index] === char 
          ? 'text-green-400 bg-green-400/20' 
          : 'text-red-400 bg-red-400/20';
      } else if (index === currentIndex) {
        className += 'text-white bg-blue-500 animate-pulse';
      } else {
        className += 'text-gray-400';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '␣' : char}
        </span>
      );
    });
  };

  const progressPercentage = ((currentExercise + 1) / lesson.exercises.length) * 100;

  return (
    <div className="space-y-6">
      {/* XP Popup */}
      <XPPopup 
        xpGained={newXPGained} 
        levelUp={levelUp} 
        onClose={() => {}} 
      />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
          <Badge className="mt-1">
            Exercise {currentExercise + 1} of {lesson.exercises.length}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={togglePause}
            disabled={!isActive}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button
            onClick={resetExercise}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Lesson Progress</span>
            <span className="text-white">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.wpm}</p>
            <p className="text-xs text-gray-400">WPM</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.accuracy}%</p>
            <p className="text-xs text-gray-400">Accuracy</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">
              {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-xs text-gray-400">Time</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{lesson.targetAccuracy}%</p>
            <p className="text-xs text-gray-400">Target</p>
          </CardContent>
        </Card>
      </div>

      {/* Instruction */}
      <Card className="bg-blue-900/20 border-blue-600/30">
        <CardContent className="p-4">
          <h3 className="text-blue-300 font-semibold mb-2">Exercise Instructions</h3>
          <p className="text-blue-200">{currentInstruction}</p>
        </CardContent>
      </Card>

      {/* Typing Area */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Practice Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-600 min-h-[120px] font-mono text-lg leading-relaxed">
            {renderText()}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Start typing here..."
            disabled={userInput.length >= currentText.length || isPaused}
            autoFocus
          />
        </CardContent>
      </Card>

      {/* Interactive Keyboard */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Finger Position Guide</h3>
        <InteractiveKeyboard
          currentKey={getCurrentKey()}
          correctKeys={correctKeys}
          incorrectKeys={incorrectKeys}
          highlightedKeys={focusKeys}
          showFingerGuide={true}
        />
      </div>
    </div>
  );
};

export default LessonPractice;
