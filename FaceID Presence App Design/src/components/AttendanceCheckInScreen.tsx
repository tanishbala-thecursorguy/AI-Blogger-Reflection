import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Camera, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import type { User } from '../App';

interface AttendanceCheckInScreenProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export default function AttendanceCheckInScreen({ user, onNavigate }: AttendanceCheckInScreenProps) {
  const [step, setStep] = useState<'ready' | 'scanning' | 'success' | 'error'>('ready');
  const [gpsStatus, setGpsStatus] = useState<'checking' | 'verified' | 'outOfRange'>('verified');
  const [attendanceTime, setAttendanceTime] = useState<string>('');

  // Mock GPS coordinates
  const currentLocation = { lat: 40.7128, lng: -74.0060 };
  const classroomLocation = { lat: 40.7130, lng: -74.0062 };
  const distance = 45; // meters

  const handleMarkAttendance = () => {
    setStep('scanning');
    
    // Simulate face scanning
    setTimeout(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setAttendanceTime(timeString);
      setStep('success');
      
      // Auto-reset after showing success
      setTimeout(() => {
        setStep('ready');
      }, 3000);
    }, 3000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16 border-2 border-[#06B6D4]">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback className="bg-[#06B6D4] text-white">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-white">Hello, {user.name.split(' ')[0]}!</h2>
            <p className="text-[#94a3b8]">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </div>
          <div className="text-right">
            <p className="text-[#94a3b8]">Today</p>
            <p className="text-white">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>

        {/* GPS Status Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-[#1e293b] rounded-2xl p-4 flex items-center gap-3 ${
            gpsStatus === 'verified' ? 'border-2 border-[#10b981]' : ''
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            gpsStatus === 'verified' 
              ? 'bg-[#10b981]/20' 
              : gpsStatus === 'outOfRange'
              ? 'bg-red-500/20'
              : 'bg-[#06B6D4]/20'
          }`}>
            <MapPin className={`w-6 h-6 ${
              gpsStatus === 'verified' 
                ? 'text-[#10b981]' 
                : gpsStatus === 'outOfRange'
                ? 'text-red-500'
                : 'text-[#06B6D4]'
            }`} />
          </div>
          <div className="flex-1">
            <p className="text-white">GPS Location</p>
            <p className={`${
              gpsStatus === 'verified' ? 'text-[#10b981]' : 'text-[#94a3b8]'
            }`}>
              {gpsStatus === 'verified' && `Within ${distance}m of classroom ✓`}
              {gpsStatus === 'outOfRange' && 'Out of range ✗'}
              {gpsStatus === 'checking' && 'Checking location...'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Camera Preview / Scan Area */}
      <div className="flex-1 px-6 flex items-center justify-center overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {step === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              {/* Camera preview placeholder */}
              <div className="relative aspect-[3/4] max-h-[400px] mx-auto bg-gradient-to-br from-[#1e293b] to-[#0F172A] rounded-3xl overflow-hidden border-2 border-[#334155]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-[#334155]" />
                </div>
                
                {/* Face frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#06B6D4] opacity-50"></div>
                </div>
              </div>

              <p className="text-center text-[#94a3b8] mt-6">
                Position your face in the frame to mark attendance
              </p>
            </motion.div>
          )}

          {step === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              <div className="relative aspect-[3/4] max-h-[400px] mx-auto bg-gradient-to-br from-[#1e293b] to-[#0F172A] rounded-3xl overflow-hidden border-2 border-[#06B6D4]">
                {/* Scanning animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="w-48 h-48 rounded-full border-4 border-[#06B6D4] relative">
                      {/* Radar scanning effect */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="w-full h-full relative">
                          <div className="absolute top-0 left-1/2 w-0.5 h-24 bg-gradient-to-b from-[#06B6D4] to-transparent origin-bottom"></div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Scanning line */}
                <motion.div
                  animate={{
                    y: [0, 400, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"
                />
              </div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-center text-[#06B6D4] mt-6"
              >
                Scanning face...
              </motion.p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#10b981]/50"
              >
                <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
              </motion.div>

              <h2 className="text-white mb-2">Face Matched Successfully!</h2>
              <p className="text-[#10b981] mb-6">Attendance marked at {attendanceTime}</p>

              <div className="bg-[#1e293b] rounded-2xl p-6 max-w-xs mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#94a3b8]">Confidence Score</span>
                  <span className="text-white">98.5%</span>
                </div>
                <div className="w-full h-2 bg-[#334155] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '98.5%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#06B6D4]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mark Attendance Button */}
      {step === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 p-6 pb-24"
        >
          <Button
            onClick={handleMarkAttendance}
            disabled={gpsStatus === 'outOfRange'}
            className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] hover:from-[#0891b2] hover:to-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="w-5 h-5 mr-2" />
            Mark Attendance
          </Button>
        </motion.div>
      )}
    </div>
  );
}
