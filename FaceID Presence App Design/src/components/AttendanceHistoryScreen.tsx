import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { User } from '../App';

interface AttendanceRecord {
  id: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  confidence: number;
}

interface AttendanceHistoryScreenProps {
  user: User;
}

// Mock data
const attendanceData: AttendanceRecord[] = [
  { id: '1', date: '2025-11-12', time: '09:15 AM', status: 'present', confidence: 98.5 },
  { id: '2', date: '2025-11-11', time: '09:20 AM', status: 'present', confidence: 96.2 },
  { id: '3', date: '2025-11-10', time: '09:10 AM', status: 'present', confidence: 97.8 },
  { id: '4', date: '2025-11-09', time: '-', status: 'absent', confidence: 0 },
  { id: '5', date: '2025-11-08', time: '09:25 AM', status: 'present', confidence: 95.5 },
  { id: '6', date: '2025-11-07', time: '09:18 AM', status: 'present', confidence: 98.1 },
  { id: '7', date: '2025-11-06', time: '09:12 AM', status: 'present', confidence: 97.3 },
  { id: '8', date: '2025-11-05', time: '09:22 AM', status: 'present', confidence: 96.8 },
];

const chartData = [
  { month: 'Jul', rate: 85 },
  { month: 'Aug', rate: 88 },
  { month: 'Sep', rate: 92 },
  { month: 'Oct', rate: 90 },
  { month: 'Nov', rate: 94 },
];

export default function AttendanceHistoryScreen({ user }: AttendanceHistoryScreenProps) {
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('week');

  const presentCount = attendanceData.filter(r => r.status === 'present').length;
  const totalCount = attendanceData.length;
  const attendanceRate = Math.round((presentCount / totalCount) * 100);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filterButtons = [
    { id: 'week' as const, label: 'This Week' },
    { id: 'month' as const, label: 'This Month' },
    { id: 'all' as const, label: 'All' },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <h1 className="text-white mb-6">My Attendance</h1>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#06B6D4] to-[#0891b2] rounded-3xl p-6 mb-6 shadow-lg shadow-[#06B6D4]/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80">Overall Attendance Rate</p>
              <h2 className="text-white">{attendanceRate}%</h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex gap-4 text-white/90">
            <div>
              <p className="text-white/70">Present</p>
              <p>{presentCount} days</p>
            </div>
            <div className="w-px bg-white/20"></div>
            <div>
              <p className="text-white/70">Absent</p>
              <p>{totalCount - presentCount} days</p>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1e293b] rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
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

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                filter === btn.id
                  ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30'
                  : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attendance List */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-3">
          {attendanceData.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1e293b] rounded-2xl p-4 flex items-center gap-4"
            >
              {/* Status Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                record.status === 'present' 
                  ? 'bg-[#10b981]/20' 
                  : 'bg-red-500/20'
              }`}>
                {record.status === 'present' ? (
                  <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>

              {/* Date and Time */}
              <div className="flex-1">
                <p className="text-white">{formatDate(record.date)}</p>
                <p className="text-[#94a3b8]">{record.time}</p>
              </div>

              {/* Confidence */}
              {record.status === 'present' && (
                <div className="text-right">
                  <p className="text-[#06B6D4]">{record.confidence}%</p>
                  <p className="text-[#64748b]">confidence</p>
                </div>
              )}

              {record.status === 'absent' && (
                <div className="px-3 py-1 bg-red-500/20 rounded-lg">
                  <p className="text-red-500">Absent</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
