import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface FaceRegistrationScreenProps {
  onComplete: () => void;
  userName: string;
}

export default function FaceRegistrationScreen({ onComplete, userName }: FaceRegistrationScreenProps) {
  const [step, setStep] = useState<'instruction' | 'capture' | 'processing' | 'success'>('instruction');

  const handleCapture = () => {
    setStep('processing');
    // Simulate processing
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col">
      <AnimatePresence mode="wait">
        {step === 'instruction' && (
          <motion.div
            key="instruction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#0891b2] flex items-center justify-center mb-8 shadow-lg shadow-[#06B6D4]/50"
            >
              <Camera className="w-16 h-16 text-white" />
            </motion.div>

            <h1 className="text-white text-center mb-4">Register Your Face</h1>
            <p className="text-[#94a3b8] text-center mb-12 px-4">
              We need to register your face for attendance verification. This is a one-time setup.
            </p>

            <div className="w-full space-y-4 bg-[#1e293b] rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#06B6D4] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white">1</span>
                </div>
                <div>
                  <p className="text-white">Position your face in the circle</p>
                  <p className="text-[#94a3b8]">Make sure your face is well-lit and centered</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#06B6D4] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white">2</span>
                </div>
                <div>
                  <p className="text-white">Look straight at the camera</p>
                  <p className="text-[#94a3b8]">Remove glasses if possible</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#06B6D4] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white">3</span>
                </div>
                <div>
                  <p className="text-white">Stay still during capture</p>
                  <p className="text-[#94a3b8]">The process takes just a few seconds</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep('capture')}
              className="w-full max-w-xs bg-gradient-to-r from-[#06B6D4] to-[#0891b2] hover:from-[#0891b2] hover:to-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 h-14 rounded-xl"
            >
              Start Camera
            </Button>
          </motion.div>
        )}

        {step === 'capture' && (
          <motion.div
            key="capture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Camera viewfinder */}
            <div className="flex-1 relative bg-black overflow-hidden">
              {/* Simulated camera feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0F172A] opacity-80"></div>
              
              {/* Face overlay circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Outer circle */}
                  <div className="w-64 h-64 rounded-full border-4 border-[#06B6D4] relative">
                    {/* Corner indicators */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-full"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-full"></div>
                  </div>

                  {/* Scanning line */}
                  <motion.div
                    animate={{
                      y: [-120, 120],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-70"
                    style={{ top: '50%' }}
                  />
                </motion.div>
              </div>

              {/* Instruction text */}
              <div className="absolute top-8 left-0 right-0 text-center">
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-white"
                >
                  Align your face in the circle and look straight
                </motion.p>
              </div>
            </div>

            {/* Capture button */}
            <div className="p-6 bg-gradient-to-t from-[#0F172A] to-transparent">
              <Button
                onClick={handleCapture}
                className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] hover:from-[#0891b2] hover:to-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 h-14 rounded-xl"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture Face
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full border-4 border-[#06B6D4] border-t-transparent mb-8"
            />
            <h2 className="text-white text-center mb-4">Processing Face Data</h2>
            <p className="text-[#94a3b8] text-center">
              Our AI is analyzing your facial features...
            </p>
            
            <div className="mt-12 w-full max-w-xs space-y-3">
              {['Detecting facial landmarks', 'Creating face embedding', 'Storing data securely'].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5 }}
                  className="flex items-center gap-3 text-[#94a3b8]"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-[#06B6D4]" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mb-8 shadow-lg shadow-[#10b981]/50"
            >
              <Check className="w-16 h-16 text-white" strokeWidth={3} />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-center mb-4"
            >
              Face Registered Successfully!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#94a3b8] text-center mb-8"
            >
              Welcome aboard, {userName}! You can now mark attendance using face recognition.
            </motion.p>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-[#10b981] rounded-full"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
