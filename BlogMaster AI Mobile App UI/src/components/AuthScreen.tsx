import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, User } from 'lucide-react';

interface AuthScreenProps {
  onComplete: (email: string) => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save login state to localStorage
    const userData = {
      email: email,
      username: username || email.split('@')[0],
      isLoggedIn: true,
      loginTime: Date.now(),
    };
    
    localStorage.setItem('userAuth', JSON.stringify(userData));
    
    // Call onComplete with email
    onComplete(email);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">BlogMaster AI</h1>
          <p className="text-white/60">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-black border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Username Input (Sign Up Only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/80">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-white/60 hover:text-white transition-colors text-sm">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!email.trim() || !password.trim()}
              className="w-full bg-white text-black hover:bg-black h-12 rounded-xl disabled:opacity-50"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
        </div>

        {/* Toggle Login/Sign Up */}
        <div className="text-center mt-6">
          <p className="text-white/60">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
