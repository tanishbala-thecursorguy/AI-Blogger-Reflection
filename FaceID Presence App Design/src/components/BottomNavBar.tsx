import { motion } from 'motion/react';
import { Home, Calendar, BarChart3, User, Users } from 'lucide-react';
import type { UserRole } from '../App';

interface BottomNavBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userRole: UserRole;
}

export default function BottomNavBar({ currentScreen, onNavigate, userRole }: BottomNavBarProps) {
  // Different navigation items based on role
  const studentNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance-history', label: 'History', icon: Calendar },
    { id: 'settings', label: 'Profile', icon: User },
  ];

  const adminNavItems = [
    { id: 'home', label: 'Check-In', icon: Home },
    { id: 'admin-dashboard', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Profile', icon: User },
  ];

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#1e293b]/95 backdrop-blur-lg border-t border-[#334155]">
      <div className="flex items-center justify-around px-6 py-3">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#06B6D4]/20 rounded-xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 transition-colors ${
                  isActive ? 'text-[#06B6D4]' : 'text-[#94a3b8]'
                }`}
              />
              <span
                className={`text-xs relative z-10 transition-colors ${
                  isActive ? 'text-[#06B6D4]' : 'text-[#94a3b8]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
