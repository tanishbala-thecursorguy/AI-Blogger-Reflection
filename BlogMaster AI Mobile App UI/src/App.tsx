import { useState } from 'react';
import { OnboardingScreens } from './components/OnboardingScreens';
import { AuthScreen } from './components/AuthScreen';
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

export type Screen = 
  | 'onboarding' 
  | 'auth' 
  | 'home' 
  | 'tasks' 
  | 'blog-generator'
  | 'seo-outline'
  | 'keyword-research'
  | 'competitor-analysis'
  | 'ai-editor'
  | 'blog-rewriter'
  | 'seo-optimization'
  | 'internal-linking'
  | 'image-generator'
  | 'export'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userName, setUserName] = useState('Sarah');

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {currentScreen === 'onboarding' && <OnboardingScreens onComplete={() => navigate('auth')} />}
      {currentScreen === 'auth' && <AuthScreen onComplete={() => navigate('home')} />}
      {currentScreen === 'home' && <HomeDashboard userName={userName} onNavigate={navigate} />}
      {currentScreen === 'tasks' && <TaskCreation onNavigate={navigate} onBack={() => navigate('home')} />}
      {currentScreen === 'blog-generator' && <BlogGenerator onBack={() => navigate('home')} onNavigate={navigate} />}
      {currentScreen === 'seo-outline' && <SEOOutlineGenerator onBack={() => navigate('home')} />}
      {currentScreen === 'keyword-research' && <KeywordResearch onBack={() => navigate('home')} />}
      {currentScreen === 'competitor-analysis' && <CompetitorAnalysis onBack={() => navigate('home')} />}
      {currentScreen === 'ai-editor' && <AIEditor onBack={() => navigate('home')} />}
      {currentScreen === 'blog-rewriter' && <BlogRewriter onBack={() => navigate('home')} />}
      {currentScreen === 'seo-optimization' && <SEOOptimization onBack={() => navigate('home')} />}
      {currentScreen === 'internal-linking' && <InternalLinking onBack={() => navigate('home')} />}
      {currentScreen === 'image-generator' && <ImageGenerator onBack={() => navigate('home')} />}
      {currentScreen === 'export' && <ExportMenu onBack={() => navigate('home')} />}
      {currentScreen === 'settings' && <SettingsPage onBack={() => navigate('home')} onLogout={() => navigate('auth')} />}
    </div>
  );
}
