import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthScreenProps {
  onComplete: (email: string, userId: string) => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        // Sign in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (signInError) {
          // Better error messages
          if (signInError.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.');
          } else if (signInError.message.includes('Email not confirmed')) {
            throw new Error('Please check your email and confirm your account before signing in.');
          } else {
            throw signInError;
          }
        }
        
        if (data.user) {
          onComplete(data.user.email || email, data.user.id);
        }
      } else {
        // Sign up - disable email confirmation check temporarily
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              name: username.trim() || email.split('@')[0],
            },
          },
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            throw new Error('This email is already registered. Please sign in instead.');
          } else {
            throw signUpError;
          }
        }
        
        if (data.user) {
          // If email confirmation is required but user is logged in anyway, proceed
          // Profile will be created automatically by trigger
          try {
            // Wait a bit for trigger to create profile
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: data.user.id,
                email: email.trim(),
                name: username.trim() || email.split('@')[0],
              }, {
                onConflict: 'id'
              });

            if (profileError && !profileError.message.includes('duplicate') && !profileError.message.includes('profiles')) {
              console.error('Profile creation error:', profileError);
            }
          } catch (profileErr) {
            console.log('Profile handling:', profileErr);
          }
          
          // Check if user needs email confirmation
          if (data.session) {
            // User is logged in immediately (email confirmation disabled)
            onComplete(data.user.email || email, data.user.id);
          } else {
            // Email confirmation required
            throw new Error('Please check your email to confirm your account before signing in.');
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
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

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl p-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!email.trim() || !password.trim() || isLoading}
              className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
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
