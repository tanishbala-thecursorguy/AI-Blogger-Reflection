import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { OnboardingScreens } from './components/OnboardingScreens';
import { AuthScreen } from './components/AuthScreen';
import { LoginSurvey } from './components/LoginSurvey';
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
  const [userName, setUserName] = useState('Sarah');
  const [userEmail, setUserEmail] = useState('');

  // Check for existing login on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userAuth = localStorage.getItem('userAuth');
        if (userAuth) {
          const authData = JSON.parse(userAuth);
          if (authData.isLoggedIn) {
            // Check if survey is completed
            if (authData.completedSurvey && authData.name) {
              setUserName(authData.name);
              setUserEmail(authData.email || '');
              setCurrentScreen('home');
            } else {
              // Show survey if not completed
              setUserEmail(authData.email || '');
              setCurrentScreen('login-survey');
            }
          } else {
            // Check if onboarding was completed
            const onboardingCompleted = localStorage.getItem('onboardingCompleted');
            if (onboardingCompleted === 'true') {
              setCurrentScreen('auth');
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    checkAuth();
  }, []);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    // Check if survey already completed
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const authData = JSON.parse(userAuth);
      if (authData.completedSurvey && authData.name) {
        setUserName(authData.name);
        navigate('home');
      } else {
        navigate('login-survey');
      }
    } else {
      navigate('login-survey');
    }
  };

  const handleSurveyComplete = (data: { name: string; purpose: string }) => {
    setUserName(data.name);
    // Update profile in settings
    const profileData = {
      name: data.name,
      email: userEmail,
      purpose: data.purpose,
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    navigate('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userProfile');
    setCurrentScreen('auth');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen theme-base bg-background text-foreground">
        {currentScreen === 'onboarding' && (
          <OnboardingScreens 
            onComplete={() => {
              localStorage.setItem('onboardingCompleted', 'true');
              navigate('auth');
            }} 
          />
        )}
      {currentScreen === 'auth' && <AuthScreen onComplete={handleLogin} />}
      {currentScreen === 'login-survey' && (
        <LoginSurvey 
          email={userEmail} 
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
    </ThemeProvider>
  );
}
