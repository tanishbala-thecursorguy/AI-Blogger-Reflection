import React, { useState, useEffect } from 'react';
import { OnboardingScreens } from './components/OnboardingScreens';
import { AuthScreen } from './components/AuthScreen';
import { LoginSurvey } from './components/LoginSurvey';
import { supabase } from './lib/supabase';
import { HomeDashboard } from './components/HomeDashboard';
import { TaskCreation } from './components/TaskCreation';
import { BlogGenerator } from './components/BlogGenerator';
import { SEOOutlineGenerator } from './components/SEOOutlineGenerator';
import { KeywordResearch } from './components/KeywordResearch';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { AIEditor } from './components/AIEditor';
import { BlogRewriter } from './components/BlogRewriter';
import { SEOOptimization } from './components/SEOOptimization';
import { InternalLinking } from './components/InternalLinking';
import { ImageGenerator } from './components/ImageGenerator';
import { ExportMenu } from './components/ExportMenu';
import { SettingsPage } from './components/SettingsPage';
import { TemplatesHistory } from './components/TemplatesHistory';
import { TopicGenerator } from './components/TopicGenerator';

export type Screen = 
  | 'onboarding' 
  | 'auth' 
  | 'login-survey'
  | 'home' 
  | 'tasks' 
  | 'blog-generator'
  | 'topic-generator'
  | 'seo-outline'
  | 'keyword-research'
  | 'competitor-analysis'
  | 'ai-editor'
  | 'blog-rewriter'
  | 'seo-optimization'
  | 'internal-linking'
  | 'image-generator'
  | 'export'
  | 'settings'
  | 'templates-history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // Check for existing Supabase session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUserId(session.user.id);
          setUserEmail(session.user.email || '');
          
          // Fetch user profile
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile && !error) {
            setUserName(profile.name || 'User');
            // Check if survey is completed (has purpose)
            if (profile.purpose) {
              setCurrentScreen('home');
            } else {
              setCurrentScreen('login-survey');
            }
          } else {
            setCurrentScreen('login-survey');
          }
        } else {
          // Check if onboarding was completed
          const onboardingCompleted = localStorage.getItem('onboardingCompleted');
          if (onboardingCompleted === 'true') {
            setCurrentScreen('auth');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUserId(null);
        setUserEmail('');
        setUserName('User');
        setCurrentScreen('auth');
      } else if (session?.user) {
        setUserId(session.user.id);
        setUserEmail(session.user.email || '');
        
        // If signed in and not already on home or survey, check profile and navigate
        if (currentScreen === 'auth' || currentScreen === 'onboarding') {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile?.purpose) {
              setUserName(profile.name || session.user.email?.split('@')[0] || 'User');
              setCurrentScreen('home');
            } else {
              setUserName(session.user.email?.split('@')[0] || 'User');
              setCurrentScreen('login-survey');
            }
          } catch (error) {
            console.error('Error in auth state change:', error);
            setUserName(session.user.email?.split('@')[0] || 'User');
            setCurrentScreen('login-survey');
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = async (email: string, id: string) => {
    setUserEmail(email);
    setUserId(id);
    
    try {
      // Fetch profile to check if survey is completed
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      // If profile exists and has purpose, go to home
      if (profile && profile.purpose) {
        setUserName(profile.name || email.split('@')[0] || 'User');
        navigate('home');
      } else {
        // No profile or no purpose - go to survey
        // Also set name from profile or email if available
        if (profile?.name) {
          setUserName(profile.name);
        } else if (email) {
          setUserName(email.split('@')[0] || 'User');
        }
        navigate('login-survey');
      }
    } catch (error) {
      // If profile fetch fails, still navigate to survey
      console.error('Error fetching profile:', error);
      setUserName(email.split('@')[0] || 'User');
      navigate('login-survey');
    }
  };

  const handleSurveyComplete = (data: { name: string; purpose: string }) => {
    setUserName(data.name);
    navigate('home');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setUserEmail('');
    setUserName('User');
    setCurrentScreen('auth');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {currentScreen === 'onboarding' && (
        <OnboardingScreens 
          onComplete={() => {
            localStorage.setItem('onboardingCompleted', 'true');
            navigate('auth');
          }} 
        />
      )}
      {currentScreen === 'auth' && <AuthScreen onComplete={handleLogin} />}
      {currentScreen === 'login-survey' && userId && (
        <LoginSurvey 
          email={userEmail}
          userId={userId}
          onComplete={handleSurveyComplete} 
        />
      )}
      {currentScreen === 'home' && <HomeDashboard userName={userName} onNavigate={navigate} />}
      {currentScreen === 'tasks' && <TaskCreation onNavigate={navigate} onBack={() => navigate('home')} />}
      {currentScreen === 'blog-generator' && <BlogGenerator onBack={() => navigate('home')} onNavigate={navigate} />}
      {currentScreen === 'topic-generator' && <TopicGenerator onBack={() => navigate('tasks')} onNavigate={navigate} />}
      {currentScreen === 'seo-outline' && <SEOOutlineGenerator onBack={() => navigate('home')} onNavigate={navigate} />}
      {currentScreen === 'keyword-research' && <KeywordResearch onBack={() => navigate('home')} />}
      {currentScreen === 'competitor-analysis' && <CompetitorAnalysis onBack={() => navigate('home')} />}
      {currentScreen === 'ai-editor' && <AIEditor onBack={() => navigate('home')} />}
      {currentScreen === 'blog-rewriter' && <BlogRewriter onBack={() => navigate('home')} />}
      {currentScreen === 'seo-optimization' && <SEOOptimization onBack={() => navigate('home')} />}
      {currentScreen === 'internal-linking' && <InternalLinking onBack={() => navigate('home')} />}
      {currentScreen === 'image-generator' && <ImageGenerator onBack={() => navigate('home')} />}
      {currentScreen === 'export' && <ExportMenu onBack={() => navigate('home')} />}
      {currentScreen === 'settings' && <SettingsPage onBack={() => navigate('home')} onLogout={handleLogout} onNavigate={navigate} />}
      {currentScreen === 'templates-history' && <TemplatesHistory onBack={() => navigate('settings')} />}
    </div>
  );
}
