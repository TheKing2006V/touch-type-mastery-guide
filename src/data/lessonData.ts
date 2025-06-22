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
  },
  // New lessons start here
  {
    id: 9,
    title: "JavaScript Fundamentals",
    description: "Practice typing common JavaScript syntax and patterns",
    difficulty: 'Intermediate',
    duration: "30 min",
    exercises: [
      {
        instruction: "Practice JavaScript function syntax. Focus on parentheses, braces, and parameter naming.",
        text: "function calculateWPM(characters, timeInMinutes) { return Math.round(characters / 5 / timeInMinutes); }",
        focusKeys: ['(', ')', '{', '}', ',', ';', '/', '*']
      },
      {
        instruction: "Type variable declarations and arrow functions. Pay attention to const, let, and => syntax.",
        text: "const userName = 'john_doe'; let userAge = 25; const getUser = (id) => { return users.find(u => u.id === id); };",
        focusKeys: ['=', '>', '(', ')', '{', '}', ';', "'"]
      },
      {
        instruction: "Practice JavaScript control structures with proper indentation and syntax.",
        text: "if (user.isActive && user.age >= 18) { console.log('User is eligible'); } else { console.log('Access denied'); }",
        focusKeys: ['&', '>', '=', '(', ')', '{', '}', ';']
      }
    ],
    targetAccuracy: 80,
    targetWPM: 35
  },
  {
    id: 10,
    title: "Medical Terminology",
    description: "Healthcare-focused typing practice with medical terms",
    difficulty: 'Advanced',
    duration: "35 min",
    exercises: [
      {
        instruction: "Practice common medical terms. Focus on complex spellings and medical abbreviations.",
        text: "diagnose symptoms treatment prescription rehabilitation therapy cardiovascular respiratory",
        focusKeys: []
      },
      {
        instruction: "Type medical procedures and conditions with proper capitalization.",
        text: "Patient presents with acute myocardial infarction. Recommend immediate EKG and cardiac enzymes. Administer nitroglycerin PRN chest pain.",
        focusKeys: ['.']
      },
      {
        instruction: "Practice medical documentation format with abbreviations and measurements.",
        text: "BP: 140/90 mmHg, HR: 88 bpm, Temp: 98.6°F, O2 Sat: 97% on room air. Rx: Lisinopril 10mg PO daily x 30 days.",
        focusKeys: [':', '/', '%', '°']
      }
    ],
    targetAccuracy: 75,
    targetWPM: 40
  },
  {
    id: 11,
    title: "Legal Documents",
    description: "Practice typing legal terminology and formal document structure",
    difficulty: 'Advanced',
    duration: "40 min",
    exercises: [
      {
        instruction: "Practice legal terminology and formal language structure.",
        text: "plaintiff defendant litigation jurisdiction precedent statute regulation compliance",
        focusKeys: []
      },
      {
        instruction: "Type formal legal clauses with proper punctuation and capitalization.",
        text: "WHEREAS, the Party of the First Part agrees to provide services as outlined in Exhibit A; and WHEREAS, the Party of the Second Part agrees to compensate according to Schedule B;",
        focusKeys: [',', ';', ':']
      },
      {
        instruction: "Practice contract language with technical legal phrases.",
        text: "This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.",
        focusKeys: [',', '.']
      }
    ],
    targetAccuracy: 78,
    targetWPM: 38
  },
  {
    id: 12,
    title: "Financial Reports",
    description: "Practice typing financial data, numbers, and business terminology",
    difficulty: 'Intermediate',
    duration: "25 min",
    exercises: [
      {
        instruction: "Practice financial terminology and business language.",
        text: "revenue profit margin assets liabilities equity depreciation amortization cash flow",
        focusKeys: []
      },
      {
        instruction: "Type financial data with numbers, percentages, and currency symbols.",
        text: "Q3 revenue increased 15.7% to $2,450,000. Operating margin improved from 12.3% to 14.8%. EBITDA of $425,000 exceeded projections.",
        focusKeys: ['%', '$', ',', '.']
      },
      {
        instruction: "Practice typing financial statements and accounting entries.",
        text: "Debit: Cash $10,000; Credit: Accounts Receivable $10,000. Net Income for FY2023: $1,250,000 (up 8.2% YoY).",
        focusKeys: [':', '$', ',', '(', ')', '%']
      }
    ],
    targetAccuracy: 82,
    targetWPM: 42
  },
  {
    id: 13,
    title: "Scientific Research",
    description: "Practice typing scientific terminology and research documentation",
    difficulty: 'Advanced',
    duration: "38 min",
    exercises: [
      {
        instruction: "Practice scientific terminology and research vocabulary.",
        text: "hypothesis methodology analysis correlation coefficient statistical significance p-value regression",
        focusKeys: ['-']
      },
      {
        instruction: "Type scientific measurements and chemical formulas with proper notation.",
        text: "The concentration of NaCl was 0.9% (w/v). Temperature maintained at 37°C ± 2°C. pH measured at 7.4 using calibrated electrode.",
        focusKeys: ['%', '(', ')', '°', '±']
      },
      {
        instruction: "Practice academic citation format and research methodology descriptions.",
        text: "According to Smith et al. (2023), the treatment group (n=150) showed significant improvement (p<0.05) compared to control group (n=145).",
        focusKeys: ['(', ')', '=', '<', '.']
      }
    ],
    targetAccuracy: 76,
    targetWPM: 36
  },
  {
    id: 14,
    title: "Creative Writing",
    description: "Practice typing creative content with varied vocabulary and style",
    difficulty: 'Intermediate',
    duration: "30 min",
    exercises: [
      {
        instruction: "Practice descriptive vocabulary and creative language patterns.",
        text: "magnificent ethereal whimsical melancholy serendipity luminous tranquil mysterious enchanting sublime",
        focusKeys: []
      },
      {
        instruction: "Type narrative prose with dialogue and varied punctuation.",
        text: "\"The storm approaches,\" she whispered, her voice barely audible above the howling wind. Lightning illuminated the darkened sky—a spectacle both terrifying and beautiful.",
        focusKeys: ['"', ',', "'", '—', '.']
      },
      {
        instruction: "Practice poetic language with metaphors and literary devices.",
        text: "Time flows like a river through the valleys of memory, carrying with it fragments of dreams and whispers of forgotten melodies that dance in the twilight of consciousness.",
        focusKeys: [',', '.']
      }
    ],
    targetAccuracy: 85,
    targetWPM: 40
  },
  {
    id: 15,
    title: "Technical Documentation",
    description: "Practice typing technical manuals and software documentation",
    difficulty: 'Advanced',
    duration: "35 min",
    exercises: [
      {
        instruction: "Practice technical vocabulary and documentation terminology.",
        text: "configuration implementation deployment authentication authorization middleware API endpoint database",
        focusKeys: []
      },
      {
        instruction: "Type API documentation with code examples and parameter descriptions.",
        text: "GET /api/users/{id} - Returns user object. Parameters: id (integer, required). Response: 200 OK with user data, 404 if not found.",
        focusKeys: ['/', '{', '}', ':', '(', ')', ',']
      },
      {
        instruction: "Practice troubleshooting guides with step-by-step instructions.",
        text: "1. Check network connectivity using ping command. 2. Verify firewall settings allow port 443. 3. Restart the service: sudo systemctl restart nginx",
        focusKeys: ['1', '2', '3', '.', ':']
      }
    ],
    targetAccuracy: 78,
    targetWPM: 38
  },
  {
    id: 16,
    title: "Email Communications",
    description: "Practice typing professional emails and business correspondence",
    difficulty: 'Beginner',
    duration: "20 min",
    exercises: [
      {
        instruction: "Practice professional email vocabulary and common phrases.",
        text: "regarding regarding following attached please find enclosed sincerely best regards thank you",
        focusKeys: []
      },
      {
        instruction: "Type professional email greetings and closings with proper formatting.",
        text: "Dear Mr. Johnson, I hope this email finds you well. Please find the requested documents attached. Best regards, Sarah Smith",
        focusKeys: [',', '.']
      },
      {
        instruction: "Practice email addresses and contact information formatting.",
        text: "Contact: john.doe@company.com | Phone: (555) 123-4567 | Website: www.example.com | Office: Suite 200, 123 Main St.",
        focusKeys: ['@', '.', '|', '(', ')', '-', ',']
      }
    ],
    targetAccuracy: 88,
    targetWPM: 30
  },
  {
    id: 17,
    title: "Data Entry Practice",
    description: "Practice typing structured data, forms, and database entries",
    difficulty: 'Intermediate',
    duration: "25 min",
    exercises: [
      {
        instruction: "Practice typing structured data with consistent formatting.",
        text: "Name: John Smith | Age: 32 | City: New York | ZIP: 10001 | Phone: 555-0123",
        focusKeys: [':', '|', '-']
      },
      {
        instruction: "Type tabular data with proper alignment and separators.",
        text: "ID: 001 | Product: Laptop | Price: $999.99 | Qty: 15 | Status: In Stock | Category: Electronics",
        focusKeys: [':', '|', '$', '.']
      },
      {
        instruction: "Practice database-style entries with multiple field types.",
        text: "User_ID: U12345 | Email: user@domain.com | Created: 2023-12-15 | Active: TRUE | Role: Admin | Last_Login: 2023-12-22 09:30:15",
        focusKeys: ['_', ':', '@', '-', ':']
      }
    ],
    targetAccuracy: 85,
    targetWPM: 45
  },
  {
    id: 18,
    title: "Social Media Content",
    description: "Practice typing social media posts with hashtags and mentions",
    difficulty: 'Beginner',
    duration: "18 min",
    exercises: [
      {
        instruction: "Practice social media vocabulary and common abbreviations.",
        text: "awesome amazing incredible fantastic wonderful brilliant excellent outstanding phenomenal spectacular",
        focusKeys: []
      },
      {
        instruction: "Type social media posts with hashtags and mentions.",
        text: "Just finished an amazing workout! 💪 #fitness #motivation #healthylifestyle Thanks @my_trainer for the inspiration!",
        focusKeys: ['#', '@', '!', '💪']
      },
      {
        instruction: "Practice typing tweets with character limits and engagement phrases.",
        text: "Excited to share our latest project! What do you think? Let me know in the comments below! 🚀 #innovation #tech #startup",
        focusKeys: ['!', '?', '#', '🚀']
      }
    ],
    targetAccuracy: 90,
    targetWPM: 35
  },
  {
    id: 19,
    title: "Academic Essays",
    description: "Practice typing academic writing with citations and formal structure",
    difficulty: 'Advanced',
    duration: "42 min",
    exercises: [
      {
        instruction: "Practice academic vocabulary and formal writing terminology.",
        text: "furthermore however nevertheless consequently therefore moreover alternatively specifically ultimately",
        focusKeys: []
      },
      {
        instruction: "Type academic citations in APA format with proper punctuation.",
        text: "According to Johnson (2023), climate change affects global precipitation patterns (p. 145). This finding supports earlier research by Smith and Brown (2022).",
        focusKeys: ['(', ')', ',', '.']
      },
      {
        instruction: "Practice thesis statements and academic argumentation structure.",
        text: "This paper argues that renewable energy adoption, while initially costly, provides long-term economic benefits that outweigh traditional fossil fuel investments in developing nations.",
        focusKeys: [',', '.']
      }
    ],
    targetAccuracy: 80,
    targetWPM: 38
  },
  {
    id: 20,
    title: "Gaming & Entertainment",
    description: "Practice typing gaming terminology and entertainment content",
    difficulty: 'Beginner',
    duration: "22 min",
    exercises: [
      {
        instruction: "Practice gaming vocabulary and common gaming terms.",
        text: "achievement unlocked respawn checkpoint inventory upgrade multiplayer campaign leaderboard strategy",
        focusKeys: []
      },
      {
        instruction: "Type gaming chat messages and common gaming expressions.",
        text: "GG everyone! That was an epic match! Who's ready for another round? My K/D ratio is improving! 🎮",
        focusKeys: ['!', '?', '/', '🎮']
      },
      {
        instruction: "Practice typing game reviews and entertainment commentary.",
        text: "This game features stunning graphics, immersive gameplay, and an engaging storyline. Rating: 9/10. Highly recommended for RPG fans!",
        focusKeys: [',', '.', ':', '/', '!']
      }
    ],
    targetAccuracy: 88,
    targetWPM: 40
  },
  {
    id: 21,
    title: "Foreign Language Practice",
    description: "Practice typing common foreign words and international content",
    difficulty: 'Intermediate',
    duration: "28 min",
    exercises: [
      {
        instruction: "Practice common foreign words used in English writing.",
        text: "café résumé naïve façade fiancé cliché déjà vu bon voyage c'est la vie",
        focusKeys: ['é', 'ç', 'à', 'ï', "'"]
      },
      {
        instruction: "Type international greetings and common phrases from various languages.",
        text: "Hola! Bonjour! Guten Tag! Konnichiwa! Namaste! Zdravstvuyte! Shalom! Marhaba! Ciao! Hej!",
        focusKeys: ['!']
      },
      {
        instruction: "Practice typing multilingual content with special characters.",
        text: "The café serves crêpes and café au lait. Señor García speaks português fluently. The piñata was filled with dulces.",
        focusKeys: ['é', 'ê', 'ç', 'ñ', 'ü']
      }
    ],
    targetAccuracy: 82,
    targetWPM: 32
  }
];
