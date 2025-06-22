
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface GameStats {
  totalXP: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  streak: number;
  lastPlayDate: string;
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string;
}

interface DailyChallenge {
  id: string;
  text: string;
  target: number;
  type: 'numbers' | 'speed' | 'accuracy';
  description: string;
  reward: number;
}

export const useGamification = () => {
  const [gameStats, setGameStats] = useLocalStorage<GameStats>('gameStats', {
    totalXP: 0,
    level: 1,
    currentLevelXP: 0,
    nextLevelXP: 100,
    streak: 0,
    lastPlayDate: '',
    dailyChallengeCompleted: false,
    dailyChallengeDate: ''
  });

  const [newXPGained, setNewXPGained] = useState<number>(0);
  const [levelUp, setLevelUp] = useState<boolean>(false);

  // XP calculation based on performance
  const calculateXP = (wpm: number, accuracy: number, timeSpent: number): number => {
    const baseXP = Math.floor(wpm * (accuracy / 100) * (timeSpent / 60));
    const bonusXP = accuracy > 95 ? 50 : accuracy > 90 ? 25 : 0;
    const streakBonus = gameStats.streak > 7 ? 25 : gameStats.streak > 3 ? 10 : 0;
    return Math.max(baseXP + bonusXP + streakBonus, 10); // Minimum 10 XP
  };

  // Level calculation
  const calculateLevel = (totalXP: number): number => {
    return Math.floor(Math.sqrt(totalXP / 100)) + 1;
  };

  // Calculate XP needed for current level
  const getXPForLevel = (level: number): number => {
    return Math.pow(level - 1, 2) * 100;
  };

  // Get daily challenge based on current date
  const getDailyChallenge = (): DailyChallenge => {
    const today = new Date().toDateString();
    const challenges: DailyChallenge[] = [
      { 
        id: 'numbers', 
        text: "Practice numbers and symbols: 1234567890 !@#$%^&*()", 
        target: 40, 
        type: 'numbers',
        description: "Type numbers and symbols at 40+ WPM",
        reward: 100
      },
      { 
        id: 'speed', 
        text: "The quick brown fox jumps over the lazy dog. Speed is key to mastering typing skills.", 
        target: 60, 
        type: 'speed',
        description: "Achieve 60+ WPM on this text",
        reward: 150
      },
      { 
        id: 'accuracy', 
        text: "Precision and accuracy are fundamental skills for professional typing excellence.", 
        target: 98, 
        type: 'accuracy',
        description: "Type with 98%+ accuracy",
        reward: 120
      },
      {
        id: 'mixed',
        text: "Mixed challenge: Hello123 World! @typing #skills $matter 100% (always) & forever.",
        target: 85,
        type: 'speed',
        description: "Mixed characters at 85%+ accuracy and 45+ WPM",
        reward: 130
      }
    ];
    
    const index = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % challenges.length;
    return challenges[index];
  };

  // Award XP and update stats
  const awardXP = (wpm: number, accuracy: number, timeSpent: number, isDailyChallenge: boolean = false) => {
    const xpGained = calculateXP(wpm, accuracy, timeSpent);
    const bonusXP = isDailyChallenge ? getDailyChallenge().reward : 0;
    const totalXPGained = xpGained + bonusXP;
    
    const newTotalXP = gameStats.totalXP + totalXPGained;
    const newLevel = calculateLevel(newTotalXP);
    const wasLevelUp = newLevel > gameStats.level;
    
    const currentLevelStartXP = getXPForLevel(newLevel);
    const nextLevelStartXP = getXPForLevel(newLevel + 1);
    
    const today = new Date().toDateString();
    const isNewDay = gameStats.lastPlayDate !== today;
    const newStreak = isNewDay ? 
      (gameStats.lastPlayDate === new Date(Date.now() - 86400000).toDateString() ? gameStats.streak + 1 : 1) : 
      gameStats.streak;

    setGameStats({
      ...gameStats,
      totalXP: newTotalXP,
      level: newLevel,
      currentLevelXP: newTotalXP - currentLevelStartXP,
      nextLevelXP: nextLevelStartXP,
      streak: newStreak,
      lastPlayDate: today,
      dailyChallengeCompleted: isDailyChallenge ? true : gameStats.dailyChallengeCompleted,
      dailyChallengeDate: isDailyChallenge ? today : gameStats.dailyChallengeDate
    });

    setNewXPGained(totalXPGained);
    setLevelUp(wasLevelUp);
    
    // Clear notifications after 3 seconds
    setTimeout(() => {
      setNewXPGained(0);
      setLevelUp(false);
    }, 3000);

    return { xpGained: totalXPGained, levelUp: wasLevelUp };
  };

  // Check if daily challenge is available
  const isDailyChallengeAvailable = (): boolean => {
    const today = new Date().toDateString();
    return gameStats.dailyChallengeDate !== today;
  };

  // Reset daily challenge for new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (gameStats.dailyChallengeDate !== today) {
      setGameStats(prev => ({
        ...prev,
        dailyChallengeCompleted: false,
        dailyChallengeDate: today
      }));
    }
  }, []);

  return {
    gameStats,
    newXPGained,
    levelUp,
    awardXP,
    getDailyChallenge,
    isDailyChallengeAvailable,
    calculateXP
  };
};
