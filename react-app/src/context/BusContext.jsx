import React, { createContext, useContext, useState, useEffect } from 'react';

const BusContext = createContext();

// Real Eluru, Andhra Pradesh landmark coordinates
const ELURU_CENTER = { lat: 16.7107, lng: 81.1031 };

// Eluru Route 1 Waypoints (Eluru Railway Station -> Fire Station -> CRR College)
const ELURU_ROUTE_1 = [
  { lat: 16.7050, lng: 81.1000, name: 'Eluru Railway Station' },
  { lat: 16.7085, lng: 81.1025, name: 'Old Bus Stand' },
  { lat: 16.7120, lng: 81.1050, name: 'Fire Station Center' },
  { lat: 16.7180, lng: 81.1100, name: 'Ashram Hospital Junction' },
  { lat: 16.7250, lng: 81.1150, name: 'Sir C.R. Reddy College Campus' }
];

const INITIAL_DRIVERS = [
  {
    id: 'DRV001',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    busNo: 'Bus 1 (AP 37 Z 1234)',
    route: 'Eluru Rly Station → CRR College',
    currentStop: 'Fire Station Center',
    status: 'On Route',
    speed: 38,
    lat: 16.7120,
    lng: 81.1050,
    eta: '10 min',
    totalStudents: 45,
    boarded: 38,
    licenseNo: 'DL-3720190012',
    experience: '8 Years'
  },
  {
    id: 'DRV002',
    name: 'Suresh Babu',
    phone: '+91 94401 88234',
    busNo: 'Bus 2 (AP 37 Z 5678)',
    route: 'Ashram Medical → CRR College',
    currentStop: 'Ashram Junction',
    status: 'On Route',
    speed: 42,
    lat: 16.7180,
    lng: 81.1100,
    eta: '14 min',
    totalStudents: 50,
    boarded: 42,
    licenseNo: 'DL-3720184491',
    experience: '12 Years'
  },
  {
    id: 'DRV003',
    name: 'Kiran Das',
    phone: '+91 98480 11223',
    busNo: 'Bus 3 (AP 37 Z 9012)',
    route: 'Tangellamudi → CRR College',
    currentStop: 'Powerpet Center',
    status: 'Delayed',
    speed: 14,
    lat: 16.7010,
    lng: 81.0920,
    eta: '22 min',
    totalStudents: 40,
    boarded: 32,
    licenseNo: 'DL-3720210088',
    experience: '5 Years'
  },
  {
    id: 'DRV004',
    name: 'Venkat Rao',
    phone: '+91 91771 22334',
    busNo: 'Bus 4 (AP 37 Z 3456)',
    route: 'Santhi Nagar → CRR College',
    currentStop: 'Campus Gate',
    status: 'Completed',
    speed: 0,
    lat: 16.7250,
    lng: 81.1150,
    eta: 'Arrived',
    totalStudents: 48,
    boarded: 48,
    licenseNo: 'DL-3720159932',
    experience: '15 Years'
  }
];

const INITIAL_STUDENTS = [
  { id: 'STU101', rollNo: '21A91A0501', name: 'Arjun Reddy', stop: 'Eluru Rly Station', status: 'Boarded', time: '07:45 AM', phone: '+91 98123 45678' },
  { id: 'STU102', rollNo: '21A91A0502', name: 'Sneha Patil', stop: 'Old Bus Stand', status: 'Boarded', time: '07:52 AM', phone: '+91 98234 56789' },
  { id: 'STU103', rollNo: '21A91A0503', name: 'Vikram Kumar', stop: 'Fire Station Center', status: 'Absent', time: '--', phone: '+91 98345 67890' },
  { id: 'STU104', rollNo: '21A91A0504', name: 'Priya Sharma', stop: 'Old Bus Stand', status: 'Boarded', time: '07:53 AM', phone: '+91 98456 78901' },
  { id: 'STU105', rollNo: '21A91A0505', name: 'Rahul Verma', stop: 'Ashram Junction', status: 'Pending', time: '--', phone: '+91 98567 89012' },
  { id: 'STU106', rollNo: '21A91A0506', name: 'Bhavana Sri', stop: 'Fire Station Center', status: 'Boarded', time: '08:02 AM', phone: '+91 98678 90123' },
  { id: 'STU107', rollNo: '21A91A0507', name: 'Charan Teja', stop: 'Eluru Rly Station', status: 'Boarded', time: '07:46 AM', phone: '+91 98789 01234' },
  { id: 'STU108', rollNo: '21A91A0508', name: 'Divya Vani', stop: 'Ashram Junction', status: 'Pending', time: '--', phone: '+91 98890 12345' },
];

export function BusProvider({ children }) {
  const [userRole, setUserRole] = useState(null); // 'driver' | 'supervisor'
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [isTripActive, setIsTripActive] = useState(false);
  const [routeIndex, setRouteIndex] = useState(2);
  const [currentSpeed, setCurrentSpeed] = useState(38);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Live Location Simulation along Eluru Route 1 when trip is active
  useEffect(() => {
    let timer;
    if (isTripActive) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);

        // Move bus along waypoints smoothly
        setRouteIndex((prevIdx) => {
          const nextIdx = (prevIdx + 1) % ELURU_ROUTE_1.length;
          const target = ELURU_ROUTE_1[nextIdx];
          
          setDrivers((prevDrivers) =>
            prevDrivers.map((d) =>
              d.id === 'DRV001'
                ? {
                    ...d,
                    lat: target.lat,
                    lng: target.lng,
                    currentStop: target.name,
                    speed: Math.floor(Math.random() * 15) + 30,
                    status: 'On Route'
                  }
                : d
            )
          );
          return nextIdx;
        });
      }, 4000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isTripActive]);

  const toggleTrip = () => {
    const newState = !isTripActive;
    setIsTripActive(newState);
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === 'DRV001'
          ? {
              ...d,
              status: newState ? 'On Route' : 'Idle',
              speed: newState ? 35 : 0
            }
          : d
      )
    );
    showToast(newState ? '🚀 Live GPS Trip Started! Sharing location...' : '🛑 Trip Ended Successfully.');
  };

  const toggleStudentStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          let nextStatus = 'Boarded';
          if (s.status === 'Boarded') nextStatus = 'Absent';
          else if (s.status === 'Absent') nextStatus = 'Pending';
          else nextStatus = 'Boarded';

          const time = nextStatus === 'Boarded' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
          return { ...s, status: nextStatus, time };
        }
        return s;
      })
    );
  };

  const addDriver = (driverData) => {
    const newId = `DRV00${drivers.length + 1}`;
    const newDriver = {
      id: newId,
      name: driverData.name || 'New Driver',
      phone: driverData.phone || '+91 90000 00000',
      busNo: driverData.busNo || `Bus ${drivers.length + 1}`,
      route: driverData.route || 'Eluru Town → CRR College',
      currentStop: 'Depot',
      status: 'On Route',
      speed: 0,
      lat: ELURU_CENTER.lat + (Math.random() - 0.5) * 0.02,
      lng: ELURU_CENTER.lng + (Math.random() - 0.5) * 0.02,
      eta: '15 min',
      totalStudents: 40,
      boarded: 0,
      licenseNo: driverData.licenseNo || 'DL-3720240000',
      experience: driverData.experience || '3 Years'
    };
    setDrivers([...drivers, newDriver]);
    showToast(`Driver ${newDriver.name} added successfully!`);
  };

  const updateDriver = (updatedData) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === updatedData.id ? { ...d, ...updatedData } : d))
    );
    showToast(`Driver ${updatedData.name} updated!`);
  };

  const deleteDriver = (id) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    showToast('Driver removed from fleet.');
  };

  const addStudent = (studentData) => {
    const newStudent = {
      id: `STU${Date.now()}`,
      rollNo: studentData.rollNo || `21A91A${Math.floor(1000 + Math.random() * 9000)}`,
      name: studentData.name,
      stop: studentData.stop || 'Fire Station Center',
      status: 'Boarded',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phone: studentData.phone || '+91 99999 99999'
    };
    setStudents([newStudent, ...students]);
    showToast(`Student ${newStudent.name} registered and marked Boarded!`);
  };

  return (
    <BusContext.Provider
      value={{
        userRole,
        setUserRole,
        drivers,
        students,
        isTripActive,
        toggleTrip,
        elapsedSeconds,
        toggleStudentStatus,
        addDriver,
        updateDriver,
        deleteDriver,
        addStudent,
        eluruRoute: ELURU_ROUTE_1,
        eluruCenter: ELURU_CENTER,
        toastMessage,
        showToast
      }}
    >
      {children}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-medium shadow-2xl z-50 animate-bounce flex items-center gap-2 border border-gray-700">
          <span>{toastMessage}</span>
        </div>
      )}
    </BusContext.Provider>
  );
}

export function useBus() {
  const context = useContext(BusContext);
  if (!context) throw new Error('useBus must be used within BusProvider');
  return context;
}
