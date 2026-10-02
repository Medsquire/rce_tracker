import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Search, UserCheck, UserX, Clock, QrCode, Plus, Check,
  Sparkles, Filter, Phone, Save, AlertCircle, X
} from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function DriverAttendance() {
  const navigate = useNavigate();
  const { students, toggleStudentStatus, addStudent, showToast } = useBus();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('All'); // 'All' | 'Boarded' | 'Absent' | 'Pending'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);

  // New Student Form state
  const [newRollNo, setNewRollNo] = useState('');
  const [newName, setNewName] = useState('');
  const [newStop, setNewStop] = useState('Fire Station Center');
  const [newPhone, setNewPhone] = useState('');

  // Stats calculation
  const total = students.length;
  const boardedCount = students.filter((s) => s.status === 'Boarded').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;
  const pendingCount = students.filter((s) => s.status === 'Pending').length;
  const boardedPercentage = total > 0 ? Math.round((boardedCount / total) * 100) : 0;

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.stop.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterTab === 'All') return matchesSearch;
    return matchesSearch && s.status === filterTab;
  });

  const handleSaveAttendance = () => {
    showToast(`Attendance saved! ${boardedCount}/${total} students boarded.`);
    navigate(-1);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addStudent({
      rollNo: newRollNo,
      name: newName,
      stop: newStop,
      phone: newPhone
    });
    setNewName('');
    setNewRollNo('');
    setShowAddModal(false);
  };

  const handleSimulateScan = () => {
    // Pick first pending student or create mock
    const pendingStudent = students.find(s => s.status === 'Pending' || s.status === 'Absent');
    if (pendingStudent) {
      toggleStudentStatus(pendingStudent.id);
      showToast(`⚡ RFID Card Scanned! ${pendingStudent.name} (${pendingStudent.rollNo}) marked BOARDED.`);
    } else {
      showToast('⚡ RFID Card Scanned! Student verified.');
    }
    setShowScannerModal(false);
  };

  return (
    <div className="bg-slate-100 h-full flex flex-col justify-between overflow-y-auto relative">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 text-blue-100 hover:text-white rounded-xl hover:bg-blue-700 transition">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-base font-bold tracking-tight">Student Attendance</h2>
            <p className="text-[10px] text-blue-100 font-medium">Bus 1 • Eluru Engineering Route</p>
          </div>
        </div>

        <button
          onClick={() => setShowScannerModal(true)}
          className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center gap-1 text-xs font-bold transition"
        >
          <QrCode size={18} />
          <span className="hidden sm:inline">Scan Tag</span>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Attendance Summary Stats Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800">Boarding Progress ({boardedPercentage}%)</span>
            <span className="text-[11px] font-bold text-blue-600">{boardedCount} / {total} Boarded</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div style={{ width: `${(boardedCount / total) * 100}%` }} className="bg-emerald-500 transition-all duration-500"></div>
            <div style={{ width: `${(absentCount / total) * 100}%` }} className="bg-rose-500 transition-all duration-500"></div>
            <div style={{ width: `${(pendingCount / total) * 100}%` }} className="bg-amber-400 transition-all duration-500"></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="bg-emerald-50 text-emerald-700 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1">
              <UserCheck size={14} /> {boardedCount} Boarded
            </div>
            <div className="bg-rose-50 text-rose-700 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1">
              <UserX size={14} /> {absentCount} Absent
            </div>
            <div className="bg-amber-50 text-amber-700 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1">
              <Clock size={14} /> {pendingCount} Pending
            </div>
          </div>
        </div>

        {/* Search & Action Controls */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, roll no, stop..."
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium text-slate-800"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition shrink-0"
            title="Add Student"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1.5 bg-slate-200/60 p-1 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
          {['All', 'Boarded', 'Absent', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`flex-1 py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                filterTab === tab
                  ? 'bg-white text-blue-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Student List */}
        <div className="space-y-2">
          {filteredStudents.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl text-center text-slate-400 text-xs border border-slate-200">
              No students found matching your filter.
            </div>
          ) : (
            filteredStudents.map((s) => (
              <div
                key={s.id}
                onClick={() => toggleStudentStatus(s.id)}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    s.status === 'Boarded' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : s.status === 'Absent' 
                      ? 'bg-rose-100 text-rose-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
                      <span>{s.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">({s.rollNo})</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                      <span>📍 {s.stop}</span>
                      {s.time !== '--' && <span className="text-[10px] text-slate-400">• {s.time}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    s.status === 'Boarded' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : s.status === 'Absent' 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Save Button Drawer */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <button
          onClick={handleSaveAttendance}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <Save size={18} />
          <span>CONFIRM & SAVE ATTENDANCE</span>
        </button>
      </div>

      {/* Modal: Add New Student */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Register New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Student Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. K. Sai Teja"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Roll Number</label>
                <input
                  type="text"
                  value={newRollNo}
                  onChange={(e) => setNewRollNo(e.target.value)}
                  placeholder="e.g. 21A91A0509"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Boarding Stop</label>
                <select
                  value={newStop}
                  onChange={(e) => setNewStop(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Eluru Rly Station">Eluru Rly Station</option>
                  <option value="Old Bus Stand">Old Bus Stand</option>
                  <option value="Fire Station Center">Fire Station Center</option>
                  <option value="Ashram Junction">Ashram Junction</option>
                  <option value="Tangellamudi">Tangellamudi</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs shadow-md"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: RFID Scanner Simulator */}
      {showScannerModal && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs text-center space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">RFID / QR Bus Pass Scanner</span>
              <button onClick={() => setShowScannerModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="w-40 h-40 bg-slate-900 rounded-2xl mx-auto border-4 border-blue-500 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
              <QrCode size={72} className="text-blue-400 z-10" />
              <div className="absolute w-full h-0.5 bg-emerald-400 top-1/2 left-0 shadow-[0_0_10px_#34d399] animate-bounce"></div>
            </div>

            <p className="text-xs text-slate-600 font-medium">Hold student bus ID card near camera to scan RFID chip</p>

            <button
              onClick={handleSimulateScan}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              SIMULATE SUCCESSFUL SCAN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
