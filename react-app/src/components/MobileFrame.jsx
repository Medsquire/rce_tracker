import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Clock } from 'lucide-react';

export default function MobileFrame({ children }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-white select-none">
      {/* Smartphone Status Bar */}
      <div className="w-full bg-slate-900 text-white px-5 pt-2 pb-1.5 flex justify-between items-center text-xs font-semibold tracking-tight shrink-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-blue-400" />
          <span>{timeStr || '09:41 AM'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-[10px] font-bold bg-blue-600/30 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">ELURU GPS</span>
          <Signal size={13} className="text-emerald-400" />
          <Wifi size={13} className="text-blue-400" />
          <Battery size={14} className="text-slate-200" />
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
        {children}
      </div>

      {/* Android/iOS Bottom Pill */}
      <div className="w-full bg-slate-900 py-1 flex justify-center shrink-0 z-40">
        <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
      </div>
    </div>
  );
}
