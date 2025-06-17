
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  best_wpm INTEGER DEFAULT 0,
  best_accuracy INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  first_completed_at TIMESTAMP WITH TIME ZONE,
  last_attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create user stats table for overall tracking
CREATE TABLE public.user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_lessons_completed INTEGER DEFAULT 0,
  total_typing_time INTEGER DEFAULT 0, -- in seconds
  average_wpm INTEGER DEFAULT 0,
  average_accuracy INTEGER DEFAULT 0,
  total_characters_typed INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  requirement_type TEXT NOT NULL, -- 'wpm', 'accuracy', 'lessons', 'streak', 'time'
  requirement_value INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for user_progress
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for user_stats
CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for achievements (public read)
CREATE POLICY "Everyone can view achievements" ON public.achievements
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for user_achievements
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon, category, requirement_type, requirement_value, points) VALUES
('First Steps', 'Complete your first lesson', 'award', 'lessons', 'lessons', 1, 50),
('Speed Demon', 'Reach 30 WPM', 'zap', 'speed', 'wpm', 30, 100),
('Accuracy Master', 'Achieve 95% accuracy', 'target', 'accuracy', 'accuracy', 95, 100),
('Home Row Hero', 'Complete all beginner lessons', 'home', 'lessons', 'beginner_lessons', 3, 150),
('Lightning Fast', 'Reach 50 WPM', 'zap', 'speed', 'wpm', 50, 200),
('Perfectionist', 'Achieve 98% accuracy', 'target', 'accuracy', 'accuracy', 98, 250),
('Dedication', 'Practice for 30 minutes total', 'clock', 'time', 'time', 1800, 100),
('Marathon', 'Practice for 2 hours total', 'clock', 'time', 'time', 7200, 300),
('Lesson Master', 'Complete all 8 lessons', 'trophy', 'lessons', 'lessons', 8, 500),
('Programming Pro', 'Complete the programming syntax lesson', 'code', 'lessons', 'programming', 1, 200);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user stats
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER AS $$
DECLARE
  total_completed INTEGER;
  avg_wpm NUMERIC;
  avg_accuracy NUMERIC;
  new_level INTEGER;
  total_xp INTEGER;
BEGIN
  -- Calculate totals
  SELECT 
    COUNT(*) FILTER (WHERE completed = true),
    COALESCE(AVG(best_wpm) FILTER (WHERE completed = true), 0),
    COALESCE(AVG(best_accuracy) FILTER (WHERE completed = true), 0)
  INTO total_completed, avg_wpm, avg_accuracy
  FROM public.user_progress 
  WHERE user_id = NEW.user_id;

  -- Calculate level and XP (simple formula: level = completed lessons + 1)
  new_level := total_completed + 1;
  total_xp := total_completed * 100; -- 100 XP per completed lesson

  -- Update user stats
  UPDATE public.user_stats 
  SET 
    total_lessons_completed = total_completed,
    average_wpm = ROUND(avg_wpm),
    average_accuracy = ROUND(avg_accuracy),
    current_level = new_level,
    experience_points = total_xp,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update stats when progress changes
CREATE TRIGGER update_stats_on_progress_change
  AFTER INSERT OR UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();
