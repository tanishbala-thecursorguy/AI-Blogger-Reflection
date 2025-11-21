import { motion } from 'motion/react';
import { Users, TrendingUp, Calendar, AlertTriangle, Download, MapPin } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';

// Mock data
const dailyAttendanceData = [
  { day: 'Mon', present: 85, absent: 15 },
  { day: 'Tue', present: 88, absent: 12 },
  { day: 'Wed', present: 82, absent: 18 },
  { day: 'Thu', present: 90, absent: 10 },
  { day: 'Fri', present: 87, absent: 13 },
];

const statusData = [
  { name: 'Present', value: 432, color: '#10b981' },
  { name: 'Absent', value: 68, color: '#ef4444' },
];

const departmentData = [
  { dept: 'CS', rate: 92 },
  { dept: 'EE', rate: 88 },
  { dept: 'ME', rate: 85 },
  { dept: 'CE', rate: 90 },
];

export default function AnalyticsDashboardScreen() {
  const totalStudents = 500;
  const avgAttendance = 86.4;
  const todayCheckIns = 432;
  const anomalies = 3;

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white">Analytics</h1>
          <Button
            size="sm"
            className="bg-[#1e293b] text-white hover:bg-[#334155] border border-[#334155]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#06B6D4] to-[#0891b2] rounded-2xl p-4 shadow-lg shadow-[#06B6D4]/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-white/80">Total Students</p>
            <p className="text-white text-2xl">{totalStudents}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-4 shadow-lg shadow-[#10b981]/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-white/80">Avg Attendance</p>
            <p className="text-white text-2xl">{avgAttendance}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1e293b] rounded-2xl p-4 border border-[#334155]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#06B6D4]/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#06B6D4]" />
              </div>
            </div>
            <p className="text-[#94a3b8]">Today's Check-Ins</p>
            <p className="text-white text-2xl">{todayCheckIns}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#1e293b] rounded-2xl p-4 border border-orange-500/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <p className="text-[#94a3b8]">Anomalies</p>
            <p className="text-white text-2xl">{anomalies}</p>
          </motion.div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Daily Attendance Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e293b] rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white mb-4">Daily Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart and Department Stats */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Present vs Absent Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1e293b] rounded-2xl p-6"
          >
            <h3 className="text-white mb-4">Present vs Absent</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#94a3b8]">{item.name}</span>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1e293b] rounded-2xl p-6"
          >
            <h3 className="text-white mb-4">Department Performance</h3>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={dept.dept}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{dept.dept}</span>
                    <span className="text-[#06B6D4]">{dept.rate}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#334155] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.rate}%` }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GPS Distribution Map */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1e293b] rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#06B6D4]" />
            <h3 className="text-white">GPS Attendance Distribution</h3>
          </div>
          {/* Map placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-[#0F172A] to-[#334155] rounded-xl overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#10b981] rounded-full shadow-lg shadow-[#10b981]/50 animate-pulse" />
              <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-[#10b981] rounded-full shadow-lg shadow-[#10b981]/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-[#10b981] rounded-full shadow-lg shadow-[#10b981]/50 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-[#10b981] rounded-full shadow-lg shadow-[#10b981]/50 animate-pulse" style={{ animationDelay: '0.6s' }} />
              <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50 animate-pulse" style={{ animationDelay: '0.8s' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#64748b] mx-auto mb-2" />
                <p className="text-[#64748b]">GPS Data Visualization</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
              <span className="text-[#94a3b8]">Valid Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-[#94a3b8]">Out of Range</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
