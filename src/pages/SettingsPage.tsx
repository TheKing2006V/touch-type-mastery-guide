
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Settings, User, Bell, Shield, Palette, Keyboard } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const SettingsPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

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

  if (!user) {
    return (
      <>
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
            <p className="text-gray-300">Sign in to customize your typing experience</p>
          </div>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardContent className="p-8 text-center">
              <Settings className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Sign In Required</h3>
              <p className="text-gray-400 mb-6">
                Sign in to access personalized settings and preferences.
              </p>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
        <p className="text-gray-300">Customize your typing experience</p>
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
                value={user.email || ''}
                disabled
                className="bg-gray-800 border-gray-600 text-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                type="text"
                value={user.user_metadata?.username || user.email?.split('@')[0] || ''}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter username"
              />
            </div>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            Update Profile
          </Button>
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
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Virtual Keyboard</Label>
              <p className="text-sm text-gray-400">Display the on-screen keyboard during lessons</p>
            </div>
            <Switch
              checked={showKeyboard}
              onCheckedChange={setShowKeyboard}
            />
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Auto-advance Lessons</Label>
              <p className="text-sm text-gray-400">Automatically move to the next lesson after completion</p>
            </div>
            <Switch
              checked={autoAdvance}
              onCheckedChange={setAutoAdvance}
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
              checked={darkTheme}
              onCheckedChange={setDarkTheme}
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
              <p className="text-sm text-gray-400">Receive progress updates and achievements via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
