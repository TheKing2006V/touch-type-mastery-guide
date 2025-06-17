export interface LessonData {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  exercises: {
    instruction: string;
    text: string;
    focusKeys?: string[];
  }[];
  targetAccuracy: number;
  targetWPM: number;
}

export const lessonData: LessonData[] = [
  {
    id: 1,
    title: "Home Row Fundamentals",
    description: "Learn the foundation of touch typing with home row keys (ASDF JKL;)",
    difficulty: 'Beginner',
    duration: "15 min",
    exercises: [
      {
        instruction: "Place your left fingers on A, S, D, F and right fingers on J, K, L, ;. Practice the home row position.",
        text: "asdf jkl; asdf jkl; fff jjj ddd kkk sss lll aaa ;;;",
        focusKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
      },
      {
        instruction: "Practice combining home row keys into simple patterns.",
        text: "ask lad; fall; sad; flask; asks; falls; salad; lads;",
        focusKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
      },
      {
        instruction: "Type real words using only home row keys.",
        text: "a lad asks; a lass falls; salads; flasks; sad falls; ask a lad;",
        focusKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
      }
    ],
    targetAccuracy: 95,
    targetWPM: 15
  },
  {
    id: 2,
    title: "Top Row Mastery",
    description: "Master the top row keys (QWERTY UIOP) with proper finger placement",
    difficulty: 'Beginner',
    duration: "20 min",
    exercises: [
      {
        instruction: "Learn the top row keys. Use your pinky for Q and P, ring finger for W and O, middle for E and I, index for R, T, Y, U.",
        text: "qwer tyui op qwer tyui op qqq www eee rrr ttt yyy uuu iii ooo ppp",
        focusKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
      },
      {
        instruction: "Combine top row with home row keys you've learned.",
        text: "fire; wire; tire; pier; tier; leper; power; tower; quote; petal;",
        focusKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
      },
      {
        instruction: "Practice typing sentences using home and top row keys.",
        text: "a fire tower; quote a poet; write a letter; eat a pear; power fails;",
        focusKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
      }
    ],
    targetAccuracy: 90,
    targetWPM: 20
  },
  {
    id: 3,
    title: "Bottom Row Training",
    description: "Practice bottom row keys (ZXCVBNM) and build muscle memory",
    difficulty: 'Intermediate',
    duration: "18 min",
    exercises: [
      {
        instruction: "Learn the bottom row keys. Use pinky for Z, ring for X, middle for C, index for V, B, N, M.",
        text: "zxcv bnm zxcv bnm zzz xxx ccc vvv bbb nnn mmm zxcv bnm zxcv bnm",
        focusKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      },
      {
        instruction: "Combine all three rows. Focus on smooth transitions between rows.",
        text: "maze; cave; move; zinc; comb; verb; zoom; clam; film; calm;",
        focusKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      },
      {
        instruction: "Type complete sentences using all letter keys.",
        text: "move into the cave; climb the maze; a calm film; zinc metal; comb hair;",
        focusKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      }
    ],
    targetAccuracy: 88,
    targetWPM: 25
  },
  {
    id: 4,
    title: "Numbers & Special Characters",
    description: "Learn to type numbers and special characters efficiently",
    difficulty: 'Intermediate',
    duration: "25 min",
    exercises: [
      {
        instruction: "Practice the number row. Use the same fingers as the letters below each number.",
        text: "1234567890 1234567890 123 456 789 0 111 222 333 444 555 666 777 888 999 000",
        focusKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      },
      {
        instruction: "Learn common special characters and punctuation marks.",
        text: "! @ # $ % ^ & * ( ) - _ = + [ ] { } \\ | ; : ' \" , . < > / ?",
        focusKeys: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?']
      },
      {
        instruction: "Practice typing addresses, phone numbers, and mixed content.",
        text: "Call (555) 123-4567 or email user@example.com for info. Price: $29.99!",
        focusKeys: ['(', ')', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '@', '.', '$', '!']
      }
    ],
    targetAccuracy: 85,
    targetWPM: 30
  },
  {
    id: 5,
    title: "Common Word Patterns",
    description: "Practice typing common English word patterns and combinations",
    difficulty: 'Intermediate',
    duration: "30 min",
    exercises: [
      {
        instruction: "Practice common letter combinations and patterns found in English.",
        text: "the and that with have this will you from they know want been good much some time",
        focusKeys: []
      },
      {
        instruction: "Type common prefixes and suffixes to build speed.",
        text: "pre- pro- re- un- -ing -ed -er -est -ly -tion -ness -ment -ful -less",
        focusKeys: ['-']
      },
      {
        instruction: "Practice full sentences with common word patterns.",
        text: "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore.",
        focusKeys: ['.']
      }
    ],
    targetAccuracy: 85,
    targetWPM: 35
  },
  {
    id: 6,
    title: "Advanced Punctuation",
    description: "Master complex punctuation and symbol combinations",
    difficulty: 'Advanced',
    duration: "35 min",
    exercises: [
      {
        instruction: "Practice complex punctuation in context.",
        text: "\"Hello,\" she said. (This is important!) What's your name? I can't believe it's true!",
        focusKeys: ['"', "'", '(', ')', '!', '?', ',', '.']
      },
      {
        instruction: "Master technical symbols and mathematical expressions.",
        text: "x² + y² = z²; f(x) = 2x + 1; if (x > 5) { return x * 2; } else { return x / 2; }",
        focusKeys: ['+', '=', '(', ')', '{', '}', '*', '/', '<', '>', ';']
      },
      {
        instruction: "Type complex sentences with mixed punctuation.",
        text: "The CEO said, \"Our Q3 results (up 15.7%) exceeded expectations!\" What's next?",
        focusKeys: ['"', "'", '(', ')', '!', '?', ',', '.', '%']
      }
    ],
    targetAccuracy: 82,
    targetWPM: 40
  },
  {
    id: 7,
    title: "Speed Building Drills",
    description: "Intensive drills to increase your typing speed significantly",
    difficulty: 'Advanced',
    duration: "40 min",
    exercises: [
      {
        instruction: "Focus on typing quickly while maintaining accuracy. Don't slow down for errors.",
        text: "Pack my box with five dozen liquor jugs. How quickly daft jumping zebras vex.",
        focusKeys: []
      },
      {
        instruction: "Practice rapid-fire common words to build muscle memory.",
        text: "the be to of and a in that have for it with as his on but at by this she from they",
        focusKeys: []
      },
      {
        instruction: "Type longer paragraphs focusing on sustained speed.",
        text: "Touch typing is a skill that improves with practice. The more you practice proper finger placement and rhythm, the faster and more accurate you will become. Remember to keep your wrists floating and maintain good posture throughout your practice sessions.",
        focusKeys: []
      }
    ],
    targetAccuracy: 80,
    targetWPM: 50
  },
  {
    id: 8,
    title: "Programming Syntax",
    description: "Practice typing code syntax and programming-specific characters",
    difficulty: 'Advanced',
    duration: "45 min",
    exercises: [
      {
        instruction: "Practice common programming symbols and brackets. Use Shift+[ for {, Shift+] for }, Shift+9 for (, Shift+0 for ), etc.",
        text: "{ } [ ] ( ) < > && || != == <= >= ++ -- += -= *= /= %= -> => :: ??",
        focusKeys: ['{', '}', '[', ']', '(', ')', '<', '>', '&', '|', '!', '=', '+', '-', '*', '/', '%', '>', ':', '?']
      },
      {
        instruction: "Type function definitions and variable declarations. Focus on parentheses, braces, and semicolons.",
        text: "function calculateSum(a, b) { return a + b; } const result = calculateSum(10, 20);",
        focusKeys: ['(', ')', '{', '}', ',', ';', '=', '+']
      },
      {
        instruction: "Practice complete code blocks with proper syntax. Pay attention to quotes, dots, and slashes.",
        text: "if (user.isAuthenticated()) { console.log('Welcome back!'); } else { window.location.href = '/login'; }",
        focusKeys: ['(', ')', '{', '}', '.', "'", '"', '!', ';', '/', '=']
      }
    ],
    targetAccuracy: 78,
    targetWPM: 45
  }
];
