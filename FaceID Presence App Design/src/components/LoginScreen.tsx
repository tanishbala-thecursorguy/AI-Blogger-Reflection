import { useState } from 'react';
import { motion } from 'motion/react';
import { Scan, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { User } from '../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onNavigateToSignUp: () => void;
}

export default function LoginScreen({ onLogin, onNavigateToSignUp }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would authenticate with Supabase
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('teacher') ? 'teacher' : 'student',
      faceRegistered: email.includes('registered'),
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    };
    onLogin(mockUser);
  };

  const handleGoogleSignIn = () => {
    // Mock Google sign in
    const mockUser: User = {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'student',
      faceRegistered: false,
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    };
    onLogin(mockUser);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] overflow-y-auto">
      <div className="min-h-full flex flex-col px-6 py-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center mb-12 mt-8"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#06B6D4]/50 mb-4">
            <Scan className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-white text-center mb-2">Welcome Back</h1>
          <p className="text-[#94a3b8] text-center">Sign in to continue</p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b] rounded-xl focus:border-[#06B6D4] focus:ring-[#06B6D4]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-14 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b] rounded-xl focus:border-[#06B6D4] focus:ring-[#06B6D4]"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-[#06B6D4] hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] hover:from-[#0891b2] hover:to-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 h-14 rounded-xl"
          >
            Sign In
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#334155]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0F172A] px-4 text-[#64748b]">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-14 bg-transparent border-2 border-[#334155] text-white hover:bg-[#1e293b] hover:border-[#06B6D4] rounded-xl"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
        </motion.form>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-[#94a3b8]">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToSignUp}
              className="text-[#06B6D4] hover:underline"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
