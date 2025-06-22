
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, Palette, Keyboard } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import AuthModal from '@/components/AuthModal';

interface UserSettings {
  soundEnabled: boolean;
  showKeyboard: boolean;
  autoAdvance: boolean;
  darkTheme: boolean;
  emailNotifications: boolean;
  username: string;
}

const SettingsPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Use local storage for settings (works for both logged and non-logged users)
  const [settings, setSettings] = useLocalStorage<UserSettings>('user_settings', {
    soundEnabled: true,
    showKeyboard: true,
    autoAdvance: false,
    darkTheme: true,
    emailNotifications: true,
    username: ''
  });

  // Initialize username from user data if logged in
  useEffect(() => {
    if (user && !settings.username) {
      setSettings(prev => ({
        ...prev,
        username: user.user_metadata?.username || user.email?.split('@')[0] || ''
      }));
    }
  }, [user, settings.username, setSettings]);

  const handleSettingChange = (key: keyof UserSettings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: 'Settings updated',
      description: 'Your preferences have been saved locally.',
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been signed out of your account.'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (authLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
        <p className="text-gray-300">Customize your typing experience</p>
        
        {!user && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-300 text-sm">
              Settings are saved locally. <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="underline hover:text-blue-200"
              >
                Sign in
              </button> to sync across devices!
            </p>
          </div>
        )}
      </div>

      {/* Profile Settings */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || 'Not signed in'}
                disabled
                className="bg-gray-800 border-gray-600 text-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-gray-300">Display Name</Label>
              <Input
                id="username"
                type="text"
                value={settings.username}
                onChange={(e) => handleSettingChange('username', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter your display name"
              />
            </div>
          </div>
          
          {user && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              Update Profile
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Typing Settings */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Keyboard className="w-5 h-5" />
            <span>Typing Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Sound Effects</Label>
              <p className="text-sm text-gray-400">Play typing sounds during practice</p>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
            />
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Virtual Keyboard</Label>
              <p className="text-sm text-gray-400">Display the on-screen keyboard during lessons</p>
            </div>
            <Switch
              checked={settings.showKeyboard}
              onCheckedChange={(checked) => handleSettingChange('showKeyboard', checked)}
            />
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Auto-advance Lessons</Label>
              <p className="text-sm text-gray-400">Automatically move to the next lesson after completion</p>
            </div>
            <Switch
              checked={settings.autoAdvance}
              onCheckedChange={(checked) => handleSettingChange('autoAdvance', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Dark Theme</Label>
              <p className="text-sm text-gray-400">Use dark mode for the interface</p>
            </div>
            <Switch
              checked={settings.darkTheme}
              onCheckedChange={(checked) => handleSettingChange('darkTheme', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Email Notifications</Label>
              <p className="text-sm text-gray-400">
                {user ? 'Receive progress updates and achievements via email' : 'Sign in to enable email notifications'}
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              disabled={!user}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card className="bg-gray-950/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Account Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Sign Out</Label>
                  <p className="text-sm text-gray-400">Sign out of your account</p>
                </div>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  Sign Out
                </Button>
              </div>

              <Separator className="bg-gray-700" />

              <div className="text-center py-4">
                <p className="text-sm text-gray-400 mb-4">
                  Need help or want to delete your account?
                </p>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Contact Support
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-4">
                <Label className="text-white text-lg">Create Account</Label>
                <p className="text-sm text-gray-400 mt-2">
                  Sign up to sync settings across devices and track your progress
                </p>
              </div>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In / Sign Up
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default SettingsPage;
