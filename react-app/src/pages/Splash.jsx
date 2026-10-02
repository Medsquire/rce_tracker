import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, ShieldCheck, MapPin, UserCheck, ArrowRight, Compass } from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function Splash() {
  const navigate = useNavigate();
  const { setUserRole } = useBus();

  const handleRoleSelect = (role) => {
    setUserRole(role);
    if (role === 'driver') navigate('/driver/login');
    else navigate('/supervisor/login');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white overflow-y-auto">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs text-blue-300 font-medium">
          <Compass size={14} className="text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Eluru Region Active</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">v2.4 Pro</span>
      </div>

      {/* Hero Branding */}
      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl animate-pulse"></div>
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-3xl flex items-center justify-center shadow-2xl relative border border-white/20">
            <Bus size={48} className="drop-shadow-md" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">
          College Bus Tracker
        </h1>
        <p className="text-xs text-indigo-200 font-medium max-w-xs mb-6 leading-relaxed">
          Sir C.R. Reddy & Allied Institutions • Eluru Live GPS Navigation & Attendance Portal
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-3 gap-2 w-full mb-2 text-left">
          <div className="bg-slate-800/80 border border-slate-700/60 p-2.5 rounded-xl flex flex-col items-center text-center">
            <MapPin size={18} className="text-emerald-400 mb-1" />
            <span className="text-[10px] font-semibold text-slate-200">Eluru Map</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 p-2.5 rounded-xl flex flex-col items-center text-center">
            <UserCheck size={18} className="text-blue-400 mb-1" />
            <span className="text-[10px] font-semibold text-slate-200">Attendance</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 p-2.5 rounded-xl flex flex-col items-center text-center">
            <ShieldCheck size={18} className="text-purple-400 mb-1" />
            <span className="text-[10px] font-semibold text-slate-200">Supervisor</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-2">
        <button
          onClick={() => handleRoleSelect('driver')}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 px-5 rounded-2xl font-bold text-sm shadow-lg hover:shadow-blue-500/25 active:scale-[0.99] transition flex items-center justify-between border border-blue-400/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Bus size={18} />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Driver Portal</div>
              <div className="text-[10px] text-blue-100 font-normal">Trip Control & Live GPS</div>
            </div>
          </div>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => handleRoleSelect('supervisor')}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 py-3.5 px-5 rounded-2xl font-bold text-sm shadow-md active:scale-[0.99] transition flex items-center justify-between border border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Supervisor Login</div>
              <div className="text-[10px] text-slate-400 font-normal">Fleet Monitor & Edit Drivers</div>
            </div>
          </div>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
