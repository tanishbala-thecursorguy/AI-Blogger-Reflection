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
  // Initialize screen based on localStorage immediately
  const getInitialScreen = (): Screen => {
    if (typeof window === 'undefined') return 'onboarding';
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    return onboardingCompleted === 'true' ? 'login-survey' : 'onboarding';
  };

  const [currentScreen, setCurrentScreen] = useState<Screen>(getInitialScreen());
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true') {
      let tempId = localStorage.getItem('tempUserId');
      if (!tempId) {
        tempId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('tempUserId', tempId);
      }
      return tempId;
    }
    return null;
  });

  // Generate or get temporary user ID from localStorage
  const getOrCreateTempUserId = () => {
    let tempId = localStorage.getItem('tempUserId');
    if (!tempId) {
      tempId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('tempUserId', tempId);
    }
    return tempId;
  };

  // Check for existing Supabase session on mount
  useEffect(() => {
    // Set userId immediately if onboarding is completed
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true' && !userId) {
      const tempId = getOrCreateTempUserId();
      setUserId(tempId);
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUserId(session.user.id);
          setUserEmail(session.user.email || '');
          
          // Fetch user profile
          try {
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
          } catch (profileError) {
            // If profile fetch fails, go to survey
            console.error('Profile fetch error:', profileError);
            setCurrentScreen('login-survey');
          }
        } else {
          // No session - ensure we have temp ID and correct screen
          if (!userId) {
            const tempId = getOrCreateTempUserId();
            setUserId(tempId);
          }
          // Screen is already set from initial state
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // On error, ensure we have userId and screen is set
        if (!userId) {
          const tempId = getOrCreateTempUserId();
          setUserId(tempId);
        }
        // Screen is already set from initial state, don't change it
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        // On logout, use temp ID and go to survey
        const tempId = getOrCreateTempUserId();
        setUserId(tempId);
        setUserEmail('');
        setUserName('User');
        setCurrentScreen('login-survey');
      } else if (event === 'SIGNED_IN' && session?.user) {
        setUserId(session.user.id);
        setUserEmail(session.user.email || '');
        
        // Always check profile when signed in
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
    // On logout, use temp ID and go to survey
    const tempId = getOrCreateTempUserId();
    setUserId(tempId);
    setUserEmail('');
    setUserName('User');
    setCurrentScreen('login-survey');
  };

  // Ensure screen is always set - fallback if somehow it's null
  useEffect(() => {
    if (!currentScreen || currentScreen === null) {
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      if (onboardingCompleted === 'true') {
        if (!userId) {
          const tempId = getOrCreateTempUserId();
          setUserId(tempId);
        }
        setCurrentScreen('login-survey');
      } else {
        setCurrentScreen('onboarding');
      }
    }
  }, [currentScreen, userId]);

  return (
    <div className="min-h-screen bg-black text-white">
      {currentScreen === 'onboarding' && (
        <OnboardingScreens 
          onComplete={() => {
            localStorage.setItem('onboardingCompleted', 'true');
            // Ensure we have a userId before going to survey
            if (!userId) {
              const tempId = getOrCreateTempUserId();
              setUserId(tempId);
            }
            navigate('login-survey');
          }} 
        />
      )}
      {currentScreen === 'login-survey' && userId && (
        <LoginSurvey 
          email={userEmail}
          userId={userId}
          onComplete={handleSurveyComplete} 
        />
      )}
      {currentScreen === 'login-survey' && !userId && (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
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
