import { useState } from 'react';
import { motion } from 'motion/react';
import { Scan, User, Mail, Lock, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { User as UserType, UserRole } from '../App';

interface SignUpScreenProps {
  onSignUp: (user: UserType) => void;
  onNavigateToLogin: () => void;
}

export default function SignUpScreen({ onSignUp, onNavigateToLogin }: SignUpScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserType = {
      id: Date.now().toString(),
      name: fullName,
      email: email,
      role: role,
      faceRegistered: false,
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    };
    onSignUp(newUser);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] overflow-y-auto">
      <div className="min-h-full flex flex-col px-6 py-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center mb-8 mt-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#06B6D4]/50 mb-4">
            <Scan className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-white text-center mb-2">Create Account</h1>
          <p className="text-[#94a3b8] text-center">Join FaceID Presence today</p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSignUp}
          className="space-y-4"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-12 h-14 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b] rounded-xl focus:border-[#06B6D4] focus:ring-[#06B6D4]"
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-14 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b] rounded-xl focus:border-[#06B6D4] focus:ring-[#06B6D4]"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger className="h-14 bg-[#1e293b] border-[#334155] text-white rounded-xl focus:border-[#06B6D4] focus:ring-[#06B6D4]">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-[#334155]">
                <SelectItem value="student" className="text-white focus:bg-[#334155] focus:text-white">Student</SelectItem>
                <SelectItem value="teacher" className="text-white focus:bg-[#334155] focus:text-white">Teacher</SelectItem>
                <SelectItem value="admin" className="text-white focus:bg-[#334155] focus:text-white">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] hover:from-[#0891b2] hover:to-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 h-14 rounded-xl"
            >
              Continue
            </Button>
          </div>
        </motion.form>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-[#94a3b8]">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[#06B6D4] hover:underline"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
