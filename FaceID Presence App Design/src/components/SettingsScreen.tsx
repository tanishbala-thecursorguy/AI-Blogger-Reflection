import { motion } from 'motion/react';
import { User, Mail, Lock, Camera, LogOut, Moon, Sun, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useState } from 'react';
import type { User as UserType } from '../App';

interface SettingsScreenProps {
  user: UserType;
  onLogout: () => void;
  onReregisterFace: () => void;
}

export default function SettingsScreen({ user, onLogout, onReregisterFace }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: () => {}, hasChevron: true },
        { icon: Mail, label: 'Email', value: user.email, hasChevron: false },
        { icon: Lock, label: 'Change Password', action: () => {}, hasChevron: true },
      ],
    },
    {
      title: 'Face Recognition',
      items: [
        { icon: Camera, label: 'Re-register Face', action: onReregisterFace, hasChevron: true, highlighted: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Moon, label: 'Dark Mode', toggle: true, value: darkMode, onChange: setDarkMode },
        { icon: Bell, label: 'Notifications', toggle: true, value: notifications, onChange: setNotifications },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: Shield, label: 'Privacy Policy', action: () => {}, hasChevron: true },
        { icon: HelpCircle, label: 'Help & Support', action: () => {}, hasChevron: true },
      ],
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <h1 className="text-white mb-6">Settings</h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#06B6D4] to-[#0891b2] rounded-3xl p-6 mb-6 shadow-lg shadow-[#06B6D4]/30"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-white/30">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback className="bg-white/20 text-white text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-white mb-1">{user.name}</h2>
              <p className="text-white/80 mb-2">{user.email}</p>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                <span className="text-white capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h3 className="text-[#94a3b8] mb-3 px-2">{section.title}</h3>
            <div className="bg-[#1e293b] rounded-2xl overflow-hidden">
              {section.items.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={item.action}
                    className={`w-full p-4 flex items-center gap-4 hover:bg-[#334155] transition-colors ${
                      item.highlighted ? 'bg-[#06B6D4]/10' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.highlighted 
                        ? 'bg-[#06B6D4]/20' 
                        : 'bg-[#334155]'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        item.highlighted ? 'text-[#06B6D4]' : 'text-[#94a3b8]'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={item.highlighted ? 'text-[#06B6D4]' : 'text-white'}>
                        {item.label}
                      </p>
                      {item.value && !item.toggle && (
                        <p className="text-[#64748b]">{item.value}</p>
                      )}
                    </div>
                    {item.toggle && item.onChange && (
                      <Switch
                        checked={item.value as boolean}
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-[#06B6D4]"
                      />
                    )}
                    {item.hasChevron && (
                      <ChevronRight className="w-5 h-5 text-[#64748b]" />
                    )}
                  </button>
                  {index < section.items.length - 1 && (
                    <div className="h-px bg-[#334155] mx-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onLogout}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 h-14 rounded-xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[#64748b]">FaceID Presence</p>
          <p className="text-[#64748b]">Version 1.0.0</p>
        </motion.div>
      </div>
    </div>
  );
}
