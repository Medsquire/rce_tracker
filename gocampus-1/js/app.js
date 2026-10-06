/**
 * COLLEGE BUS TRACKER - INTERACTIVE MOBILE APPLICATION
 * Ramachandra College of Engineering (RCEE), Eluru, Andhra Pradesh.
 * All campus buses originate across Eluru and terminate at Ramachandra College of Engineering (Vatluru).
 */

// Universal Destination Campus Coordinates: Ramachandra College of Engineering, Vatluru, Eluru
const RCEE_CAMPUS = {
  name: 'Ramachandra College of Engineering (RCEE)',
  shortName: 'RCEE Campus',
  lat: 16.6866,
  lng: 81.0253,
  address: 'NH-16 Bypass Road, Vatluru, Eluru, Andhra Pradesh 534007'
};

// Multi-Bus Database for Eluru, Andhra Pradesh -> Ramachandra College of Engineering
const busesDatabase = {
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
const tripsData = {
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

// Application State
const appState = {
  currentScreen: 'screen-welcome',
  historyStack: ['screen-welcome'],
  currentViewMode: 'simulator', // 'simulator' | 'gallery' | 'full'
  activeBusId: 'bus-2',
  trackedBusId: 'bus-2',
  user: {
    name: 'Gayatri Rajamahendravarapu',
    role: 'Student • B.Tech',
    rollNo: '21CS101',
    college: 'Ramachandra College of Engineering, Eluru (RCEE)',
    phone: '+91 98765 43210',
    email: 'gayatri@example.com',
    avatar: 'assets/student_avatar.jpg'
  },
  simulation: {
    step: 0,
    intervalId: null
  }
};

// Route Data derived from multi-bus database
const routesData = Object.values(busesDatabase);

// Key Landmarks across Eluru for Search & Interactive Markers
const eluruMapLandmarks = [
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initNavigation();
  initFilters();
  initEluruLiveTrackingMap();
  initModalsAndDrawers();
  initGalleryMode();
  initFormHandlers();

  // Initialize dynamic routes list and initial bus selection
  filterRoutes('all');
  selectBus('bus-2');
});

/* ==========================================================================
   LIVE STATUS BAR CLOCK
   ========================================================================== */
function initLiveClock() {
  const clockEls = document.querySelectorAll('.status-time');
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    hours = hours % 12 || 12;
    clockEls.forEach(el => {
      el.textContent = `${hours}:${minutes}`;
    });
  }
  updateClock();
  setInterval(updateClock, 10000);
}

/* ==========================================================================
   NAVIGATION & SCREEN ROUTER
   ========================================================================== */
function initNavigation() {
  // Navigation elements
  document.querySelectorAll('[data-navigate]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScreen = elem.getAttribute('data-navigate');
      if (targetScreen) {
        navigateTo(targetScreen);
      }
    });
  });

  // Back button elements
  document.querySelectorAll('[data-action="back"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      goBack();
    });
  });

  // Top screen jumper pills
  document.querySelectorAll('.screen-jump-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.getAttribute('data-target-screen');
      if (target) {
        navigateTo(target);
      }
    });
  });
}

function navigateTo(screenId, pushToHistory = true) {
  const currentEl = document.getElementById(appState.currentScreen);
  const targetEl = document.getElementById(screenId);

  if (!targetEl) return;

  if (currentEl) {
    currentEl.classList.remove('active');
  }

  targetEl.classList.add('active');

  if (pushToHistory && appState.currentScreen !== screenId) {
    appState.historyStack.push(screenId);
  }

  appState.currentScreen = screenId;

  // Update Bottom Nav active tab
  updateBottomNav(screenId);

  // Update Top screen jumper pills
  updateJumperPills(screenId);

  // Status bar styling
  updateStatusBarTheme(screenId);

  // Scroll to top of newly opened screen
  targetEl.scrollTop = 0;

  // If navigating to Live Tracking, trigger Leaflet redraw for proper container dimensioning
  if (screenId === 'screen-tracking' && window.liveEluruMap) {
    setTimeout(() => {
      window.liveEluruMap.invalidateSize();
    }, 200);
  }
}

function goBack() {
  if (appState.historyStack.length > 1) {
    appState.historyStack.pop();
    const previous = appState.historyStack[appState.historyStack.length - 1];
    navigateTo(previous, false);
  } else {
    navigateTo('screen-home', false);
  }
}

function updateBottomNav(screenId) {
  const tabs = document.querySelectorAll('.nav-tab-item');
  tabs.forEach(tab => tab.classList.remove('active'));

  let activeTabName = '';
  if (screenId === 'screen-routes' || screenId === 'screen-route-details') {
    activeTabName = 'routes';
  } else if (screenId === 'screen-home') {
    activeTabName = 'home';
  }

  if (activeTabName) {
    document.querySelectorAll(`.nav-tab-item[data-tab="${activeTabName}"]`).forEach(t => t.classList.add('active'));
  }
}

function updateJumperPills(screenId) {
  document.querySelectorAll('.screen-jump-pill').forEach(pill => {
    if (pill.getAttribute('data-target-screen') === screenId) {
      pill.classList.add('active');
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      pill.classList.remove('active');
    }
  });
}

function updateStatusBarTheme(screenId) {
  const statusBar = document.querySelector('.mobile-status-bar');
  if (!statusBar) return;

  const blueHeaderScreens = [
    'screen-home',
    'screen-tracking',
    'screen-bus-details',
    'screen-routes',
    'screen-trips',
    'screen-route-details',
    'screen-profile',
    'screen-settings'
  ];

  if (blueHeaderScreens.includes(screenId)) {
    statusBar.classList.add('status-bar-white-text');
  } else {
    statusBar.classList.remove('status-bar-white-text');
  }
}

/* ==========================================================================
   VIEW MODES (Phone Simulator, All-Screens Grid, Full Mobile)
   ========================================================================== */
function initGalleryMode() {
  const modeBtns = document.querySelectorAll('.view-mode-btn');
  const body = document.body;

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      body.classList.remove('gallery-mode-active', 'full-mobile-active');

      if (mode === 'gallery') {
        body.classList.add('gallery-mode-active');
        showToast('Viewing all 10 screens side-by-side');
      } else if (mode === 'full') {
        body.classList.add('full-mobile-active');
        showToast('Switched to Native Mobile Full-View');
      } else {
        showToast('Interactive Phone Simulator Mode');
      }
    });
  });

  document.querySelectorAll('.gallery-screen-card').forEach(card => {
    card.addEventListener('click', () => {
      const screenId = card.getAttribute('data-target-screen');
      if (screenId) {
        document.querySelector('.view-mode-btn[data-mode="simulator"]').click();
        navigateTo(screenId);
      }
    });
  });
}

/* ==========================================================================
   FILTERS (Routes, My Trips, & Stop Search)
   ========================================================================== */
function initFilters() {
  // Routes filter tabs
  const routePills = document.querySelectorAll('#screen-routes .tab-filter-pill');
  routePills.forEach(pill => {
    pill.addEventListener('click', () => {
      routePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      filterRoutes(filter);
    });
  });

  // Trips filter tabs
  const tripPills = document.querySelectorAll('#screen-trips .tab-filter-pill');
  tripPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tripPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      filterTrips(filter);
    });
  });

  // Live tracking stop search in Eluru
  const searchInput = document.getElementById('tracking-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      highlightStopOnMap(query);
    });
  }
}

function filterRoutes(filter = 'all') {
  const container = document.getElementById('routes-list-body');
  if (!container) return;

  const allRoutes = Object.values(busesDatabase);
  const filtered = filter === 'all' 
    ? allRoutes 
    : allRoutes.filter(r => r.shift === filter);

  container.innerHTML = filtered.map(item => `
    <div class="route-item-card" onclick="selectBus('${item.id}'); navigateTo('screen-bus-details');">
      <div class="route-card-left">
        <div class="route-bus-icon" style="background: ${item.color || '#2563EB'};">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 6v6"></path>
            <path d="M16 6v6"></path>
            <path d="M2 12h20"></path>
            <path d="M4 18h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"></path>
            <path d="M6 18v2"></path>
            <path d="M18 18v2"></path>
          </svg>
        </div>
        <div class="route-card-details">
          <div class="route-header-line">
            <span class="route-bus-num">${item.number}</span>
            <span class="badge-status ${item.badgeClass}">${item.status}</span>
          </div>
          <span class="route-path-text">${item.route}</span>
        </div>
      </div>
      <div class="route-card-right">
        <span class="route-eta-badge">${item.eta}</span>
        <svg class="route-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  `).join('');
}

function filterTrips(filter) {
  const container = document.getElementById('trips-list-body');
  if (!container) return;

  const trips = tripsData[filter] || tripsData.today;

  container.innerHTML = trips.map(trip => `
    <div class="trip-card-item">
      <div class="trip-card-left">
        <div class="trip-bus-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M8 6v6"></path>
            <path d="M16 6v6"></path>
            <path d="M2 12h20"></path>
            <path d="M4 18h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"></path>
            <path d="M6 18v2"></path>
            <path d="M18 18v2"></path>
          </svg>
        </div>
        <div class="trip-details">
          <span class="trip-title">${trip.number}</span>
          <span class="trip-destination">${trip.route}</span>
        </div>
      </div>
      <div class="trip-card-right">
        <span class="trip-time">${trip.time}</span>
        <span class="badge-status ${trip.badgeClass}">${trip.status}</span>
      </div>
    </div>
  `).join('');
}

function highlightStopOnMap(query) {
  if (!query || !window.liveEluruMap) return;
  const match = eluruMapLandmarks.find(lm => lm.name.toLowerCase().includes(query.toLowerCase()));
  if (match) {
    window.liveEluruMap.flyTo(match.coords, 15, { duration: 1 });
    showToast(`Found: ${match.name}`);
  }
}

/* ==========================================================================
   REAL-TIME LIVE GPS MAP OF ELURU, ANDHRA PRADESH
   ========================================================================== */
function initEluruLiveTrackingMap() {
  const mapContainer = document.getElementById('live-tracking-eluru-map');
  if (!mapContainer || typeof L === 'undefined') return;

  // Center between Eluru City and Ramachandra College of Engineering (Vatluru)
  const eluruCenter = [16.7020, 81.0650];
  const liveEluruMap = L.map('live-tracking-eluru-map', {
    zoomControl: false,
    attributionControl: false
  }).setView(eluruCenter, 13);
  window.liveEluruMap = liveEluruMap;

  // Google Maps Tile Layers (Roadmap, Satellite Hybrid, Terrain)
  const googleRoadmap = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  const googleSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  // Default to Google Maps Roadmap
  let currentBaseLayer = googleRoadmap;
  googleRoadmap.addTo(liveEluruMap);

  // Hook up Google Map layer selector buttons (Roadmap / Satellite / Terrain)
  document.querySelectorAll('.map-layer-selector .layer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.map-layer-selector .layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const layerType = btn.getAttribute('data-map-layer');
      liveEluruMap.removeLayer(currentBaseLayer);

      if (layerType === 'satellite') {
        currentBaseLayer = googleSatellite;
        showToast('Google Maps Satellite View');
      } else if (layerType === 'terrain') {
        currentBaseLayer = googleTerrain;
        showToast('Google Maps Terrain View');
      } else {
        currentBaseLayer = googleRoadmap;
        showToast('Google Maps Roadmap View');
      }

      currentBaseLayer.addTo(liveEluruMap);
    });
  });

  // 1. Eluru Municipal Corporation Boundary (Blue dashed line)
  const eluruBoundaryCoords = [
    [16.7380, 81.0820],
    [16.7450, 81.1050],
    [16.7380, 81.1250],
    [16.7280, 81.1380],
    [16.7150, 81.1420],
    [16.7020, 81.1350],
    [16.6900, 81.1180],
    [16.6850, 81.0980],
    [16.6920, 81.0750],
    [16.7080, 81.0650],
    [16.7250, 81.0720]
  ];
  L.polygon(eluruBoundaryCoords, {
    color: '#2563EB',
    weight: 2.5,
    dashArray: '5, 5',
    fillColor: '#3B82F6',
    fillOpacity: 0.05
  }).addTo(liveEluruMap).bindPopup('<b>Eluru Municipal Corporation Boundary</b>');

  // 2. NH-16 (National Highway 16) Alignment Line - Passing through Vatluru & RCEE Campus
  const nh16Path = [
    [16.6780, 81.0120],
    [16.6866, 81.0253], // Ramachandra College of Engineering (RCEE)
    [16.6920, 81.0450],
    [16.7020, 81.0680],
    [16.7080, 81.0950],
    [16.7180, 81.1200],
    [16.7280, 81.1350],
    [16.7480, 81.1650]
  ];
  L.polyline(nh16Path, {
    color: '#E11D48',
    weight: 4.5,
    opacity: 0.8
  }).addTo(liveEluruMap).bindPopup('<b>NH-16 (National Highway 16) Bypass</b><br>Connecting Vijayawada – RCEE Vatluru – Eluru City – Visakhapatnam');

  // 3. Tammileru River Course Line
  const tammileruPath = [
    [16.7550, 81.0750],
    [16.7380, 81.0860],
    [16.7200, 81.0920],
    [16.7080, 81.0980],
    [16.6950, 81.1080],
    [16.6800, 81.1200]
  ];
  L.polyline(tammileruPath, {
    color: '#0284C7',
    weight: 4,
    opacity: 0.75
  }).addTo(liveEluruMap).bindPopup('<b>Tammileru River</b><br>Flowing through Eluru toward Kolleru Lake');

  // 4. Layer Groups for Dynamic Multi-Bus Route and Fleet
  window.activeRoutePolyline = null;
  window.liveBusMarker = null;
  window.fleetMarkersLayer = L.layerGroup().addTo(liveEluruMap);

  // 5. Dedicated Prominent Destination Marker: Ramachandra College of Engineering (RCEE)
  const collegeDestIcon = L.divIcon({
    className: 'eluru-college-dest-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="position: absolute; top: -6px; width: 46px; height: 46px; background: rgba(220, 38, 38, 0.28); border-radius: 50%; animation: pulse-badge 1.6s infinite;"></div>
        <div style="width: 34px; height: 34px; background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); border: 2.5px solid #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(220,38,38,0.45); z-index: 2;">
          <span style="font-size: 17px;">🎓</span>
        </div>
        <div style="margin-top: 3px; background: #0F172A; color: #FFFFFF; font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 6px; border: 1px solid #DC2626; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.3); z-index: 3; letter-spacing: 0.02em;">
          ★ RCEE CAMPUS
        </div>
      </div>
    `,
    iconSize: [100, 52],
    iconAnchor: [50, 17]
  });

  L.marker([RCEE_CAMPUS.lat, RCEE_CAMPUS.lng], { icon: collegeDestIcon, zIndexOffset: 2500 })
    .addTo(liveEluruMap)
    .bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 230px;">
        <span style="font-size: 10px; font-weight: 800; color: #DC2626; text-transform: uppercase; letter-spacing: 0.05em;">College Destination</span>
        <h4 style="margin: 2px 0 4px; font-size: 14px; font-weight: 700; color: #0F172A;">${RCEE_CAMPUS.name}</h4>
        <p style="margin: 0 0 6px; font-size: 11px; color: #475569; line-height: 1.4;">${RCEE_CAMPUS.address}</p>
        <div style="background: #FEF2F2; border-left: 3px solid #DC2626; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #991B1B; font-weight: 600;">
          🏁 Final destination of all College Buses (1 to 5)
        </div>
      </div>
    `);

  // 6. Add Other Important Stops across Eluru
  eluruMapLandmarks.forEach(item => {
    // Skip RCEE since it has its dedicated prominent destination pin above
    if (item.coords[0] === RCEE_CAMPUS.lat && item.coords[1] === RCEE_CAMPUS.lng) return;

    const pinIcon = L.divIcon({
      className: 'eluru-stop-pin',
      html: `<div style="background: #FFFFFF; border: 2px solid #2563EB; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">${item.icon}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker(item.coords, { icon: pinIcon })
      .addTo(liveEluruMap)
      .bindPopup(`<b>${item.name}</b><br><span style="font-size:11px;color:#64748B;">${item.role}</span>`);
  });

  // 7. User Current Location Pin (Green GPS dot in R.R. Peta, Eluru)
  const userIcon = L.divIcon({
    className: 'eluru-user-pin',
    html: `
      <div style="position: relative; width: 22px; height: 22px;">
        <div style="position: absolute; width: 22px; height: 22px; background: rgba(16, 185, 129, 0.3); border-radius: 50%; animation: pulse-badge 1.8s infinite;"></div>
        <div style="position: absolute; top: 4px; left: 4px; width: 14px; height: 14px; background: #10B981; border: 2.5px solid #FFFFFF; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
  L.marker([16.7115, 81.1030], { icon: userIcon })
    .addTo(liveEluruMap)
    .bindPopup('<b>Your Location</b><br>R.R. Peta, Eluru');

  // 8. Initialize Bus Selector Pills on Live Tracking Screen
  document.querySelectorAll('#tracking-bus-selector .tracking-bus-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const busId = pill.getAttribute('data-bus-id');
      if (busId) {
        switchTrackedBus(busId);
      }
    });
  });

  // 9. Zoom Controls
  const zoomIn = document.getElementById('map-zoom-in');
  const zoomOut = document.getElementById('map-zoom-out');
  const zoomCenter = document.getElementById('map-zoom-center');

  if (zoomIn) zoomIn.onclick = () => liveEluruMap.zoomIn();
  if (zoomOut) zoomOut.onclick = () => liveEluruMap.zoomOut();
  if (zoomCenter) {
    zoomCenter.onclick = () => {
      liveEluruMap.flyTo(eluruCenter, 13);
      showToast('Centered on Eluru & RCEE Campus');
    };
  }

  // 10. Refresh Telemetry button
  document.querySelectorAll('[data-action="refresh-tracking"]').forEach(btn => {
    btn.onclick = () => {
      if (window.advanceCurrentlyTrackedBus) {
        window.advanceCurrentlyTrackedBus();
      }
      btn.style.transition = 'transform 0.6s ease';
      btn.style.transform = 'rotate(360deg)';
      setTimeout(() => btn.style.transform = 'rotate(0deg)', 600);
      showToast('Live GPS telemetry updated to RCEE Campus');
    };
  });

  // 11. Start tracking the initial active bus (Bus 2)
  switchTrackedBus(appState.trackedBusId || 'bus-2');
}

/* ==========================================================================
   DYNAMIC MULTI-BUS SWITCHING & LIVE TRACKING ENGINE
   ========================================================================== */

/**
 * Select a bus and update Bus Details (Screen 5) & Route Details (Screen 8)
 */
function selectBus(busId) {
  if (!busesDatabase[busId]) return;
  const bus = busesDatabase[busId];
  appState.activeBusId = busId;

  // Screen 5 (Bus Details) elements
  const busNumEl = document.getElementById('bus-details-number');
  if (busNumEl) busNumEl.textContent = bus.number;

  const busRouteEl = document.getElementById('bus-details-route');
  if (busRouteEl) busRouteEl.textContent = bus.route;

  const statusBadgeEl = document.getElementById('bus-details-status-badge');
  if (statusBadgeEl) {
    statusBadgeEl.textContent = bus.status;
    statusBadgeEl.className = `badge-status ${bus.badgeClass}`;
  }

  const locEl = document.getElementById('bus-details-location');
  if (locEl) locEl.textContent = bus.currentLocation;

  const etaEl = document.getElementById('bus-details-eta');
  if (etaEl) etaEl.textContent = bus.eta;

  const trackBtnLabel = document.getElementById('btn-track-bus-label');
  if (trackBtnLabel) trackBtnLabel.textContent = bus.number;

  const routeLabelEl = document.getElementById('bus-details-route-label');
  if (routeLabelEl) routeLabelEl.textContent = `${bus.number} Route`;

  // Render stops timeline on Screen 5
  const timelineEl = document.getElementById('bus-details-stops-timeline');
  if (timelineEl && bus.stops) {
    timelineEl.innerHTML = bus.stops.map(stop => {
      let itemClass = '';
      let badgeHtml = '';
      if (stop.status === 'Passed') {
        itemClass = 'passed';
        badgeHtml = '<span class="badge-status badge-passed">Passed</span>';
      } else if (stop.status === 'Next Stop') {
        itemClass = 'active-stop';
        badgeHtml = '<span class="badge-status badge-next">Next Stop</span>';
      } else if (stop.status === 'Final Destination') {
        itemClass = '';
        badgeHtml = '<span class="badge-status" style="background:#F1F5F9;color:#475569;font-weight:700;">Destination</span>';
      }
      return `
        <div class="timeline-step-item ${itemClass}">
          <div class="timeline-dot"></div>
          <div class="stop-detail-info">
            <h4>${stop.name}</h4>
            <p>${stop.time} • ${stop.distance}</p>
          </div>
          ${badgeHtml}
        </div>
      `;
    }).join('');
  }

  // Screen 8 (Route Details) elements
  const bannerTitle = document.getElementById('route-details-banner-title');
  if (bannerTitle) bannerTitle.textContent = `${bus.number} - ${bus.route}`;

  const totalStopsEl = document.getElementById('route-details-total-stops');
  if (totalStopsEl) totalStopsEl.textContent = bus.stops.length;

  const totalDistEl = document.getElementById('route-details-total-distance');
  if (totalDistEl) totalDistEl.textContent = bus.totalDistance;

  const totalTimeEl = document.getElementById('route-details-estimated-time');
  if (totalTimeEl) totalTimeEl.textContent = bus.totalTime;

  const startStopName = document.getElementById('svg-start-stop-name');
  if (startStopName && bus.stops[0]) startStopName.textContent = bus.stops[0].name.split(' ')[0];

  const destStopName = document.getElementById('svg-dest-stop-name');
  if (destStopName && bus.stops.length) destStopName.textContent = bus.stops[bus.stops.length - 1].name.split(' ')[0];
}

/**
 * Navigate to Live Tracking screen and track the currently active bus
 */
function trackActiveBusLive() {
  const busId = appState.activeBusId || 'bus-2';
  switchTrackedBus(busId);
  navigateTo('screen-tracking');
}

/**
 * Switch real-time Live GPS tracking on Eluru Google Maps to any bus (Bus 1, 2, 3, 4, 5)
 */
function switchTrackedBus(busId) {
  if (!busesDatabase[busId]) return;
  const bus = busesDatabase[busId];
  appState.trackedBusId = busId;
  appState.activeBusId = busId;

  // Sync Bus Details data
  selectBus(busId);

  // Update pills in Screen 4 Live Tracking
  document.querySelectorAll('#tracking-bus-selector .tracking-bus-pill').forEach(pill => {
    const pId = pill.getAttribute('data-bus-id');
    if (pId === busId) {
      pill.classList.add('active');
      pill.textContent = `🚌 ${bus.number} (Live)`;
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      pill.classList.remove('active');
      const otherBus = busesDatabase[pId];
      pill.textContent = `🚌 ${otherBus ? otherBus.number : pId}`;
    }
  });

  // Update floating bottom card on Screen 4
  const floatName = document.getElementById('tracking-float-bus-name');
  if (floatName) floatName.textContent = bus.number;

  const floatEta = document.getElementById('tracking-float-bus-eta');
  if (floatEta) floatEta.textContent = `Arriving in ${bus.eta} • ${bus.waypoints[0].name}`;

  const floatRoute = document.getElementById('tracking-float-bus-route');
  if (floatRoute) floatRoute.textContent = bus.route;

  // Update map legend
  const legendLabel = document.getElementById('legend-active-bus-label');
  if (legendLabel) legendLabel.textContent = `${bus.number} (Live)`;

  // If Leaflet map is initialized
  if (window.liveEluruMap) {
    if (appState.simulation.intervalId) {
      clearInterval(appState.simulation.intervalId);
    }

    // Remove existing polyline if present
    if (window.activeRoutePolyline) {
      window.liveEluruMap.removeLayer(window.activeRoutePolyline);
    }

    // Draw new polyline for selected bus route in Eluru
    const routeLatLngs = bus.waypoints.map(pt => [pt.lat, pt.lng]);
    window.activeRoutePolyline = L.polyline(routeLatLngs, {
      color: bus.color || '#2563EB',
      weight: 5.5,
      opacity: 0.95,
      lineJoin: 'round'
    }).addTo(window.liveEluruMap);

    // Update or create live bus marker with pulsing GPS beacon
    const startPt = bus.waypoints[0];
    const liveIcon = L.divIcon({
      className: 'eluru-bus-live-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center;">
          <div style="position: absolute; left: -8px; top: -8px; width: 44px; height: 44px; background: rgba(37, 99, 235, 0.25); border-radius: 50%; animation: pulse-badge 1.5s infinite;"></div>
          <div style="background: ${bus.color || '#2563EB'}; color: #FFFFFF; padding: 4px 10px; border-radius: 14px; font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 1.5px solid #FFFFFF; white-space: nowrap; z-index: 5;">
            <span>🚌</span> <span id="bus-live-label">${bus.number} (${startPt.eta})</span>
          </div>
        </div>
      `,
      iconSize: [120, 30],
      iconAnchor: [60, 15]
    });

    if (window.liveBusMarker) {
      window.liveBusMarker.setIcon(liveIcon);
      window.liveBusMarker.setLatLng([startPt.lat, startPt.lng]);
    } else {
      window.liveBusMarker = L.marker([startPt.lat, startPt.lng], { icon: liveIcon, zIndexOffset: 1000 }).addTo(window.liveEluruMap);
    }

    // Render other fleet buses on the map across Eluru with interactive pills
    if (window.fleetMarkersLayer) {
      window.fleetMarkersLayer.clearLayers();
      Object.values(busesDatabase).forEach(b => {
        if (b.id !== busId) {
          const fleetPt = b.waypoints[0];
          const fleetIcon = L.divIcon({
            className: 'eluru-fleet-bus-pin',
            html: `
              <div onclick="switchTrackedBus('${b.id}')" style="background: #1E293B; color: #FFFFFF; padding: 3px 8px; border-radius: 10px; font-size: 10px; font-weight: 700; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.25); white-space: nowrap; cursor: pointer;">
                <span>🚌</span> ${b.number}
              </div>
            `,
            iconSize: [80, 22],
            iconAnchor: [40, 11]
          });
          L.marker([fleetPt.lat, fleetPt.lng], { icon: fleetIcon })
            .addTo(window.fleetMarkersLayer)
            .bindPopup(`<b>${b.number}</b><br>${b.route}<br><span style="font-size:11px;color:#2563EB;cursor:pointer;font-weight:700;" onclick="switchTrackedBus('${b.id}')">📍 Click to track this bus live</span>`);
        }
      });
    }

    // Smoothly fly map to selected bus position
    // Live GPS telemetry advancement along route waypoints towards Ramachandra College of Engineering
    let currentIdx = 0;
    function advanceCurrentBus() {
      currentIdx = (currentIdx + 1) % bus.waypoints.length;
      const pt = bus.waypoints[currentIdx];
      if (window.liveBusMarker) {
        window.liveBusMarker.setLatLng([pt.lat, pt.lng]);
      }
      const label = document.getElementById('bus-live-label');
      if (label) {
        label.textContent = pt.eta === 'Arrived'
          ? `${bus.number} (At RCEE Campus)`
          : `${bus.number} (${pt.eta})`;
      }

      const cardEta = document.getElementById('tracking-float-bus-eta');
      if (cardEta) {
        cardEta.textContent = pt.eta === 'Arrived'
          ? `🏁 Arrived at Ramachandra College of Engineering`
          : `Arriving in ${pt.eta} • ${pt.name}`;
      }
    }

    window.advanceCurrentlyTrackedBus = advanceCurrentBus;
    appState.simulation.intervalId = setInterval(advanceCurrentBus, 2500);
  }

  showToast(`Tracking ${bus.number} to Ramachandra College`);
}

// Expose functions globally for inline HTML event handlers
window.selectBus = selectBus;
window.switchTrackedBus = switchTrackedBus;
window.trackActiveBusLive = trackActiveBusLive;

/* ==========================================================================
   MODALS, DRAWERS & BOTTOM SHEETS
   ========================================================================== */
function initModalsAndDrawers() {
  // 1. Hamburger Side Drawer
  const hamburgerBtn = document.getElementById('btn-open-drawer');
  const drawerBackdrop = document.getElementById('side-drawer');
  const closeDrawerBtn = document.getElementById('btn-close-drawer');
  const closeDrawerXBtn = document.getElementById('btn-close-drawer-x');
  const drawerLogoutBtn = document.getElementById('btn-drawer-logout');

  if (hamburgerBtn && drawerBackdrop) {
    hamburgerBtn.addEventListener('click', () => {
      drawerBackdrop.classList.add('active');
    });
  }

  if (closeDrawerBtn && drawerBackdrop) {
    closeDrawerBtn.addEventListener('click', () => {
      drawerBackdrop.classList.remove('active');
    });
  }

  if (closeDrawerXBtn && drawerBackdrop) {
    closeDrawerXBtn.addEventListener('click', () => {
      drawerBackdrop.classList.remove('active');
    });
  }

  if (drawerLogoutBtn && drawerBackdrop) {
    drawerLogoutBtn.addEventListener('click', () => {
      drawerBackdrop.classList.remove('active');
      showToast('You have been logged out safely');
      navigateTo('screen-login');
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) {
        drawerBackdrop.classList.remove('active');
      }
    });
  }

  // 2. Notification Sheet Modal
  const notifBtn = document.getElementById('btn-open-notifications');
  const notifModal = document.getElementById('notifications-modal');
  const notifClose = document.getElementById('btn-close-notifications');

  if (notifBtn && notifModal) {
    notifBtn.addEventListener('click', () => {
      notifModal.classList.add('active');
    });
  }

  if (notifClose && notifModal) {
    notifClose.addEventListener('click', () => {
      notifModal.classList.remove('active');
    });
  }

  if (notifModal) {
    notifModal.addEventListener('click', (e) => {
      if (e.target === notifModal) {
        notifModal.classList.remove('active');
      }
    });
  }

  // 3. Route Details "View Stops List" Modal
  const viewStopsBtn = document.getElementById('btn-view-stops-list');
  const stopsModal = document.getElementById('stops-sheet-modal');
  const stopsClose = document.getElementById('btn-close-stops-sheet');

  if (viewStopsBtn && stopsModal) {
    viewStopsBtn.addEventListener('click', () => {
      renderStopsInModal();
      stopsModal.classList.add('active');
    });
  }

  if (stopsClose && stopsModal) {
    stopsClose.addEventListener('click', () => {
      stopsModal.classList.remove('active');
    });
  }

  if (stopsModal) {
    stopsModal.addEventListener('click', (e) => {
      if (e.target === stopsModal) {
        stopsModal.classList.remove('active');
      }
    });
  }
}

function renderStopsInModal() {
  const content = document.getElementById('stops-list-modal-body');
  if (!content) return;

  const currentBus = busesDatabase[appState.activeBusId] || busesDatabase['bus-2'];
  const stops = currentBus.stops || [];

  content.innerHTML = stops.map(stop => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 28px; height: 28px; border-radius: 50%; background: #EFF6FF; color: #2563EB; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; justify-content: center;">
          ${stop.index}
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.88rem; color: #0F172A;">${stop.name}</div>
          <div style="font-size: 0.74rem; color: #64748B;">ETA: ${stop.time} • ${stop.distance}</div>
        </div>
      </div>
      <span class="badge-status ${stop.status === 'Passed' ? 'badge-passed' : stop.status === 'Next Stop' ? 'badge-next' : 'badge-upcoming'}">
        ${stop.status}
      </span>
    </div>
  `).join('');
}

/* ==========================================================================
   FORM HANDLERS & TOASTS
   ========================================================================== */
function initFormHandlers() {
  // Role selector tab switching
  const roleTabs = document.querySelectorAll('.role-tab-btn');
  const emailInput = document.getElementById('login-email');
  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const role = tab.getAttribute('data-role');
      if (emailInput) {
        if (role === 'student') {
          emailInput.placeholder = 'e.g. 21CS101';
          emailInput.value = '21CS101';
        } else if (role === 'faculty') {
          emailInput.placeholder = 'e.g. FAC890';
          emailInput.value = 'FAC890';
        } else if (role === 'driver') {
          emailInput.placeholder = 'e.g. BUS-DRV-02';
          emailInput.value = 'BUS-DRV-02';
        }
      }
    });
  });

  const togglePassBtn = document.getElementById('btn-toggle-password');
  const passInput = document.getElementById('login-password');

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeRole = document.querySelector('.role-tab-btn.active')?.getAttribute('data-role') || 'student';
      showToast(`Welcome back! Signed in as ${activeRole.toUpperCase()}`);
      navigateTo('screen-home');
    });
  }

  const googleBtn = document.getElementById('btn-login-google');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Signed in with Google account');
      navigateTo('screen-home');
    });
  }

  const guestBtn = document.getElementById('btn-login-guest');
  if (guestBtn) {
    guestBtn.addEventListener('click', () => {
      showToast('Guest login successful');
      navigateTo('screen-home');
    });
  }

  const forgotBtn = document.getElementById('btn-forgot-password');
  if (forgotBtn) {
    forgotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Reset password link sent to registered email');
    });
  }

  const logoutBtn = document.getElementById('btn-settings-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      showToast('You have been logged out safely');
      navigateTo('screen-welcome');
    });
  }

  document.querySelectorAll('.settings-item-card').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('h4')?.textContent || 'Setting';
      showToast(`${title} updated`);
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;

  const msgSpan = document.getElementById('toast-msg');
  if (msgSpan) msgSpan.textContent = message;

  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2600);
}
