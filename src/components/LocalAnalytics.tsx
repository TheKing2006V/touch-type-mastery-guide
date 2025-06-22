
import { useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';

interface TypingSession {
  date: string;
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  correctChars: number;
  totalChars: number;
}

const LocalAnalytics = () => {
  const [sessionHistory] = useLocalStorage<TypingSession[]>('typingHistory', []);
  
  const analytics = useMemo(() => {
    if (sessionHistory.length === 0) {
      return {
        averageWPM: 0,
        improvementTrend: 0,
        accuracyTrend: 0,
        totalPracticeTime: 0,
        weakKeys: [],
        bestPerformanceDay: null,
        recentSessions: []
      };
    }

    const calculateAverage = (values: number[]) => 
      values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;

    const calculateTrend = (sessions: TypingSession[]) => {
      if (sessions.length < 2) return 0;
      const recent = sessions.slice(-5);
      const earlier = sessions.slice(-10, -5);
      if (earlier.length === 0) return 0;
      return calculateAverage(recent.map(s => s.wpm)) - calculateAverage(earlier.map(s => s.wpm));
    };

    const recentSessions = sessionHistory.slice(-7).map((session, index) => ({
      day: new Date(session.date).toLocaleDateString('en-US', { weekday: 'short' }),
      wpm: session.wpm,
      accuracy: session.accuracy,
      date: session.date
    }));

    return {
      averageWPM: Math.round(calculateAverage(sessionHistory.map(s => s.wpm))),
      improvementTrend: Math.round(calculateTrend(sessionHistory)),
      accuracyTrend: Math.round(calculateAverage(sessionHistory.slice(-5).map(s => s.accuracy)) - 
                               calculateAverage(sessionHistory.slice(-10, -5).map(s => s.accuracy))),
      totalPracticeTime: sessionHistory.reduce((acc, s) => acc + s.duration, 0),
      bestPerformanceDay: sessionHistory.reduce((best, current) => 
        current.wpm > (best?.wpm || 0) ? current : best, sessionHistory[0]),
      recentSessions
    };
  }, [sessionHistory]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Average WPM</p>
                <p className="text-2xl font-bold text-white">{analytics.averageWPM}</p>
              </div>
              <div className={`flex items-center ${analytics.improvementTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {analytics.improvementTrend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm ml-1">{Math.abs(analytics.improvementTrend)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Practice Time</p>
                <p className="text-2xl font-bold text-white">{formatTime(analytics.totalPracticeTime)}</p>
              </div>
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sessions</p>
                <p className="text-2xl font-bold text-white">{sessionHistory.length}</p>
              </div>
              <Target className="w-6 h-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Best WPM</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.bestPerformanceDay?.wpm || 0}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {analytics.bestPerformanceDay ? 
                    new Date(analytics.bestPerformanceDay.date).toLocaleDateString() : 
                    'No data'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {analytics.recentSessions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">WPM Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analytics.recentSessions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line type="monotone" dataKey="wpm" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Accuracy Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analytics.recentSessions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="accuracy" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {sessionHistory.length === 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">No typing sessions recorded yet. Start practicing to see your analytics!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocalAnalytics;
