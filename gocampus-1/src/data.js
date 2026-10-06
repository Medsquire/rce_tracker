/**
 * GO CAMPUS BUS TRACKER DATA
 * Ramachandra College of Engineering (RCEE), Eluru, Andhra Pradesh.
 * All campus buses originate across Eluru and terminate at Ramachandra College of Engineering (Vatluru).
 */

// Universal Destination Campus Coordinates: Ramachandra College of Engineering, Vatluru, Eluru
export const RCEE_CAMPUS = {
  name: 'Ramachandra College of Engineering (RCEE)',
  shortName: 'RCEE Campus',
  lat: 16.6866,
  lng: 81.0253,
  address: 'NH-16 Bypass Road, Vatluru, Eluru, Andhra Pradesh 534007'
};

// Multi-Bus Database for Eluru, Andhra Pradesh -> Ramachandra College of Engineering
export const busesDatabase = {
  'bus-1': {
    id: 'bus-1',
    number: 'Bus 1',
    shift: 'morning',
    status: 'On Route',
    badgeClass: 'badge-on-route',
    route: 'Sanivarapupeta → Ramachandra College of Engineering',
    shortRoute: 'Sanivarapupeta → RCEE College',
    eta: '12 min',
    currentLocation: 'Tangellamudi Bridge / Kothapeta, Eluru',
    totalDistance: '8.5 km',
    totalTime: '26 min',
    color: '#059669', // Emerald
    waypoints: [
      { lat: 16.7320, lng: 81.0740, name: 'Sanivarapupeta Main Road', eta: '26 min' },
      { lat: 16.7240, lng: 81.0850, name: 'North Tammileru Bund Road', eta: '20 min' },
      { lat: 16.7190, lng: 81.0910, name: 'Tangellamudi Bridge Centre', eta: '15 min' },
      { lat: 16.7120, lng: 81.0840, name: 'Powerpet West Canal Road', eta: '10 min' },
      { lat: 16.7010, lng: 81.0640, name: 'Satrampadu West Link', eta: '6 min' },
      { lat: 16.6920, lng: 81.0450, name: 'Vatluru Outer Gate', eta: '3 min' },
      { lat: 16.6866, lng: 81.0253, name: 'Ramachandra College of Engineering (RCEE)', eta: 'Arrived' }
    ],
    stops: [
      { index: 1, name: 'Sanivarapupeta Terminal', time: '8:15 AM', distance: '0.0 km', status: 'Passed' },
      { index: 2, name: 'North Tammileru Bund Road', time: '8:21 AM', distance: '1.8 km', status: 'Passed' },
      { index: 3, name: 'Tangellamudi Bridge Centre', time: '8:28 AM', distance: '3.2 km', status: 'Next Stop' },
      { index: 4, name: 'Powerpet West Canal Road', time: '8:36 AM', distance: '5.0 km', status: 'Upcoming' },
      { index: 5, name: 'Vatluru Outer Gate', time: '8:43 AM', distance: '6.9 km', status: 'Upcoming' },
      { index: 6, name: 'Ramachandra College of Engineering (RCEE)', time: '8:50 AM', distance: '8.5 km', status: 'Final Destination' }
    ]
  },
  'bus-2': {
    id: 'bus-2',
    number: 'Bus 2',
    shift: 'morning',
    status: 'Arriving Soon',
    badgeClass: 'badge-arriving-soon',
    route: 'Sir C.R. Reddy College → Ramachandra College of Engineering',
    shortRoute: 'C.R. Reddy → RCEE College',
    eta: '5 min',
    currentLocation: 'Powerpet Overbridge / R.R. Peta, Eluru',
    totalDistance: '7.8 km',
    totalTime: '24 min',
    color: '#2563EB', // Royal Blue
    waypoints: [
      { lat: 16.7058, lng: 81.0991, name: 'Sir C.R. Reddy College', eta: '24 min' },
      { lat: 16.7045, lng: 81.0915, name: 'Powerpet Railway Overbridge', eta: '18 min' },
      { lat: 16.7080, lng: 81.0830, name: 'R.R. Peta Commercial Hub', eta: '13 min' },
      { lat: 16.7020, lng: 81.0680, name: 'Satrampadu Flyover', eta: '8 min' },
      { lat: 16.6925, lng: 81.0460, name: 'Vatluru NH-16 Junction', eta: '4 min' },
      { lat: 16.6866, lng: 81.0253, name: 'Ramachandra College of Engineering (RCEE)', eta: 'Arrived' }
    ],
    stops: [
      { index: 1, name: 'Sir C.R. Reddy College (Autonomous)', time: '8:25 AM', distance: '0.0 km', status: 'Passed' },
      { index: 2, name: 'Powerpet Railway Overbridge', time: '8:32 AM', distance: '1.5 km', status: 'Passed' },
      { index: 3, name: 'R.R. Peta Commercial Hub', time: '8:38 AM', distance: '3.0 km', status: 'Next Stop' },
      { index: 4, name: 'Satrampadu Flyover', time: '8:45 AM', distance: '5.1 km', status: 'Upcoming' },
      { index: 5, name: 'Vatluru NH-16 Junction', time: '8:51 AM', distance: '6.6 km', status: 'Upcoming' },
      { index: 6, name: 'Ramachandra College of Engineering (RCEE)', time: '8:56 AM', distance: '7.8 km', status: 'Final Destination' }
    ]
  },
  'bus-3': {
    id: 'bus-3',
    number: 'Bus 3',
    shift: 'morning',
    status: 'Delayed',
    badgeClass: 'badge-delayed',
    route: 'District Collectorate → Ramachandra College of Engineering',
    shortRoute: 'Collectorate → RCEE College',
    eta: '15 min',
    currentLocation: 'Main Bazaar / Agraharam, Eluru',
    totalDistance: '9.4 km',
    totalTime: '28 min',
    color: '#D97706', // Amber
    waypoints: [
      { lat: 16.7125, lng: 81.1150, name: 'District Collectorate Office', eta: '28 min' },
      { lat: 16.7135, lng: 81.1060, name: 'One Town Police Station / Bazaar', eta: '22 min' },
      { lat: 16.7090, lng: 81.0980, name: 'Ashok Nagar Circle', eta: '16 min' },
      { lat: 16.7010, lng: 81.0770, name: 'Old Town Gate', eta: '11 min' },
      { lat: 16.6910, lng: 81.0500, name: 'Vatluru Industrial Approach', eta: '6 min' },
      { lat: 16.6866, lng: 81.0253, name: 'Ramachandra College of Engineering (RCEE)', eta: 'Arrived' }
    ],
    stops: [
      { index: 1, name: 'District Collectorate Compound', time: '8:20 AM', distance: '0.0 km', status: 'Passed' },
      { index: 2, name: 'One Town Bazaar & Police Station', time: '8:28 AM', distance: '2.2 km', status: 'Passed' },
      { index: 3, name: 'Ashok Nagar Circle', time: '8:36 AM', distance: '4.1 km', status: 'Next Stop' },
      { index: 4, name: 'Old Town Gate / South Road', time: '8:44 AM', distance: '6.0 km', status: 'Upcoming' },
      { index: 5, name: 'Vatluru Industrial Approach', time: '8:51 AM', distance: '7.9 km', status: 'Upcoming' },
      { index: 6, name: 'Ramachandra College of Engineering (RCEE)', time: '8:58 AM', distance: '9.4 km', status: 'Final Destination' }
    ]
  },
  'bus-4': {
    id: 'bus-4',
    number: 'Bus 4',
    shift: 'afternoon',
    status: 'On Route',
    badgeClass: 'badge-on-route',
    route: 'ASRAM Medical Campus → Ramachandra College of Engineering',
    shortRoute: 'ASRAM / NH-16 → RCEE College',
    eta: '8 min',
    currentLocation: 'NH-16 Highway, Satrampadu, Eluru',
    totalDistance: '12.6 km',
    totalTime: '30 min',
    color: '#7C3AED', // Purple
    waypoints: [
      { lat: 16.7320, lng: 81.1350, name: 'ASRAM Medical Campus (NH-16)', eta: '30 min' },
      { lat: 16.7250, lng: 81.1240, name: 'Fire Station Circle & NH-16', eta: '23 min' },
      { lat: 16.7150, lng: 81.1080, name: 'Eluru Central Bypass Junction', eta: '17 min' },
      { lat: 16.7020, lng: 81.0780, name: 'Satrampadu NH-16 Flyover', eta: '11 min' },
      { lat: 16.6900, lng: 81.0480, name: 'Vatluru Toll Approach Road', eta: '5 min' },
      { lat: 16.6866, lng: 81.0253, name: 'Ramachandra College of Engineering (RCEE)', eta: 'Arrived' }
    ],
    stops: [
      { index: 1, name: 'ASRAM Campus Main Gate', time: '1:10 PM', distance: '0.0 km', status: 'Passed' },
      { index: 2, name: 'Fire Station Circle & NH-16', time: '1:18 PM', distance: '3.1 km', status: 'Passed' },
      { index: 3, name: 'Eluru Central Bypass Junction', time: '1:26 PM', distance: '6.4 km', status: 'Next Stop' },
      { index: 4, name: 'Satrampadu Flyover', time: '1:34 PM', distance: '9.2 km', status: 'Upcoming' },
      { index: 5, name: 'Vatluru Toll Approach Road', time: '1:41 PM', distance: '11.1 km', status: 'Upcoming' },
      { index: 6, name: 'Ramachandra College of Engineering (RCEE)', time: '1:48 PM', distance: '12.6 km', status: 'Final Destination' }
    ]
  },
  'bus-5': {
    id: 'bus-5',
    number: 'Bus 5',
    shift: 'afternoon',
    status: 'On Route',
    badgeClass: 'badge-on-route',
    route: 'Eluru Railway Station & RTC → Ramachandra College of Engineering',
    shortRoute: 'Station / RTC → RCEE College',
    eta: '10 min',
    currentLocation: 'GNT Road / Ashok Nagar, Eluru',
    totalDistance: '7.2 km',
    totalTime: '22 min',
    color: '#EA580C', // Orange-Red
    waypoints: [
      { lat: 16.7142, lng: 81.1018, name: 'Eluru Railway Station (EE)', eta: '22 min' },
      { lat: 16.7155, lng: 81.1070, name: 'New APSRTC Bus Complex', eta: '18 min' },
      { lat: 16.7080, lng: 81.0950, name: 'GNT Road Commercial Hub', eta: '13 min' },
      { lat: 16.7010, lng: 81.0750, name: 'Satrampadu South Junction', eta: '8 min' },
      { lat: 16.6915, lng: 81.0420, name: 'Vatluru Bypass Cross', eta: '4 min' },
      { lat: 16.6866, lng: 81.0253, name: 'Ramachandra College of Engineering (RCEE)', eta: 'Arrived' }
    ],
    stops: [
      { index: 1, name: 'Eluru Railway Station (EE)', time: '2:15 PM', distance: '0.0 km', status: 'Passed' },
      { index: 2, name: 'New APSRTC Bus Complex', time: '2:21 PM', distance: '1.4 km', status: 'Passed' },
      { index: 3, name: 'GNT Road Commercial Hub', time: '2:28 PM', distance: '2.8 km', status: 'Next Stop' },
      { index: 4, name: 'Satrampadu South Junction', time: '2:35 PM', distance: '4.9 km', status: 'Upcoming' },
      { index: 5, name: 'Vatluru Bypass Cross', time: '2:41 PM', distance: '6.3 km', status: 'Upcoming' },
      { index: 6, name: 'Ramachandra College of Engineering (RCEE)', time: '2:47 PM', distance: '7.2 km', status: 'Final Destination' }
    ]
  }
};

// Trips database for Student Journey History (Ramachandra College of Engineering)
export const tripsData = {
  today: [
    { number: 'Bus 2', route: 'Sir C.R. Reddy → Ramachandra College of Engg', time: '8:10 AM', status: 'Completed', badgeClass: 'badge-completed' },
    { number: 'Bus 4', route: 'Ramachandra College of Engg → Eluru City', time: '12:15 PM', status: 'Completed', badgeClass: 'badge-completed' },
    { number: 'Bus 2', route: 'Powerpet → Ramachandra College of Engg', time: '4:05 PM', status: 'Upcoming', badgeClass: 'badge-upcoming' },
    { number: 'Bus 1', route: 'Ramachandra College of Engg → Sanivarapupeta', time: '6:30 PM', status: 'Upcoming', badgeClass: 'badge-upcoming' }
  ],
  week: [
    { number: 'Bus 2', route: 'Sir C.R. Reddy → Ramachandra College of Engg', time: 'Yesterday 8:12 AM', status: 'Completed', badgeClass: 'badge-completed' },
    { number: 'Bus 5', route: 'Ramachandra College of Engg → Railway Station', time: 'Yesterday 4:30 PM', status: 'Completed', badgeClass: 'badge-completed' },
    { number: 'Bus 3', route: 'Collectorate → Ramachandra College of Engg', time: 'Mon 8:05 AM', status: 'Completed', badgeClass: 'badge-completed' },
    { number: 'Bus 1', route: 'Ramachandra College of Engg → Tangellamudi', time: 'Mon 5:00 PM', status: 'Completed', badgeClass: 'badge-completed' }
  ],
  month: [
    { number: 'Bus 2', route: 'Sir C.R. Reddy → Ramachandra College of Engg', time: '24 Trips Logged', status: 'Monthly Pass Active', badgeClass: 'badge-completed' },
    { number: 'Bus 1', route: 'Sanivarapupeta → Ramachandra College of Engg', time: '18 Trips Logged', status: 'Verified', badgeClass: 'badge-completed' }
  ]
};

// Key Landmarks across Eluru for Search & Interactive Markers
export const eluruMapLandmarks = [
  { name: 'Ramachandra College of Engineering (RCEE)', coords: [16.6866, 81.0253], icon: '🎓', role: 'College Campus (Destination)' },
  { name: 'Sir C.R. Reddy College', coords: [16.7058, 81.0991], icon: '🏫', role: 'Starting Terminal • Route 2' },
  { name: 'Powerpet Railway Station', coords: [16.7031, 81.0894], icon: '🚉', role: 'Transit Stop' },
  { name: 'Eluru Railway Station (EE)', coords: [16.7142, 81.1018], icon: '🚆', role: 'Starting Terminal • Route 5' },
  { name: 'APSRTC New Bus Complex', coords: [16.7155, 81.1070], icon: '🚌', role: 'Transit Complex' },
  { name: 'District Collectorate', coords: [16.7125, 81.1150], icon: '🏛', role: 'Starting Terminal • Route 3' },
  { name: 'ASRAM Medical Campus', coords: [16.7320, 81.1350], icon: '🏥', role: 'Starting Terminal • Route 4' },
  { name: 'Sanivarapupeta', coords: [16.7280, 81.0740], icon: '📍', role: 'Starting Terminal • Route 1' },
  { name: 'Tangellamudi Bridge', coords: [16.7190, 81.0910], icon: '📍', role: 'Tammileru Corridor' },
  { name: 'Satrampadu Flyover', coords: [16.7020, 81.0680], icon: '🌉', role: 'NH-16 Junction Stop' },
  { name: 'Vatluru Outer Gate', coords: [16.6920, 81.0450], icon: '🏭', role: 'Campus Approach' }
];
