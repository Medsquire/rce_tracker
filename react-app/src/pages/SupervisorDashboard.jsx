import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Bell, Bus, Route, AlertTriangle, CheckCircle, Plus, PieChart,
  Settings, PhoneCall, Edit3, Trash2, MapPin, Search, ChevronRight, UserPlus
} from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const { drivers, deleteDriver, showToast } = useBus();

  const [searchQuery, setSearchQuery] = useState('');

  const totalBuses = drivers.length;
  const onRouteCount = drivers.filter(d => d.status === 'On Route').length;
  const delayedCount = drivers.filter(d => d.status === 'Delayed').length;
  const completedCount = drivers.filter(d => d.status === 'Completed' || d.status === 'Idle').length;

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.busNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (driver) => {
    navigate('/supervisor/manage-driver', { state: driver });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this driver from the fleet?')) {
      deleteDriver(id);
    }
  };

  return (
    <div className="bg-slate-100 h-full flex flex-col justify-between overflow-y-auto">
      {/* Top Supervisor Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-5 rounded-b-3xl shadow-lg shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/30 border border-indigo-400/40 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Admin Supervisor 👋</h2>
              <p className="text-[10px] text-indigo-200 font-medium">Eluru Bus Fleet Control Center</p>
            </div>
          </div>
          <button 
            onClick={() => showToast('Fleet Status: All 4 Eluru Bus Routes Nominal')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <Bell size={18} />
          </button>
        </div>

        {/* Fleet KPI Grid */}
        <div className="grid grid-cols-4 gap-2 text-center text-white">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-2 rounded-xl">
            <span className="text-[10px] text-indigo-200 block">Total</span>
            <span className="text-base font-extrabold block">{totalBuses}</span>
          </div>

          <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 p-2 rounded-xl">
            <span className="text-[10px] text-emerald-300 block">On Route</span>
            <span className="text-base font-extrabold text-emerald-300 block">{onRouteCount}</span>
          </div>

          <div className="bg-rose-500/20 backdrop-blur-md border border-rose-400/30 p-2 rounded-xl">
            <span className="text-[10px] text-rose-300 block">Delayed</span>
            <span className="text-base font-extrabold text-rose-300 block">{delayedCount}</span>
          </div>

          <div className="bg-blue-500/20 backdrop-blur-md border border-blue-400/30 p-2 rounded-xl">
            <span className="text-[10px] text-blue-300 block">Arrived</span>
            <span className="text-base font-extrabold text-blue-300 block">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 flex-1">
        {/* Banner to Open Eluru Fleet Map */}
        <div 
          onClick={() => navigate('/supervisor/map')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <div className="text-sm font-bold">Eluru Master Live Fleet Map</div>
              <div className="text-[11px] text-blue-100 font-medium">Track all 4 drivers real-time GPS on map</div>
            </div>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
        </div>

        {/* Driver Fleet Management Header & Search */}
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-800 tracking-wide">ELURU DRIVERS & FLEET LIST</h3>
          <button
            onClick={() => navigate('/supervisor/manage-driver')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1 transition active:scale-95"
          >
            <UserPlus size={14} />
            <span>Add Driver</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search driver name, bus no, route..."
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium text-slate-800"
          />
        </div>

        {/* Driver Cards List */}
        <div className="space-y-3">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => handleEdit(driver)}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm hover:border-indigo-300 transition cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-extrabold text-sm">
                    <Bus size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
                      <span>{driver.busNo}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({driver.id})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">Driver: {driver.name}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  driver.status === 'On Route'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : driver.status === 'Delayed'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {driver.status}
                </span>
              </div>

              <div className="bg-slate-50 p-2 rounded-xl text-[11px] text-slate-600 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-700 block">📍 Route:</span>
                  <span className="text-[10px]">{driver.route}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-700 block">Current Location:</span>
                  <span className="text-[10px] font-medium text-indigo-600">{driver.currentStop}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-xs">
                <a
                  href={`tel:${driver.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-emerald-600 font-bold flex items-center gap-1 hover:underline text-[11px]"
                >
                  <PhoneCall size={14} /> Call Driver
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(driver); }}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                    title="Edit Driver"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(driver.id, e)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Driver"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-slate-200 px-6 py-2 flex justify-around items-center shrink-0">
        <button className="flex flex-col items-center text-indigo-600 font-bold">
          <PieChart size={20} />
          <span className="text-[10px] mt-0.5">Overview</span>
        </button>
        <button onClick={() => navigate('/supervisor/map')} className="flex flex-col items-center text-slate-400 hover:text-slate-600">
          <MapPin size={20} />
          <span className="text-[10px] mt-0.5">Eluru Map</span>
        </button>
        <button onClick={() => navigate('/supervisor/manage-driver')} className="flex flex-col items-center text-slate-400 hover:text-slate-600">
          <UserPlus size={20} />
          <span className="text-[10px] mt-0.5">Add Driver</span>
        </button>
      </div>
    </div>
  );
}
