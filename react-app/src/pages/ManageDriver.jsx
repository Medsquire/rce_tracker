import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, User, Camera, Save, Bus, Phone, ShieldCheck, MapPin, Award } from 'lucide-react';
import { useBus } from '../context/BusContext';

export default function ManageDriver() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addDriver, updateDriver, showToast } = useBus();

  const driverData = location.state || null;
  const isEditing = Boolean(driverData && driverData.id);

  const [name, setName] = useState(driverData ? driverData.name : '');
  const [driverId, setDriverId] = useState(driverData ? driverData.id : `DRV00${Math.floor(Math.random() * 90) + 10}`);
  const [busNo, setBusNo] = useState(driverData ? driverData.busNo : 'Bus 5 (AP 37 Z 7788)');
  const [route, setRoute] = useState(driverData ? driverData.route : 'Old Bus Stand → CRR College');
  const [phone, setPhone] = useState(driverData ? driverData.phone : '+91 98765 43210');
  const [licenseNo, setLicenseNo] = useState(driverData ? driverData.licenseNo || 'DL-3720241092' : 'DL-3720241092');
  const [experience, setExperience] = useState(driverData ? driverData.experience || '6 Years' : '6 Years');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter driver name');
      return;
    }

    const payload = {
      id: driverId,
      name,
      busNo,
      route,
      phone,
      licenseNo,
      experience,
      status: driverData ? driverData.status : 'On Route',
      speed: driverData ? driverData.speed : 0,
      lat: driverData ? driverData.lat : 16.7107,
      lng: driverData ? driverData.lng : 81.1031,
      currentStop: driverData ? driverData.currentStop : 'Depot Junction',
      eta: driverData ? driverData.eta : '15 min'
    };

    if (isEditing) {
      updateDriver(payload);
    } else {
      addDriver(payload);
    }

    navigate('/supervisor/dashboard');
  };

  return (
    <div className="bg-slate-50 h-full flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="bg-indigo-900 text-white p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 text-indigo-200 hover:text-white rounded-xl hover:bg-indigo-800 transition">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-base font-bold tracking-tight">{isEditing ? 'Edit Driver Details' : 'Add New Fleet Driver'}</h2>
            <p className="text-[10px] text-indigo-200 font-medium">Eluru College Transport Fleet</p>
          </div>
        </div>
        <div className="w-6"></div>
      </div>

      <div className="p-5 flex-1 max-w-sm mx-auto w-full space-y-4">
        {/* Photo Avatar Preview */}
        <div className="flex justify-center my-2">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-full flex items-center justify-center text-white relative shadow-lg border-4 border-white">
            <User size={48} />
            <button 
              type="button" 
              onClick={() => showToast('Driver photo upload modal ready')}
              className="absolute bottom-0 right-0 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-slate-800 transition"
            >
              <Camera size={14} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Driver ID</label>
              <input
                type="text"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-300 bg-slate-100 text-slate-600"
                readOnly={isEditing}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Experience</label>
              <div className="relative">
                <Award className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="8 Years"
                  className="w-full pl-8 pr-2 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Assigned Bus & Plate No.</label>
            <div className="relative">
              <Bus className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                value={busNo}
                onChange={(e) => setBusNo(e.target.value)}
                placeholder="e.g. Bus 1 (AP 37 Z 1234)"
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Eluru Route Description</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="e.g. Eluru Rly Station → CRR College"
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-8 pr-2 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">License No.</label>
              <input
                type="text"
                value={licenseNo}
                onChange={(e) => setLicenseNo(e.target.value)}
                placeholder="DL-3720..."
                className="w-full px-2.5 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-slate-200 text-slate-800 py-3 rounded-xl font-extrabold text-xs hover:bg-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-extrabold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <Save size={16} />
              <span>Save Driver</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
