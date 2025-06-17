
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Trophy, User, Settings, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Lessons', path: '/lessons' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <nav className="bg-black/98 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ZT</span>
                </div>
                <span className="text-white font-bold text-xl">Zeos Type</span>
              </Link>
            </div>
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-black/98 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ZT</span>
                </div>
                <span className="text-white font-bold text-xl">Zeos Type</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {user && navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive(item.path)
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'text-gray-300 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
              
              {user ? (
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-900"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white hover:bg-gray-900"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {user && navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start space-x-2 ${
                        isActive(item.path)
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                ))}
                
                {user ? (
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-900"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
