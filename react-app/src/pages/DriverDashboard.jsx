import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Bell, Bus, MapPin, ClipboardList, AlertTriangle, Home, Map as MapIcon,
  Play, Square, Radio, ShieldAlert, ArrowRight, Gauge, Clock, PhoneCall
} from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { isTripActive, toggleTrip, elapsedSeconds, drivers, students, showToast } = useBus();
  
  const currentDriver = drivers[0]; // Ramesh Kumar - Bus 1
  const boardedCount = students.filter(s => s.status === 'Boarded').length;

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmergency = () => {
    showToast('🚨 SOS ALERT SENT! Supervisor and Eluru Depot notified.');
  };

  return (
    <div className="bg-slate-100 h-full flex flex-col justify-between overflow-y-auto">
      {/* Top Profile & Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-5 rounded-b-3xl shadow-lg shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 border border-white/30 rounded-full flex items-center justify-center font-bold text-lg">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Ramesh Kumar 👋</h2>
              <p className="text-[11px] text-blue-100 font-medium flex items-center gap-1">
                <span>Bus Driver ID: DRV001</span>
              </p>
            </div>
          </div>
          <button 
            onClick={() => showToast('No new notifications')} 
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition relative"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
          </button>
        </div>

        {/* Vehicle Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <Bus size={22} />
            </div>
            <div>
              <div className="font-extrabold text-sm">{currentDriver.busNo}</div>
              <div className="text-[11px] text-blue-100 font-medium">{currentDriver.route}</div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
            isTripActive 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 animate-pulse' 
              : 'bg-slate-500/20 text-slate-200 border-slate-400/40'
          }`}>
            {isTripActive ? '● LIVE ON ROUTE' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4 flex-1">
        {/* START & END TRIP CONTROL BOX */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Radio size={16} className={isTripActive ? 'text-emerald-500 animate-ping' : 'text-slate-400'} />
              GPS Trip Status & Location Tracking
            </span>
            <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {isTripActive ? `ACTIVE: ${formatTimer(elapsedSeconds)}` : 'READY'}
            </span>
          </div>

          {!isTripActive ? (
            <button
              onClick={toggleTrip}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              <Play size={18} fill="currentColor" />
              <span>START TRIP (ELURU ROUTE 1)</span>
            </button>
          ) : (
            <button
              onClick={toggleTrip}
              className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-rose-500/20 active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              <Square size={18} fill="currentColor" />
              <span>END TRIP & COMPLETE SHIFT</span>
            </button>
          )}

          <p className="text-[11px] text-slate-500 mt-2.5 flex items-center justify-center gap-1">
            {isTripActive ? (
              <span className="text-emerald-600 font-medium">Broadcasting live coordinates to Eluru Bus Supervisor map</span>
            ) : (
              <span>Tap START before departing from Eluru Railway Station</span>
            )}
          </p>
        </div>

        {/* Grid Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/driver/map')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-left hover:border-blue-300 transition group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <MapPin size={22} />
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600 transition" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">Eluru Live Map</div>
              <div className="text-[11px] text-slate-500">Route & Waypoints</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/driver/attendance')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-left hover:border-indigo-300 transition group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                <ClipboardList size={22} />
              </div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {boardedCount}/{students.length}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">Student Attendance</div>
              <div className="text-[11px] text-slate-500">Check In / Boarding</div>
            </div>
          </button>
        </div>

        {/* Live Trip Telemetry Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800 flex justify-between items-center border-b border-slate-100 pb-2">
            <span>Trip Telemetry & Telematics</span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              GPS Normal
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Gauge size={18} className="text-blue-600 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-medium">Speed</div>
              <div className="text-sm font-extrabold text-slate-800">
                {isTripActive ? `${currentDriver.speed} km/h` : '0 km/h'}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <MapPin size={18} className="text-amber-500 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-medium">Next Stop</div>
              <div className="text-[11px] font-bold text-slate-800 truncate">
                {currentDriver.currentStop}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Clock size={18} className="text-emerald-500 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-medium">ETA Campus</div>
              <div className="text-sm font-extrabold text-slate-800">
                {isTripActive ? currentDriver.eta : '--'}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Assistance Button */}
        <button
          onClick={handleEmergency}
          className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <ShieldAlert size={18} className="text-rose-600" />
          <span>EMERGENCY SOS ALERT TO SUPERVISOR</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-slate-200 px-6 py-2 flex justify-around items-center shrink-0">
        <button className="flex flex-col items-center text-blue-600 font-bold">
          <Home size={20} />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>
        <button onClick={() => navigate('/driver/map')} className="flex flex-col items-center text-slate-400 hover:text-slate-600">
          <MapIcon size={20} />
          <span className="text-[10px] mt-0.5">Eluru Map</span>
        </button>
        <button onClick={() => navigate('/driver/attendance')} className="flex flex-col items-center text-slate-400 hover:text-slate-600">
          <ClipboardList size={20} />
          <span className="text-[10px] mt-0.5">Attendance</span>
        </button>
      </div>
    </div>
  );
}
