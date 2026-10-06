import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { busesDatabase, eluruMapLandmarks, tripsData } from './data.js';
import welcomeBus from '../assets/welcome_bus.jpg';
import studentAvatar from '../assets/student_avatar.jpg';
import safeRideBanner from '../assets/safe_ride_banner.jpg';

const BUS_LIST = Object.values(busesDatabase);
const SCREEN_HOME = 'screen-home';
const CAMPUS_CENTER = [16.702, 81.065];

function BusIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 6v6M16 6v6M2 12h20M4 18h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z" />
      <path d="M6 18v2M18 18v2" />
    </svg>
  );
}

function ScreenHeader({ title, onBack, trailing }) {
  return (
    <header className="screen-header-blue">
      {onBack ? (
        <button className="header-btn" onClick={onBack} aria-label="Go back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      ) : <span className="header-btn-spacer" />}
      <h2 className="header-title">{title}</h2>
      {trailing || <span className="header-btn-spacer" />}
    </header>
  );
}

function BottomNav({ current, navigate }) {
  return (
    <nav className="bottom-nav-bar" aria-label="Main navigation">
      <button className={`nav-tab-item ${current === SCREEN_HOME ? 'active' : ''}`} onClick={() => navigate(SCREEN_HOME)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        Home
      </button>
      <button className={`nav-tab-item ${current === 'screen-routes' ? 'active' : ''}`} onClick={() => navigate('screen-routes')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
        Routes
      </button>
    </nav>
  );
}

function StatusBadge({ bus }) {
  return <span className={`badge-status ${bus.badgeClass}`}>{bus.status}</span>;
}

function RouteCard({ bus, onClick }) {
  return (
    <button type="button" className="route-item-card bus-route-card" onClick={onClick}>
      <span className="route-card-left">
        <span className="route-bus-icon" style={{ background: bus.color }}><BusIcon size={22} /></span>
        <span className="route-card-details">
          <span className="route-header-line"><strong className="route-bus-num">{bus.number}</strong><StatusBadge bus={bus} /></span>
          <span className="route-path-text">{bus.route}</span>
        </span>
      </span>
      <span className="route-card-right">
        <span className="route-eta-badge">{bus.eta}</span>
        <span className="route-chevron" aria-hidden="true">›</span>
      </span>
    </button>
  );
}

function StopRows({ bus }) {
  return (
    <div className="route-stop-list">
      {bus.stops.map((stop) => (
        <div className="route-stop-row" key={`${bus.id}-${stop.index}`}>
          <span className="route-stop-number">{stop.index}</span>
          <div className="route-stop-copy">
            <strong>{stop.name}</strong>
            <span>{stop.time} · {stop.distance}</span>
          </div>
          <span className={`badge-status ${stop.status === 'Passed' ? 'badge-passed' : stop.status === 'Next Stop' ? 'badge-next' : stop.status === 'Upcoming' ? 'badge-upcoming' : ''}`}>
            {stop.status === 'Final Destination' ? 'Destination' : stop.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function LiveMap({ bus, onToast, onTrackBus, searchRequest, refreshCount }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const routeRef = useRef(null);
  const busMarkerRef = useRef(null);
  const stepRef = useRef(0);
  const [layer, setLayer] = useState('roadmap');

  useEffect(() => {
    if (!mapContainer.current) return undefined;

    const map = L.map(mapContainer.current, {
      zoomControl: false,
      attributionControl: true,
      zoomAnimation: false,
      fadeAnimation: false,
      markerZoomAnimation: false
    }).setView(CAMPUS_CENTER, 13);
    mapRef.current = map;

    const layers = {
      roadmap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }),
      satellite: L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      terrain: L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    };
    layers.roadmap.addTo(map);
    mapRef.current.baseLayers = layers;

    const boundary = [
      [16.738, 81.082], [16.745, 81.105], [16.738, 81.125], [16.728, 81.138],
      [16.715, 81.142], [16.702, 81.135], [16.69, 81.118], [16.685, 81.098],
      [16.692, 81.075], [16.708, 81.065], [16.725, 81.072]
    ];
    L.polygon(boundary, { color: '#2563EB', weight: 2, dashArray: '5 5', fillOpacity: 0.04 }).addTo(map);

    eluruMapLandmarks.forEach((landmark) => {
      L.marker(landmark.coords, {
        icon: L.divIcon({
          className: 'eluru-stop-pin',
          html: `<span style="display:grid;place-items:center;width:28px;height:28px;border:2px solid #2563eb;border-radius:50%;background:#fff;font-size:14px">${landmark.icon}</span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })
      }).addTo(map).bindPopup(`<strong>${landmark.name}</strong><br>${landmark.role}`);
    });
    L.marker([16.7115, 81.103], {
      icon: L.divIcon({
        className: 'eluru-user-pin',
        html: '<span style="display:grid;place-items:center;width:18px;height:18px;border:3px solid #fff;border-radius:50%;background:#10b981;box-shadow:0 0 0 6px #10b98144"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map).bindPopup('<strong>Your location</strong><br>R.R. Peta, Eluru');

    return () => {
      map.remove();
      mapRef.current = null;
      routeRef.current = null;
      busMarkerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.entries(map.baseLayers).forEach(([name, tileLayer]) => {
      if (name === layer) tileLayer.addTo(map);
      else if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    });
  }, [layer]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return undefined;
    const points = bus.waypoints.map((point) => [point.lat, point.lng]);
    if (routeRef.current) map.removeLayer(routeRef.current);
    routeRef.current = L.polyline(points, { color: bus.color, weight: 5, opacity: 0.92 }).addTo(map);

    if (busMarkerRef.current) map.removeLayer(busMarkerRef.current);
    stepRef.current = 0;
    const start = bus.waypoints[0];
    const busIcon = L.divIcon({
      className: 'eluru-bus-live-pin',
      html: `<span style="display:grid;place-items:center;width:34px;height:34px;border:3px solid #fff;border-radius:50%;background:${bus.color};box-shadow:0 2px 8px #0005;font-size:18px">🚌</span>`,
      iconSize: [42, 42],
      iconAnchor: [21, 21]
    });
    busMarkerRef.current = L.marker([start.lat, start.lng], { icon: busIcon, zIndexOffset: 1000 }).addTo(map);
    map.fitBounds(routeRef.current.getBounds(), { padding: [40, 40], maxZoom: 14, animate: false });
    const intervalId = window.setInterval(() => {
      stepRef.current = (stepRef.current + 1) % bus.waypoints.length;
      const point = bus.waypoints[stepRef.current];
      busMarkerRef.current?.setLatLng([point.lat, point.lng]);
    }, 2500);
    const resizeId = window.setTimeout(() => map.invalidateSize(), 150);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(resizeId);
    };
  }, [bus]);

  const findStop = (query) => {
    const value = query.trim().toLowerCase();
    if (!value) return;
    const match = eluruMapLandmarks.find((item) => item.name.toLowerCase().includes(value));
    if (match) {
      mapRef.current?.setView(match.coords, 15);
      onToast(`Found: ${match.name}`);
    } else {
      onToast('No matching stop found');
    }
  };

  useEffect(() => {
    if (searchRequest.id > 0) findStop(searchRequest.query);
  }, [searchRequest]);

  useEffect(() => {
    if (refreshCount === 0 || !busMarkerRef.current) return;
    stepRef.current = (stepRef.current + 1) % bus.waypoints.length;
    const point = bus.waypoints[stepRef.current];
    busMarkerRef.current.setLatLng([point.lat, point.lng]);
  }, [refreshCount, bus]);

  return (
    <div className="tracking-screen-content">
      <div className="map-canvas-container react-leaflet-map" ref={mapContainer} aria-label="Live bus map of Eluru" />
      <div className="map-layer-selector">
        {[['roadmap', '🗺 Map'], ['satellite', '🛰 Satellite'], ['terrain', '⛰ Terrain']].map(([value, label]) => (
          <button key={value} className={`layer-btn ${layer === value ? 'active' : ''}`} onClick={() => setLayer(value)}>{label}</button>
        ))}
      </div>
      <div className="map-controls-group">
        <button className="map-btn" title="Zoom in" onClick={() => mapRef.current?.zoomIn()}>+</button>
        <button className="map-btn" title="Zoom out" onClick={() => mapRef.current?.zoomOut()}>−</button>
        <button className="map-btn" title="Re-center on Eluru" onClick={() => mapRef.current?.setView(CAMPUS_CENTER, 13)}>◎</button>
      </div>
      <div className="map-legend-strip">
        <span className="legend-item"><span className="legend-dot blue" />{bus.number} (Live)</span>
        <span className="legend-item"><span className="legend-dot ring" />Stops</span>
        <span className="legend-item"><span className="legend-dot green" />You</span>
      </div>
      <button className="tracking-float-card" onClick={onTrackBus}>
        <span className="route-bus-icon" style={{ background: bus.color }}><BusIcon size={22} /></span>
        <span className="tracking-card-copy">
          <strong>{bus.number}</strong>
          <span>Arriving in {bus.eta} · {bus.currentLocation}</span>
          <small>{bus.route}</small>
        </span>
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('screen-welcome');
  const [history, setHistory] = useState(['screen-welcome']);
  const [activeBusId, setActiveBusId] = useState('bus-2');
  const [trackedBusId, setTrackedBusId] = useState('bus-2');
  const [routeFilter, setRouteFilter] = useState('all');
  const [tripFilter, setTripFilter] = useState('today');
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('21CS101');
  const [password, setPassword] = useState('busdemo123');
  const [showPassword, setShowPassword] = useState(false);
  const [mapSearch, setMapSearch] = useState('');
  const [mapSearchRequest, setMapSearchRequest] = useState({ id: 0, query: '' });
  const [refreshCount, setRefreshCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [time, setTime] = useState(() => new Date());
  const toastTimer = useRef(null);

  const activeBus = busesDatabase[activeBusId];
  const trackedBus = busesDatabase[trackedBusId];
  const filteredRoutes = useMemo(
    () => BUS_LIST.filter((bus) => routeFilter === 'all' || bus.shift === routeFilter),
    [routeFilter]
  );

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 10000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const notify = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  }, []);

  const navigate = useCallback((target, addToHistory = true) => {
    if (addToHistory && target !== screen) {
      setHistory((items) => [...items, target]);
    }
    setScreen(target);
    setDrawerOpen(false);
    setModal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const nextHistory = history.slice(0, -1);
      setHistory(nextHistory);
      setScreen(nextHistory[nextHistory.length - 1]);
    } else {
      navigate(SCREEN_HOME, false);
    }
  }, [history, navigate]);

  const chooseBus = (busId) => {
    if (!busesDatabase[busId]) return;
    setActiveBusId(busId);
  };

  const trackBus = (busId = activeBusId) => {
    if (!busesDatabase[busId]) return;
    setTrackedBusId(busId);
    setActiveBusId(busId);
    navigate('screen-tracking');
  };

  const signIn = (message) => {
    notify(message);
    navigate(SCREEN_HOME);
  };

  const clock = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return (
    <main className="app-viewport-container">
      <div className="mobile-device-frame">
        <div className="device-screen-inner">
          <header className="mobile-status-bar" id="app-status-bar">
            <span className="status-time">{clock}</span>
            <div className="status-icons" aria-label="Mobile status">
              <svg width="15" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx=".8" /><rect x="4.5" y="5" width="3" height="7" rx=".8" /><rect x="9" y="2.5" width="3" height="9.5" rx=".8" /><rect x="13.5" width="3" height="12" rx=".8" /></svg>
              <svg width="15" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true"><path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.95-3.54a7 7 0 0 0-9.9 0l1.06 1.06a5.5 5.5 0 0 1 7.78 0l1.06-1.06Zm2.12-2.12a10 10 0 0 0-14.14 0l1.06 1.06a8.5 8.5 0 0 1 12.02 0l1.06-1.06Z" /></svg>
              <svg width="22" height="11" viewBox="0 0 24 12" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="18" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" /><rect x="3" y="3" width="13" height="6" rx="1.5" /><path d="M21 4.5v3a1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5Z" /></svg>
            </div>
          </header>

          <aside className={`app-toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">
            <span aria-hidden="true">ⓘ</span><span>{toast || 'Welcome to College Bus Tracker'}</span>
          </aside>

          <div className="screens-viewport">
            {screen === 'screen-welcome' && (
              <section className="app-screen active" id="screen-welcome">
                <div className="welcome-header-group">
                  <div className="app-icon-circle-lg"><BusIcon size={30} /></div>
                  <h1 className="welcome-title">College Bus<br />Tracker</h1>
                  <p className="welcome-subtitle">Track • Stay Safe • Reach On Time</p>
                </div>
                <div className="welcome-hero-art"><img src={welcomeBus} alt="College bus travelling to campus" /></div>
                <div className="welcome-cta-group">
                  <button className="btn-primary" onClick={() => navigate('screen-login')}>Get Started</button>
                  <button className="btn-text" onClick={() => navigate('screen-login')}>Login</button>
                </div>
              </section>
            )}

            {screen === 'screen-login' && (
              <section className="app-screen active" id="screen-login">
                <div className="login-container-inner">
                  <div className="login-top-area">
                    <div className="login-logo-circle"><BusIcon size={30} /></div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to track your campus bus in real-time</p>
                  </div>
                  <div className="login-role-tabs" role="tablist" aria-label="Account type">
                    {['student', 'faculty'].map((value) => (
                      <button key={value} type="button" role="tab" aria-selected={role === value} className={`role-tab-btn ${role === value ? 'active' : ''}`} onClick={() => { setRole(value); setEmail(value === 'student' ? '21CS101' : 'FAC890'); }}>
                        {value[0].toUpperCase() + value.slice(1)}
                      </button>
                    ))}
                  </div>
                  <form className="login-form-area" onSubmit={(event) => { event.preventDefault(); signIn(`Welcome back! Signed in as ${role.toUpperCase()}`); }}>
                    <div className="input-field-group">
                      <label className="input-label" htmlFor="login-email">Roll Number / Email</label>
                      <div className="input-field-wrapper"><input className="form-input" id="login-email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={role === 'student' ? 'e.g. 21CS101' : 'e.g. FAC890'} required /></div>
                    </div>
                    <div className="input-field-group">
                      <label className="input-label" htmlFor="login-password">Password</label>
                      <div className="input-field-wrapper">
                        <input className="form-input" id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
                        <button className="password-toggle-btn" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>◉</button>
                      </div>
                    </div>
                    <div className="form-options-row">
                      <label className="remember-checkbox-label"><input type="checkbox" defaultChecked /><span>Remember me</span></label>
                      <button type="button" className="forgot-password-link" onClick={() => notify('Reset password link sent to registered email')}>Forgot password?</button>
                    </div>
                    <button type="submit" className="btn-primary login-submit-btn">Sign In <span aria-hidden="true">→</span></button>
                    <div className="divider-or-row"><span className="divider-line" /><span>OR</span><span className="divider-line" /></div>
                    <button type="button" className="btn-google" onClick={() => signIn('Signed in with Google account')}>G&nbsp; Continue with Google</button>
                    <button type="button" className="btn-guest-login" onClick={() => signIn('Guest login successful')}>⚡ Quick Guest Demo Login</button>
                  </form>
                </div>
                <div className="login-bottom-text">Don't have an account? <button onClick={() => navigate(SCREEN_HOME)}>Sign Up</button></div>
              </section>
            )}

            {screen === SCREEN_HOME && (
              <section className="app-screen active has-bottom-nav" id={SCREEN_HOME}>
                <header className="screen-header-blue">
                  <button className="header-btn" aria-label="Open navigation menu" onClick={() => setDrawerOpen(true)}>☰</button>
                  <h2 className="header-title">Bus Tracker</h2>
                  <button className="header-btn" aria-label="Notifications" onClick={() => setModal('notifications')}>♧</button>
                </header>
                <div className="home-content-container">
                  <div className="greeting-row"><h3 className="greeting-title">Hello, Student 👋</h3><p className="greeting-subtitle">Track your college bus in real-time.</p></div>
                  <button className="card-next-bus" onClick={() => { chooseBus('bus-2'); navigate('screen-bus-details'); }}>
                    <span className="bus-icon-circle"><BusIcon /></span>
                    <span className="next-bus-info"><small className="next-bus-label">Next Bus • Eluru</small><strong className="next-bus-name">{busesDatabase['bus-2'].number}</strong><span className="next-bus-eta">Arriving in {busesDatabase['bus-2'].eta} • {busesDatabase['bus-2'].shortRoute}</span></span>
                    <span className="chevron-icon" aria-hidden="true">›</span>
                  </button>
                  <div className="quick-actions-grid">
                    {[
                      ['Live Tracking', 'screen-tracking', 'green', '⌖'],
                      ['Routes', 'screen-routes', 'blue', '⌖'],
                      ['My Trips', 'screen-trips', 'blue', '▦'],
                      ['Profile', 'screen-profile', 'blue', '♙']
                    ].map(([label, target, color, icon]) => (
                      <button className="action-tile-btn" key={target} onClick={() => navigate(target)}>
                        <span className={`tile-icon-box ${color}`}>{icon}</span><span className="tile-label">{label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="home-promo-card"><h3>Safe Ride • Better Tomorrow</h3><img className="promo-bus-thumb" src={safeRideBanner} alt="Safe ride awareness banner" /></div>
                </div>
                <BottomNav current={screen} navigate={navigate} />
              </section>
            )}

            {screen === 'screen-tracking' && (
              <section className="app-screen active" id="screen-tracking">
                <ScreenHeader title="Live Bus Tracking" onBack={goBack} trailing={<button className="header-btn" aria-label="Refresh bus location" onClick={() => { setRefreshCount((count) => count + 1); notify('Live GPS telemetry updated'); }}>↻</button>} />
                <form className="tracking-search-bar" onSubmit={(event) => { event.preventDefault(); setMapSearchRequest((request) => ({ id: request.id + 1, query: mapSearch })); }}>
                  <span aria-hidden="true">⌕</span>
                  <input className="tracking-location-search" list="eluru-stops" value={mapSearch} onChange={(event) => setMapSearch(event.target.value)} placeholder="Search your stop or location..." aria-label="Search stops" />
                  <datalist id="eluru-stops">{eluruMapLandmarks.map((landmark) => <option key={landmark.name} value={landmark.name} />)}</datalist>
                </form>
                <div className="tracking-bus-bar" id="tracking-bus-selector">
                  {BUS_LIST.map((bus) => <button key={bus.id} className={`tracking-bus-pill ${trackedBusId === bus.id ? 'active' : ''}`} onClick={() => { setTrackedBusId(bus.id); setActiveBusId(bus.id); }}>{bus.number}{trackedBusId === bus.id ? ' (Live)' : ''}</button>)}
                </div>
                <LiveMap key={trackedBus.id} bus={trackedBus} onToast={notify} searchRequest={mapSearchRequest} refreshCount={refreshCount} onTrackBus={() => { chooseBus(trackedBus.id); navigate('screen-bus-details'); }} />
              </section>
            )}

            {screen === 'screen-bus-details' && (
              <section className="app-screen active" id="screen-bus-details">
                <ScreenHeader title="Bus Details" onBack={goBack} />
                <div className="screen-content-padding">
                  <article className="bus-overview-card">
                    <div className="bus-header-summary">
                      <div className="bus-summary-left"><div className="bus-badge-icon"><BusIcon /></div><div className="bus-title-group"><h3>{activeBus.number}</h3><p>{activeBus.route}</p></div></div>
                      <StatusBadge bus={activeBus} />
                    </div>
                    <div className="journey-progress-track"><div className="journey-progress-fill" style={{ width: '58%', background: activeBus.color }} /><span className="journey-marker start" /><span className="journey-marker current-bus"><BusIcon size={17} /></span><span className="journey-marker end" /></div>
                    <div className="bus-quick-stats-row">
                      <div className="stat-item-block"><span aria-hidden="true">⌖</span><div><span className="stat-item-label">Current Location</span><div className="stat-item-value">{activeBus.currentLocation}</div></div></div>
                      <div className="stat-item-block"><span aria-hidden="true">◷</span><div><span className="stat-item-label">ETA to Destination</span><div className="stat-item-value">{activeBus.eta}</div></div></div>
                    </div>
                  </article>
                  <h3 className="timeline-section-title">Upcoming Stops ({activeBus.number} Route)</h3>
                  <StopRows bus={activeBus} />
                  <div className="bus-detail-actions">
                    <button className="btn-primary" onClick={() => trackBus(activeBus.id)}>📍 Track {activeBus.number} Live on Map</button>
                    <button className="btn-secondary" onClick={() => navigate('screen-route-details')}>View Full Route &gt;</button>
                  </div>
                </div>
              </section>
            )}

            {screen === 'screen-routes' && (
              <section className="app-screen active has-bottom-nav" id="screen-routes">
                <ScreenHeader title="Routes" onBack={goBack} />
                <div className="routes-filter-tabs">
                  {['all', 'morning', 'afternoon'].map((filter) => <button key={filter} className={`tab-filter-pill ${routeFilter === filter ? 'active' : ''}`} onClick={() => setRouteFilter(filter)}>{filter === 'all' ? 'All Routes' : filter === 'morning' ? 'Morning' : 'Evening'}</button>)}
                </div>
                <div className="routes-list-container">
                  {filteredRoutes.length ? filteredRoutes.map((bus) => <RouteCard key={bus.id} bus={bus} onClick={() => { chooseBus(bus.id); navigate('screen-bus-details'); }} />) : <p className="screen-empty-state">No routes found.</p>}
                </div>
                <BottomNav current={screen} navigate={navigate} />
              </section>
            )}

            {screen === 'screen-trips' && (
              <section className="app-screen active" id="screen-trips">
                <ScreenHeader title="My Trips" onBack={goBack} />
                <div className="routes-filter-tabs">
                  {['today', 'week', 'month'].map((filter) => <button key={filter} className={`tab-filter-pill ${tripFilter === filter ? 'active' : ''}`} onClick={() => setTripFilter(filter)}>{filter === 'today' ? 'Today' : filter === 'week' ? 'This Week' : 'This Month'}</button>)}
                </div>
                <div className="trip-list">
                  {(tripsData[tripFilter] || []).map((trip, index) => <article className="trip-card-item" key={`${trip.number}-${trip.time}-${index}`}><div className="trip-card-left"><div className="trip-bus-icon"><BusIcon size={20} /></div><div className="trip-details"><strong className="trip-title">{trip.number}</strong><span className="trip-destination">{trip.route}</span></div></div><div className="trip-card-right"><span className="trip-time">{trip.time}</span><span className={`badge-status ${trip.badgeClass}`}>{trip.status}</span></div></article>)}
                </div>
              </section>
            )}

            {screen === 'screen-route-details' && (
              <section className="app-screen active" id="screen-route-details">
                <ScreenHeader title="Route Details" onBack={goBack} />
                <div className="screen-content-padding">
                  <div className="route-details-banner"><h3>{activeBus.number} - {activeBus.route}</h3><StatusBadge bus={activeBus} /></div>
                  <div className="route-details-stats">
                    <div className="route-details-stat"><strong>{activeBus.stops.length}</strong><span>Total stops</span></div>
                    <div className="route-details-stat"><strong>{activeBus.totalDistance}</strong><span>Distance</span></div>
                    <div className="route-details-stat"><strong>{activeBus.totalTime}</strong><span>Est. time</span></div>
                  </div>
                  <h3 className="timeline-section-title">Route stops</h3>
                  <StopRows bus={activeBus} />
                  <button className="btn-secondary" onClick={() => setModal('stops')}>View Stops List</button>
                  <button className="btn-primary" onClick={() => trackBus(activeBus.id)}>Track {activeBus.number} Live</button>
                </div>
              </section>
            )}

            {screen === 'screen-profile' && (
              <section className="app-screen active has-bottom-nav" id="screen-profile">
                <ScreenHeader title="Profile" onBack={goBack} trailing={<button className="header-btn" aria-label="Settings" onClick={() => navigate('screen-settings')}>⚙</button>} />
                <div className="profile-hero-card"><div className="profile-avatar-circle"><img src={studentAvatar} alt="Student" /></div><h3 className="profile-name">Pranathi</h3><span className="profile-role-badge">Student • B.Tech</span></div>
                <div className="profile-info-list">
                  {[['Roll Number', '21CS101'], ['College', 'Ramachandra College of Engineering, Eluru (RCEE)'], ['Phone', '+91 98765 43210'], ['Email', 'gayatri@example.com']].map(([label, value]) => <div className="profile-info-row" key={label}><div className="profile-info-icon">•</div><div className="profile-info-texts"><span className="profile-info-label">{label}</span><span className="profile-info-val">{value}</span></div></div>)}
                </div>
                <BottomNav current={screen} navigate={navigate} />
              </section>
            )}

            {screen === 'screen-settings' && (
              <section className="app-screen active" id="screen-settings">
                <ScreenHeader title="Settings" onBack={goBack} />
                <div className="screen-content-padding">
                  <div className="settings-list-group">
                    {[
                      ['Notifications', 'Get alerts for your bus'],
                      ['Location', 'Enable location services'],
                      ['Language', 'English'],
                      ['Help & Support', 'FAQs, Contact us'],
                      ['About App', 'Version 1.0.0']
                    ].map(([title, description]) => <button className="settings-item-card" key={title} onClick={() => notify(`${title} updated`)}><span className="settings-item-left"><span className="settings-icon-box">•</span><span className="settings-texts"><strong>{title}</strong><small>{description}</small></span></span><span aria-hidden="true">›</span></button>)}
                  </div>
                  <button className="btn-logout" onClick={() => { notify('You have been logged out safely'); navigate('screen-welcome'); }}>Log Out</button>
                </div>
              </section>
            )}
          </div>

          {drawerOpen && (
            <aside className="side-drawer-backdrop active" id="side-drawer" onClick={(event) => { if (event.target === event.currentTarget) setDrawerOpen(false); }}>
              <nav className="side-drawer-panel" aria-label="Application menu">
                <div className="drawer-header"><strong>GoCampus</strong><button className="drawer-close-x" onClick={() => setDrawerOpen(false)} aria-label="Close menu">×</button></div>
                <div className="drawer-links-group">
                  {[[SCREEN_HOME, 'Home'], ['screen-tracking', 'Live Tracking'], ['screen-routes', 'Routes'], ['screen-trips', 'My Trips'], ['screen-profile', 'Profile'], ['screen-settings', 'Settings']].map(([target, label]) => <button className="drawer-link-btn" key={target} onClick={() => navigate(target)}>{label}</button>)}
                </div>
                <div className="drawer-bottom-actions">
                  <button className="btn-drawer-sos" onClick={() => { setDrawerOpen(false); notify('Campus Transport SOS Alert Triggered'); }}>Campus Transport SOS</button>
                  <button className="btn-drawer-logout" onClick={() => { setDrawerOpen(false); navigate('screen-login'); notify('You have been logged out safely'); }}>Log Out</button>
                </div>
              </nav>
            </aside>
          )}

          {modal && (
            <aside className="modal-bottom-sheet-backdrop active" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
              <section className="modal-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <header className="sheet-header-row"><h3 id="modal-title">{modal === 'notifications' ? 'Notifications' : `${activeBus.number} Route Stops`}</h3><button className="sheet-close-btn" onClick={() => setModal(null)} aria-label="Close dialog">×</button></header>
                {modal === 'notifications' ? <div className="sheet-content-scroll"><p>🚌 {trackedBus.number} is arriving in {trackedBus.eta}.</p><p>📍 Live campus route tracking is ready.</p></div> : <div className="sheet-content-scroll"><StopRows bus={activeBus} /></div>}
              </section>
            </aside>
          )}

        </div>
      </div>
    </main>
  );
}

export default App;
