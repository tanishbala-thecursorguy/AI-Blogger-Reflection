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
          if (signInError.message.includes('Invalid login credentials') || signInError.message.includes('invalid')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.');
          } else if (signInError.message.includes('Email not confirmed') || signInError.message.includes('not confirmed')) {
            throw new Error('Please check your email and confirm your account before signing in.');
          } else {
            throw new Error(signInError.message || 'Login failed. Please try again.');
          }
        }
        
        if (data.user && data.session) {
          onComplete(data.user.email || email, data.user.id);
        } else if (data.user && !data.session) {
          // Email confirmation required
          throw new Error('Please check your email and confirm your account before signing in.');
        } else {
          throw new Error('Login failed. Please try again.');
        }
      } else {
        // Sign up - simple, no verification needed
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
          if (signUpError.message.includes('already registered') || signUpError.message.includes('already exists') || signUpError.message.includes('User already registered')) {
            throw new Error('This email is already registered. Please sign in instead.');
          } else {
            throw new Error(signUpError.message || 'Sign up failed. Please try again.');
          }
        }
        
        // Immediately try to login after signup
        if (data.user) {
          // Create profile
          try {
            await new Promise(resolve => setTimeout(resolve, 200));
            
            await supabase
              .from('profiles')
              .upsert({
                id: data.user.id,
                email: email.trim(),
                name: username.trim() || email.split('@')[0],
              }, {
                onConflict: 'id'
              });
          } catch (profileErr) {
            console.log('Profile handling:', profileErr);
          }
          
          // If session exists, use it immediately
          if (data.session) {
            onComplete(data.user.email || email, data.user.id);
          } else {
            // Always try to login immediately after signup
            const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
              email: email.trim(),
              password: password,
            });

            if (signInData?.session && signInData?.user) {
              onComplete(signInData.user.email || email, signInData.user.id);
            } else {
              // If login fails, just use the user anyway - no verification needed
              onComplete(data.user.email || email, data.user.id);
            }
          }
        } else {
          throw new Error('Sign up failed. Please try again.');
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
