
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password, username);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: isSignUp ? 'Account created successfully!' : 'Signed in successfully!'
        });
        onClose();
        resetForm();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter your username"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="space-y-2">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={toggleMode}
              className="w-full text-gray-300 hover:text-white"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
