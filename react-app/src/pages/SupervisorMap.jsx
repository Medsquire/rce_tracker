import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bus, MapPin, PhoneCall, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useBus } from '../context/BusContext';

// Helper for multi-color bus markers
const createFleetBusIcon = (colorHex, busNum) => new L.DivIcon({
  html: `
    <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
      <div style="width: 34px; height: 34px; background-color: ${colorHex}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); font-weight: bold; font-size: 11px;">
        ${busNum}
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  className: 'custom-fleet-bus'
});

export default function SupervisorMap() {
  const navigate = useNavigate();
  const { drivers, eluruCenter, eluruRoute, showToast } = useBus();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const routePolyline = eluruRoute.map(r => [r.lat, r.lng]);

  const filteredDrivers = drivers.filter(d => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'On Route') return d.status === 'On Route';
    if (activeFilter === 'Delayed') return d.status === 'Delayed';
    return true;
  });

  const getMarkerColor = (status, id) => {
    if (status === 'Delayed') return '#ef4444'; // Red
    if (status === 'Completed') return '#a855f7'; // Purple
    if (id === 'DRV001') return '#2563eb'; // Blue
    return '#10b981'; // Emerald
  };

  return (
    <div className="flex flex-col relative h-full bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-950 text-white p-3.5 flex items-center justify-between z-20 border-b border-indigo-900 shrink-0 shadow-md">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-indigo-900 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Eluru Master Fleet Tracker</h2>
            <p className="text-[10px] text-indigo-300 font-medium">Monitoring {drivers.length} College Buses</p>
          </div>
        </div>

        <button 
          onClick={() => showToast('Refreshed GPS locations from Eluru satellites')} 
          className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 transition"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Map View */}
      <div className="flex-1 w-full relative z-0">
        <MapContainer
          center={[eluruCenter.lat, eluruCenter.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <Polyline positions={routePolyline} color="#6366f1" weight={4} opacity={0.6} dashArray="6, 6" />

          {/* Render markers for all drivers */}
          {filteredDrivers.map((d) => {
            const busNum = d.busNo.split(' ')[1] || 'B';
            const markerColor = getMarkerColor(d.status, d.id);
            return (
              <Marker
                key={d.id}
                position={[d.lat, d.lng]}
                icon={createFleetBusIcon(markerColor, `B${busNum}`)}
              >
                <Popup font-sans>
                  <div className="p-1">
                    <div className="font-extrabold text-indigo-900 text-sm">{d.busNo}</div>
                    <div className="text-xs text-slate-600 font-medium">Driver: {d.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Route: {d.route}</div>
                    <div className="text-xs font-bold text-emerald-600 mt-1">
                      Status: {d.status} ({d.speed} km/h)
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Drawer Overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md rounded-t-3xl border-t border-slate-200 shadow-2xl z-20 p-4 max-h-[42%] flex flex-col">
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 shrink-0"></div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 pb-2 mb-3 overflow-x-auto shrink-0 text-xs font-bold">
          {['All', 'On Route', 'Delayed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-full transition ${
                activeFilter === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Fleet Drivers Scrollable List */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {filteredDrivers.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                setSelectedDriverId(d.id);
                showToast(`Focused on ${d.name} (${d.busNo})`);
              }}
              className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                selectedDriverId === d.id
                  ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-xs">
                  <Bus size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{d.busNo}</div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {d.name} • {d.currentStop}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full block border ${
                  d.status === 'On Route' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : d.status === 'Delayed'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {d.status}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{d.speed} km/h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
