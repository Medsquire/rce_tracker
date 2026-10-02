import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bus, Lock, Eye, EyeOff, CheckCircle2, User, KeyRound } from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function DriverLogin() {
  const navigate = useNavigate();
  const { setUserRole, showToast } = useBus();
  
  const [driverId, setDriverId] = useState('DRV001');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!driverId.trim()) {
      showToast('Please enter Driver ID');
      return;
    }
    setUserRole('driver');
    showToast('Logged in as Driver Ramesh Kumar');
    navigate('/driver/dashboard');
  };

  return (
    <div className="bg-slate-50 h-full flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md">
        <button onClick={() => navigate('/')} className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-base font-bold tracking-wide">Driver Authentication</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Logo Banner */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
            <Bus size={32} />
          </div>
          <h1 className="text-xl font-extrabold text-slate-800">Welcome Back, Driver</h1>
          <p className="text-xs text-slate-500 mt-1">Eluru College Bus Transport Portal</p>
        </div>

        {/* Quick Credentials Demo Switcher */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 text-xs text-blue-900 flex justify-between items-center">
          <div>
            <span className="font-bold block">Demo Login Credentials:</span>
            <span className="text-[11px] text-blue-700">ID: DRV001 | Pass: 123456</span>
          </div>
          <button 
            type="button"
            onClick={() => { setDriverId('DRV001'); setPassword('123456'); }}
            className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-blue-700 active:scale-95 transition"
          >
            Auto-fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Driver ID / Badge No.</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                placeholder="e.g. DRV001"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-white text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-white text-slate-800"
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

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <label className="flex items-center cursor-pointer gap-2 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Contact Supervisor to reset password'); }} className="text-blue-600 hover:underline font-medium">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 active:scale-[0.99] transition mt-2"
          >
            Start Shift & Login
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500">
            Are you a Fleet Manager?{' '}
            <button
              onClick={() => navigate('/supervisor/login')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Supervisor Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
