
import { Card } from '@/components/ui/card';

interface InteractiveKeyboardProps {
  currentKey?: string;
  correctKeys?: Set<string>;
  incorrectKeys?: Set<string>;
  highlightedKeys?: string[];
  showFingerGuide?: boolean;
}

const InteractiveKeyboard = ({ 
  currentKey, 
  correctKeys = new Set(), 
  incorrectKeys = new Set(),
  highlightedKeys = [],
  showFingerGuide = true 
}: InteractiveKeyboardProps) => {
  
  const keyRows = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];

  const fingerColors = {
    'pinky-left': 'bg-red-500/30 border-red-400',
    'ring-left': 'bg-orange-500/30 border-orange-400', 
    'middle-left': 'bg-yellow-500/30 border-yellow-400',
    'index-left': 'bg-green-500/30 border-green-400',
    'thumb': 'bg-blue-500/30 border-blue-400',
    'index-right': 'bg-green-500/30 border-green-400',
    'middle-right': 'bg-yellow-500/30 border-yellow-400',
    'ring-right': 'bg-orange-500/30 border-orange-400',
    'pinky-right': 'bg-red-500/30 border-red-400'
  };

  const fingerMapping: { [key: string]: keyof typeof fingerColors } = {
    '`': 'pinky-left', '1': 'pinky-left', 'q': 'pinky-left', 'a': 'pinky-left', 'z': 'pinky-left',
    '2': 'ring-left', 'w': 'ring-left', 's': 'ring-left', 'x': 'ring-left',
    '3': 'middle-left', 'e': 'middle-left', 'd': 'middle-left', 'c': 'middle-left',
    '4': 'index-left', '5': 'index-left', 'r': 'index-left', 't': 'index-left', 'f': 'index-left', 'g': 'index-left', 'v': 'index-left', 'b': 'index-left',
    '6': 'index-right', '7': 'index-right', 'y': 'index-right', 'u': 'index-right', 'h': 'index-right', 'j': 'index-right', 'n': 'index-right', 'm': 'index-right',
    '8': 'middle-right', 'i': 'middle-right', 'k': 'middle-right', ',': 'middle-right',
    '9': 'ring-right', 'o': 'ring-right', 'l': 'ring-right', '.': 'ring-right',
    '0': 'pinky-right', '-': 'pinky-right', '=': 'pinky-right', 'p': 'pinky-right', '[': 'pinky-right', ']': 'pinky-right', '\\': 'pinky-right', ';': 'pinky-right', "'": 'pinky-right', '/': 'pinky-right',
    ' ': 'thumb'
  };

  const getKeyClassName = (key: string) => {
    let baseClass = 'min-w-[2.5rem] h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ';
    
    if (currentKey === key) {
      baseClass += 'bg-blue-500 text-white border-blue-400 animate-pulse shadow-lg ';
    } else if (correctKeys.has(key)) {
      baseClass += 'bg-green-500/40 text-green-200 border-green-400 ';
    } else if (incorrectKeys.has(key)) {
      baseClass += 'bg-red-500/40 text-red-200 border-red-400 ';
    } else if (highlightedKeys.includes(key)) {
      baseClass += 'bg-yellow-500/40 text-yellow-200 border-yellow-400 ';
    } else if (showFingerGuide && fingerMapping[key]) {
      baseClass += fingerColors[fingerMapping[key]] + ' text-gray-200 ';
    } else {
      baseClass += 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 ';
    }
    
    return baseClass;
  };

  const getSpecialKeyClassName = (isSpace = false) => {
    let baseClass = 'h-10 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ';
    
    if (currentKey === ' ' && isSpace) {
      baseClass += 'bg-blue-500 text-white border-blue-400 animate-pulse shadow-lg ';
    } else if (correctKeys.has(' ') && isSpace) {
      baseClass += 'bg-green-500/40 text-green-200 border-green-400 ';
    } else if (incorrectKeys.has(' ') && isSpace) {
      baseClass += 'bg-red-500/40 text-red-200 border-red-400 ';
    } else if (showFingerGuide && isSpace) {
      baseClass += fingerColors.thumb + ' text-gray-200 ';
    } else {
      baseClass += 'bg-gray-700 text-gray-300 border-gray-600 ';
    }
    
    return baseClass;
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6">
      <div className="space-y-2">
        {/* Number row */}
        <div className="flex gap-1 justify-center">
          {keyRows[0].map((key) => (
            <div key={key} className={getKeyClassName(key)}>
              {key}
            </div>
          ))}
          <div className="w-16 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm text-gray-300">
            ⌫
          </div>
        </div>

        {/* QWERTY row */}
        <div className="flex gap-1 justify-center">
          <div className="w-12 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Tab
          </div>
          {keyRows[1].map((key) => (
            <div key={key} className={getKeyClassName(key)}>
              {key.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ASDF row (home row) */}
        <div className="flex gap-1 justify-center">
          <div className="w-14 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Caps
          </div>
          {keyRows[2].map((key) => (
            <div key={key} className={getKeyClassName(key)}>
              {key.toUpperCase()}
            </div>
          ))}
          <div className="w-16 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm text-gray-300">
            ↵
          </div>
        </div>

        {/* ZXCV row */}
        <div className="flex gap-1 justify-center">
          <div className="w-20 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Shift
          </div>
          {keyRows[3].map((key) => (
            <div key={key} className={getKeyClassName(key)}>
              {key.toUpperCase()}
            </div>
          ))}
          <div className="w-20 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Shift
          </div>
        </div>

        {/* Space bar row */}
        <div className="flex gap-1 justify-center">
          <div className="w-12 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Ctrl
          </div>
          <div className="w-12 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Alt
          </div>
          <div className={getSpecialKeyClassName(true) + 'flex-1 max-w-80'}>
            SPACE
          </div>
          <div className="w-12 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Alt
          </div>
          <div className="w-12 h-10 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
            Ctrl
          </div>
        </div>
      </div>

      {showFingerGuide && (
        <div className="mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500/30 border border-red-400"></div>
              <span className="text-gray-400">Pinky</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-orange-500/30 border border-orange-400"></div>
              <span className="text-gray-400">Ring</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-400"></div>
              <span className="text-gray-400">Middle</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500/30 border border-green-400"></div>
              <span className="text-gray-400">Index</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-400"></div>
              <span className="text-gray-400">Thumb</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default InteractiveKeyboard;
