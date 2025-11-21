import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  profileImage: string;
  status: 'present' | 'absent';
  confidence?: number;
  checkInTime?: string;
}

interface AdminDashboardScreenProps {
  onViewStudent: (studentId: string) => void;
}

// Mock student data
const students: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    rollNumber: 'CS2021001',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    status: 'present',
    confidence: 98.5,
    checkInTime: '09:15 AM',
  },
  {
    id: '2',
    name: 'Michael Chen',
    rollNumber: 'CS2021002',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    status: 'present',
    confidence: 96.2,
    checkInTime: '09:12 AM',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    rollNumber: 'CS2021003',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    status: 'absent',
  },
  {
    id: '4',
    name: 'David Martinez',
    rollNumber: 'CS2021004',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    status: 'present',
    confidence: 94.8,
    checkInTime: '09:18 AM',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    rollNumber: 'CS2021005',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    status: 'present',
    confidence: 97.3,
    checkInTime: '09:10 AM',
  },
  {
    id: '6',
    name: 'James Wilson',
    rollNumber: 'CS2021006',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    status: 'present',
    confidence: 85.2,
    checkInTime: '09:25 AM',
  },
  {
    id: '7',
    name: 'Sophia Taylor',
    rollNumber: 'CS2021007',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    status: 'absent',
  },
];

export default function AdminDashboardScreen({ onViewStudent }: AdminDashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'lowConfidence' | 'absent'>('all');

  const filterButtons = [
    { id: 'all' as const, label: 'All', count: students.length },
    { id: 'today' as const, label: 'Today', count: students.filter(s => s.status === 'present').length },
    { id: 'lowConfidence' as const, label: 'Low Confidence', count: students.filter(s => s.confidence && s.confidence < 90).length },
    { id: 'absent' as const, label: 'Absent', count: students.filter(s => s.status === 'absent').length },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'today') return matchesSearch && student.status === 'present';
    if (filter === 'lowConfidence') return matchesSearch && student.confidence && student.confidence < 90;
    if (filter === 'absent') return matchesSearch && student.status === 'absent';
    return matchesSearch;
  });

  const presentCount = students.filter(s => s.status === 'present').length;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <h1 className="text-white mb-6">Student Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1e293b] rounded-2xl p-4 text-center"
          >
            <p className="text-[#94a3b8] mb-1">Total</p>
            <p className="text-white">{students.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-4 text-center"
          >
            <p className="text-white/80 mb-1">Present</p>
            <p className="text-white">{presentCount}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#06B6D4] to-[#0891b2] rounded-2xl p-4 text-center"
          >
            <p className="text-white/80 mb-1">Rate</p>
            <p className="text-white">{attendanceRate}%</p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
          <Input
            type="text"
            placeholder="Search student by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b] rounded-xl focus:border-[#06B6D4] focus:ring-[#06B6D4]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                filter === btn.id
                  ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30'
                  : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]'
              }`}
            >
              <span>{btn.label}</span>
              <span className={`px-2 py-0.5 rounded-full ${
                filter === btn.id ? 'bg-white/20' : 'bg-[#334155]'
              }`}>
                {btn.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-3">
          {filteredStudents.map((student, index) => (
            <motion.button
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onViewStudent(student.id)}
              className="w-full bg-[#1e293b] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#334155] transition-colors"
            >
              {/* Profile Image */}
              <Avatar className="w-14 h-14 border-2 border-[#334155]">
                <AvatarImage src={student.profileImage} alt={student.name} />
                <AvatarFallback className="bg-[#06B6D4] text-white">
                  {student.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Student Info */}
              <div className="flex-1 text-left">
                <p className="text-white">{student.name}</p>
                <p className="text-[#94a3b8]">{student.rollNumber}</p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                {student.status === 'present' ? (
                  <>
                    <div className="text-right">
                      <p className="text-[#10b981]">{student.checkInTime}</p>
                      {student.confidence && student.confidence < 90 && (
                        <div className="flex items-center gap-1 text-orange-500">
                          <AlertCircle className="w-3 h-3" />
                          <p className="text-xs">{student.confidence}%</p>
                        </div>
                      )}
                      {student.confidence && student.confidence >= 90 && (
                        <p className="text-[#64748b]">{student.confidence}%</p>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                    </div>
                  </>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
                <ChevronRight className="w-5 h-5 text-[#64748b]" />
              </div>
            </motion.button>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#94a3b8]">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
}
