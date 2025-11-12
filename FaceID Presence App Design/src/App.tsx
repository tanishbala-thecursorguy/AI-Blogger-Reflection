import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import FaceRegistrationScreen from './components/FaceRegistrationScreen';
import AttendanceCheckInScreen from './components/AttendanceCheckInScreen';
import AttendanceHistoryScreen from './components/AttendanceHistoryScreen';
import AdminDashboardScreen from './components/AdminDashboardScreen';
import StudentDetailScreen from './components/StudentDetailScreen';
import AnalyticsDashboardScreen from './components/AnalyticsDashboardScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNavBar from './components/BottomNavBar';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  faceRegistered: boolean;
  profileImage?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    // Show splash for 2 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    // Show nav bar only for main app screens
    const navBarScreens = ['home', 'attendance-history', 'admin-dashboard', 'analytics', 'settings'];
    setShowNavBar(user !== null && navBarScreens.includes(currentScreen));
  }, [currentScreen, user]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (!userData.faceRegistered) {
      setCurrentScreen('face-registration');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleSignUp = (userData: User) => {
    setUser(userData);
    setCurrentScreen('face-registration');
  };

  const handleFaceRegistered = () => {
    if (user) {
      setUser({ ...user, faceRegistered: true });
      setCurrentScreen('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const handleViewStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentScreen('student-detail');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onNavigateToSignUp={() => setCurrentScreen('signup')} />;
      case 'signup':
        return <SignUpScreen onSignUp={handleSignUp} onNavigateToLogin={() => setCurrentScreen('login')} />;
      case 'face-registration':
        return <FaceRegistrationScreen onComplete={handleFaceRegistered} userName={user?.name || ''} />;
      case 'home':
        return <AttendanceCheckInScreen user={user!} onNavigate={handleNavigation} />;
      case 'attendance-history':
        return <AttendanceHistoryScreen user={user!} />;
      case 'admin-dashboard':
        return <AdminDashboardScreen onViewStudent={handleViewStudent} />;
      case 'student-detail':
        return <StudentDetailScreen studentId={selectedStudentId!} onBack={() => setCurrentScreen('admin-dashboard')} />;
      case 'analytics':
        return <AnalyticsDashboardScreen />;
      case 'settings':
        return <SettingsScreen user={user!} onLogout={handleLogout} onReregisterFace={() => setCurrentScreen('face-registration')} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="w-full max-w-md h-screen md:h-[812px] bg-[#0F172A] md:rounded-[32px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
        
        {showNavBar && (
          <BottomNavBar 
            currentScreen={currentScreen} 
            onNavigate={handleNavigation}
            userRole={user?.role || 'student'}
          />
        )}
      </div>
    </div>
  );
}
