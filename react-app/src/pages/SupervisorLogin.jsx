import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function SupervisorLogin() {
  const navigate = useNavigate();
  const { setUserRole, showToast } = useBus();

  const [username, setUsername] = useState('admin_eluru');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole('supervisor');
    showToast('Logged in as Transport Supervisor Admin');
    navigate('/supervisor/dashboard');
  };

  return (
    <div className="bg-slate-50 h-full flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="bg-indigo-950 text-white p-4 flex items-center justify-between shadow-md">
        <button onClick={() => navigate('/')} className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-indigo-900 transition">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-base font-bold tracking-wide">Supervisor Control Panel</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
            <ShieldCheck size={36} />
          </div>
          <h1 className="text-xl font-extrabold text-slate-800">Transport Manager</h1>
          <p className="text-xs text-slate-500 mt-1">Sir C.R. Reddy Educational Society • Eluru</p>
        </div>

        {/* Quick Credentials Demo Box */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 mb-5 text-xs text-indigo-900 flex justify-between items-center">
          <div>
            <span className="font-bold block">Supervisor Login:</span>
            <span className="text-[11px] text-indigo-700">User: admin_eluru | Pass: admin123</span>
          </div>
          <button
            type="button"
            onClick={() => { setUsername('admin_eluru'); setPassword('admin123'); }}
            className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-indigo-700 active:scale-95 transition"
          >
            Auto-fill
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Supervisor Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-white text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-white text-slate-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 active:scale-[0.99] transition mt-2"
          >
            Access Supervisor Dashboard
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500">
            Logging in as Bus Driver?{' '}
            <button
              onClick={() => navigate('/driver/login')}
              className="text-blue-600 font-bold hover:underline"
            >
              Driver Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
