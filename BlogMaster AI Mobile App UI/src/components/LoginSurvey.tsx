import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { User, Target, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginSurveyProps {
  email: string;
  userId: string;
  onComplete: (data: { name: string; purpose: string }) => void;
}

const purposeOptions = [
  'Personal Blogging',
  'Business Content Marketing',
  'SEO Optimization',
  'Content Writing Services',
  'Academic Writing',
  'Social Media Content',
  'Other',
];

export function LoginSurvey({ email, userId, onComplete }: LoginSurveyProps) {
  const [name, setName] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [customPurpose, setCustomPurpose] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!selectedPurpose) {
      setError('Please select your purpose');
      return;
    }
    
    const purpose = selectedPurpose === 'Other' ? customPurpose.trim() : selectedPurpose;
    
    if (!purpose) {
      setError('Please specify your purpose');
      return;
    }
    
    // Try to save to Supabase, but don't block if it fails
    try {
      // If userId is a temp ID, try anonymous auth first
      let actualUserId = userId;
      if (userId.startsWith('temp_')) {
        try {
          const { data: authData } = await supabase.auth.signInAnonymously();
          if (authData?.user) {
            actualUserId = authData.user.id;
          }
        } catch (authErr) {
          console.error('Anonymous sign-in failed:', authErr);
        }
      }
      
      // Save to Supabase if we have a real user ID
      if (actualUserId && !actualUserId.startsWith('temp_')) {
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({
            id: actualUserId,
            email: email || '',
            name: name.trim(),
            purpose: purpose,
          }, {
            onConflict: 'id'
          });

        if (updateError) {
          console.error('Profile save error (non-blocking):', updateError);
        }
      }
      
      // Always save to localStorage as backup
      localStorage.setItem('userProfile', JSON.stringify({ 
        name: name.trim(), 
        purpose, 
        email: email || '' 
      }));
    } catch (err: any) {
      // Silently fail - just log it
      console.error('Profile save failed (non-blocking):', err);
      // Still save to localStorage
      localStorage.setItem('userProfile', JSON.stringify({ 
        name: name.trim(), 
        purpose, 
        email: email || '' 
      }));
    }
    
    // Always proceed regardless of save result
    onComplete({ name: name.trim(), purpose });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl mb-2">Welcome to BlogMaster AI!</h1>
          <p className="text-white/60">Let's get to know you better</p>
        </div>

        {/* Survey Card */}
        <Card className="bg-black border-white/10 p-6 rounded-3xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                What's your name?
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Purpose Selection */}
            <div className="space-y-3">
              <Label className="text-white/80">What's your purpose here?</Label>
              <div className="grid grid-cols-2 gap-3">
                {purposeOptions.map((purpose) => (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() => setSelectedPurpose(purpose)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedPurpose === purpose
                        ? 'bg-white text-black border-white'
                        : 'bg-black text-white border-white/10 hover:bg-black'
                    }`}
                  >
                    <Target className={`w-5 h-5 mb-2 ${selectedPurpose === purpose ? 'text-black' : 'text-white/60'}`} />
                    <div className={`text-sm font-medium ${selectedPurpose === purpose ? 'text-black' : 'text-white'}`}>
                      {purpose}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Purpose Input */}
              {selectedPurpose === 'Other' && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Please specify your purpose..."
                    value={customPurpose}
                    onChange={(e) => setCustomPurpose(e.target.value)}
                    className="bg-black border-white/10 text-white placeholder:text-white/40 min-h-[100px] rounded-xl resize-none"
                    required={selectedPurpose === 'Other'}
                  />
                </div>
              )}
            </div>

            {error && error.includes('Please enter') || error.includes('Please select') || error.includes('Please specify') ? (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl p-3">
                {error}
              </div>
            ) : null}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-black h-12 rounded-xl"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

