import { motion } from 'motion/react';
import { ArrowLeft, Calendar, TrendingUp, Clock, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

interface StudentDetailScreenProps {
  studentId: string;
  onBack: () => void;
}

// Mock student data
const studentData = {
  id: '1',
  name: 'Emma Johnson',
  rollNumber: 'CS2021001',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  attendanceRate: 92,
  totalDays: 100,
  presentDays: 92,
  absentDays: 8,
  onTimeRate: 88,
  avgConfidence: 97.2,
};

const attendanceTrend = [
  { week: 'W1', rate: 85 },
  { week: 'W2', rate: 90 },
  { week: 'W3', rate: 88 },
  { week: 'W4', rate: 92 },
  { week: 'W5', rate: 95 },
  { week: 'W6', rate: 92 },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  status: Math.random() > 0.15 ? 'present' : Math.random() > 0.5 ? 'absent' : 'late',
}));

export default function StudentDetailScreen({ studentId, onBack }: StudentDetailScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#94a3b8] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Student Profile */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <Avatar className="w-20 h-20 border-4 border-[#06B6D4]">
            <AvatarImage src={studentData.profileImage} alt={studentData.name} />
            <AvatarFallback className="bg-[#06B6D4] text-white text-2xl">
              {studentData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-white">{studentData.name}</h2>
            <p className="text-[#94a3b8]">{studentData.rollNumber}</p>
          </div>
        </motion.div>

        {/* Attendance Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#06B6D4] to-[#0891b2] rounded-3xl p-6 mb-6 shadow-lg shadow-[#06B6D4]/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 mb-1">Attendance Rate</p>
              <h1 className="text-white">{studentData.attendanceRate}%</h1>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-white/70 mb-1">Present</p>
              <p className="text-white">{studentData.presentDays} days</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-white/70 mb-1">Absent</p>
              <p className="text-white">{studentData.absentDays} days</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Attendance Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e293b] rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{ fill: '#06B6D4', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1e293b] rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#06B6D4]" />
            <h3 className="text-white">Attendance Calendar</h3>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-[#64748b] pb-2">
                {day}
              </div>
            ))}
            {calendarDays.map((day) => (
              <div
                key={day.day}
                className={`aspect-square rounded-lg flex items-center justify-center ${
                  day.status === 'present'
                    ? 'bg-[#10b981]'
                    : day.status === 'late'
                    ? 'bg-orange-500'
                    : 'bg-red-500/50'
                }`}
              >
                <span className="text-white text-xs">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-[#334155]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#10b981]"></div>
              <span className="text-[#94a3b8]">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span className="text-[#94a3b8]">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500/50"></div>
              <span className="text-[#94a3b8]">Absent</span>
            </div>
          </div>
        </motion.div>

        {/* Performance Analytics */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1e293b] rounded-2xl p-6"
        >
          <h3 className="text-white mb-4">Performance Analytics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#06B6D4]" />
                  <span className="text-white">On-Time Rate</span>
                </div>
                <span className="text-[#06B6D4]">{studentData.onTimeRate}%</span>
              </div>
              <div className="w-full h-2 bg-[#334155] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2]"
                  style={{ width: `${studentData.onTimeRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#10b981]" />
                  <span className="text-white">AI Confidence Average</span>
                </div>
                <span className="text-[#10b981]">{studentData.avgConfidence}%</span>
              </div>
              <div className="w-full h-2 bg-[#334155] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#10b981] to-[#059669]"
                  style={{ width: `${studentData.avgConfidence}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-[#0F172A] rounded-xl p-4">
                <p className="text-[#94a3b8] mb-1">Total Days</p>
                <p className="text-white">{studentData.totalDays}</p>
              </div>
              <div className="bg-[#0F172A] rounded-xl p-4">
                <p className="text-[#94a3b8] mb-1">Current Streak</p>
                <p className="text-white">12 days</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
