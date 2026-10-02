import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RotateCcw, Bus, Clock, MapPin, Gauge, Radio, Play, Square, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useBus } from '../context/BusContext';

// Custom Leaflet Bus Marker Icon with pulse ring
const createCustomBusIcon = (isMoving) => new L.DivIcon({
  html: `
    <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
      ${isMoving ? '<div style="position: absolute; width: 100%; height: 100%; background-color: rgba(37, 99, 235, 0.4); border-radius: 50%; animation: ping 1.5s infinite;"></div>' : ''}
      <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 10;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
      </div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  className: 'custom-leaflet-bus'
});

const createStopIcon = (stopName) => new L.DivIcon({
  html: `
    <div style="background-color: #0f172a; color: white; padding: 2px 6px; border-radius: 6px; font-size: 10px; font-weight: bold; border: 1px solid #38bdf8; box-shadow: 0 2px 6px rgba(0,0,0,0.2); white-space: nowrap;">
      📍 ${stopName}
    </div>
  `,
  iconSize: [80, 20],
  iconAnchor: [40, 10],
  className: 'custom-leaflet-stop'
});

export default function DriverMap() {
  const navigate = useNavigate();
  const { drivers, isTripActive, toggleTrip, eluruRoute, eluruCenter, showToast } = useBus();
  
  const currentDriver = drivers[0]; // Bus 1 Ramesh Kumar
  const routePolyline = eluruRoute.map(r => [r.lat, r.lng]);

  return (
    <div className="flex flex-col relative h-full bg-slate-900 overflow-hidden">
      {/* Map Header Overlay */}
      <div className="bg-slate-900/90 backdrop-blur-md text-white p-3.5 flex items-center justify-between z-20 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Eluru Live GPS Map</h2>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {isTripActive ? 'Live GPS Active • Sir C.R. Reddy Route' : 'GPS Standby'}
            </p>
          </div>
        </div>

        <button 
          onClick={() => showToast('Map centered to Bus 1 location')} 
          className="p-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition"
        >
          <Navigation size={18} />
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={[currentDriver.lat, currentDriver.lng]} 
          zoom={14} 
          style={{ height: '100%', width: '100%' }} 
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Route Line */}
          <Polyline positions={routePolyline} color="#2563eb" weight={5} opacity={0.8} dashArray="8, 8" />

          {/* Bus Stop Markers */}
          {eluruRoute.map((stop, idx) => (
            <Marker key={idx} position={[stop.lat, stop.lng]} icon={createStopIcon(stop.name)}>
              <Popup>
                <div className="text-xs">
                  <strong>{stop.name}</strong>
                  <br />Eluru Bus Stop #{idx + 1}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Active Bus Marker */}
          <Marker 
            position={[currentDriver.lat, currentDriver.lng]} 
            icon={createCustomBusIcon(isTripActive)}
          >
            <Popup font-sans>
              <div className="p-1">
                <div className="font-bold text-blue-700 text-sm">Bus 1 (AP 37 Z 1234)</div>
                <div className="text-xs text-slate-600">Driver: Ramesh Kumar</div>
                <div className="text-xs font-semibold text-emerald-600 mt-1">
                  Speed: {currentDriver.speed} km/h
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Floating Bottom Trip Card */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md rounded-t-3xl border-t border-slate-200 shadow-2xl z-20 p-4 space-y-3">
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md">
              <Bus size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">{currentDriver.busNo}</h3>
              <p className="text-[11px] text-slate-500 font-medium">{currentDriver.route}</p>
            </div>
          </div>
          
          <button
            onClick={toggleTrip}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition ${
              isTripActive 
                ? 'bg-rose-600 hover:bg-rose-700' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isTripActive ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            <span>{isTripActive ? 'End Trip' : 'Start Trip'}</span>
          </button>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-2.5 rounded-xl text-slate-800 text-center">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block">CURRENT STOP</span>
            <span className="text-xs font-extrabold text-blue-700 truncate block">
              {currentDriver.currentStop}
            </span>
          </div>

          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold block">SPEED</span>
            <span className="text-xs font-extrabold text-slate-800 block">
              {isTripActive ? `${currentDriver.speed} km/h` : '0 km/h'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 font-semibold block">ETA CAMPUS</span>
            <span className="text-xs font-extrabold text-emerald-600 block">
              {isTripActive ? currentDriver.eta : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
