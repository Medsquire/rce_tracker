import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BusProvider } from './context/BusContext';
import MobileFrame from './components/MobileFrame';

import Splash from './pages/Splash';
import DriverLogin from './pages/DriverLogin';
import DriverDashboard from './pages/DriverDashboard';
import DriverMap from './pages/DriverMap';
import DriverAttendance from './pages/DriverAttendance';
import SupervisorLogin from './pages/SupervisorLogin';
import SupervisorDashboard from './pages/SupervisorDashboard';
import SupervisorMap from './pages/SupervisorMap';
import ManageDriver from './pages/ManageDriver';

function App() {
  return (
    <BusProvider>
      <Router>
        <MobileFrame>
          <Routes>
            <Route path="/" element={<Splash />} />
            
            {/* Driver Routes */}
            <Route path="/driver/login" element={<DriverLogin />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/map" element={<DriverMap />} />
            <Route path="/driver/attendance" element={<DriverAttendance />} />
            
            {/* Supervisor Routes */}
            <Route path="/supervisor/login" element={<SupervisorLogin />} />
            <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
            <Route path="/supervisor/map" element={<SupervisorMap />} />
            <Route path="/supervisor/manage-driver" element={<ManageDriver />} />
          </Routes>
        </MobileFrame>
      </Router>
    </BusProvider>
  );
}

export default App;
