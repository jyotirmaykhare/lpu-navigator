import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, useMapEvents } from "react-leaflet";
import React, { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Vite fix: ensure routing plugin attaches to Leaflet




function MapRoute({ from, to, locations }: { from: string; to: string; locations: CampusMapProps["locations"] }) {
  const map = useMap();
  const [userLocation, setUserLocation] = React.useState<[number, number] | null>(null);
  React.useEffect(() => {
    let start;
    if (from === "__my_location__") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        });
      }
      if (userLocation) {
        start = { name: "My Location", position: userLocation };
      }
    } else {
      start = locations.find((loc) =>
        loc.name.toLowerCase().includes(from.toLowerCase())
      );
    }
    const end = locations.find((loc) =>
      loc.name.toLowerCase().includes(to.toLowerCase())
    );
    if (!start || !end) return;
    const startIcon = L.divIcon({
      className: "start-marker-icon",
      html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;animation:bounce 1.2s infinite alternate"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#2563eb' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>A</text></svg></div>`
    });
    const endIcon = L.divIcon({
      className: "end-marker-icon",
      html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;animation:bounce 1.2s 0.5s infinite alternate"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#a21caf' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>B</text></svg></div>`
    });
    // @ts-expect-error: Leaflet Routing Machine types not available
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.position[0], start.position[1]),
        L.latLng(end.position[0], end.position[1]),
      ],
      // @ts-expect-error: Leaflet Routing Machine types not available
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      lineOptions: {
        styles: [
          { color: "#fff", weight: 14, opacity: 0.7 },
          { color: "#a21caf", weight: 10, opacity: 0.9, dashArray: '12,8', className: 'route-glow' },
          { color: "#2563eb", weight: 6, opacity: 1 },
          { color: "#f472b6", weight: 2, opacity: 1, dashArray: '4,8' },
        ],
      },
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: (i, wp) => {
        if (i === 0) {
          return L.marker(wp.latLng, { icon: startIcon });
        } else if (i === 1) {
          return L.marker(wp.latLng, { icon: endIcon });
        }
        return null;
      },
    }).addTo(map);
    return () => {
      map.removeControl(routingControl);
    };
  }, [from, to, map, locations, userLocation]);
  return null;
}
// Add marker bounce animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-16px); }
}
`;
if (!document.head.querySelector('style[data-marker-bounce]')) {
  style.setAttribute('data-marker-bounce', '');
  document.head.appendChild(style);
}




function MapFlyTo({ destination, locations }: { destination: string; locations: CampusMapProps["locations"] }) {
  const map = useMap();
  React.useEffect(() => {
    if (!destination) return;
    const location = locations.find((loc) =>
      loc.name.toLowerCase().includes(destination.toLowerCase())
    );
    if (location) {
      map.flyTo(location.position, 18);
    }
  }, [destination, map, locations]);
  return null;
}

type CampusMapProps = {
  from: string;
  to: string;
  locations: Array<{
    name: string;
    position: [number, number];
    image?: string;
    type?: string; // e.g., 'gate', 'hostel', 'academic', etc.
  }>;
  liveLocations?: Array<{
    id: number;
    name: string;
    position: [number, number];
  }>;
};

// Fix marker icon issue in Vite
// @ts-expect-error: Vite/Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center: [number, number] = [31.2536, 75.7033];



const CampusMap = ({ from, to, locations, liveLocations = [] }: CampusMapProps) => {
  const [directions, setDirections] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [startPos, setStartPos] = useState<[number, number] | null>(null);
  const [endPos, setEndPos] = useState<[number, number] | null>(null);

  // Get real-time user location
  React.useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Custom MapRoute with directions callback
  function MapRouteWithDirections({ from, to, onDirections, locations }: { from: string; to: string; onDirections: (steps: string[]) => void; locations: CampusMapProps["locations"] }) {
    const map = useMap();
    const start = startPos || locations.find((loc) => loc.name.toLowerCase().includes(from.toLowerCase()))?.position;
    const end = endPos || locations.find((loc) => loc.name.toLowerCase().includes(to.toLowerCase()))?.position;

    React.useEffect(() => {
      if (!from || !to || !start || !end) return;

      const startIcon = L.divIcon({
        className: "start-marker-icon",
        html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;animation:bounce 1.2s infinite alternate"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#2563eb' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>A</text></svg></div>`
      });
      const endIcon = L.divIcon({
        className: "end-marker-icon",
        html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;animation:bounce 1.2s 0.5s infinite alternate"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#a21caf' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>B</text></svg></div>`
      });

      // @ts-expect-error: Leaflet Routing Machine types not available
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1]),
        ],
        // @ts-expect-error: Leaflet Routing Machine types not available
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
        lineOptions: {
          styles: [
            { color: "#fff", weight: 14, opacity: 0.7 },
            { color: "#a21caf", weight: 10, opacity: 0.9, dashArray: '12,8', className: 'route-glow' },
            { color: "#2563eb", weight: 6, opacity: 1 },
            { color: "#f472b6", weight: 2, opacity: 1, dashArray: '4,8' },
          ],
        },
        routeWhileDragging: true,
        addWaypoints: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: (i, wp, nWps) => {
          if (i === 0) {
            return L.marker(wp.latLng, { icon: startIcon, draggable: true })
              .on('dragend', (e) => {
                setStartPos([e.target.getLatLng().lat, e.target.getLatLng().lng]);
              });
          } else if (i === nWps - 1) {
            return L.marker(wp.latLng, { icon: endIcon, draggable: true })
              .on('dragend', (e) => {
                setEndPos([e.target.getLatLng().lat, e.target.getLatLng().lng]);
              });
          } else {
            // Allow intermediate waypoints to be draggable for more interactivity
            return L.marker(wp.latLng, { draggable: true })
              .on('dragend', (e) => {
                // Optionally handle intermediate waypoint drag
              });
          }
          return null;
        },
      })
        .on('routesfound', function(e) {
          const steps: string[] = [];
          if (e.routes && e.routes[0] && e.routes[0].instructions) {
            steps.push(e.routes[0].summary && e.routes[0].summary.totalDistance ? `Total distance: ${e.routes[0].summary.totalDistance}m` : '');
          }
          if (e.routes && e.routes[0] && e.routes[0].instructions && e.routes[0].instructions.length) {
            e.routes[0].instructions.forEach((inst) => {
              steps.push(inst.text);
            });
          } else if (e.routes && e.routes[0] && e.routes[0].segments && e.routes[0].segments.length) {
            e.routes[0].segments.forEach((seg) => {
              if (seg.steps) {
                seg.steps.forEach((step) => steps.push(step.instruction));
              }
            });
          }
          onDirections(steps);
        })
        .addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }, [from, to, start, end, map, onDirections]);

    return null;
  }

  // Custom icon logic for location types
  const getLocationIcon = (type?: string) => {
    switch (type) {
      case 'gate':
        return L.divIcon({
          className: 'custom-marker-icon gate',
          html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg width='28' height='28' viewBox='0 0 28 28'><rect x='4' y='8' width='20' height='12' rx='4' fill='#f59e42' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>G</text></svg></div>`
        });
      case 'hostel':
        return L.divIcon({
          className: 'custom-marker-icon hostel',
          html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg width='28' height='28' viewBox='0 0 28 28'><rect x='4' y='8' width='20' height='12' rx='4' fill='#f472b6' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>H</text></svg></div>`
        });
      case 'academic':
        return L.divIcon({
          className: 'custom-marker-icon academic',
          html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg width='28' height='28' viewBox='0 0 28 28'><rect x='4' y='8' width='20' height='12' rx='4' fill='#2563eb' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>A</text></svg></div>`
        });
      case 'canteen':
        return L.divIcon({
          className: 'custom-marker-icon canteen',
          html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#22c55e' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>C</text></svg></div>`
        });
      case 'sports':
        return L.divIcon({
          className: 'custom-marker-icon sports',
          html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#fbbf24' stroke='#fff' stroke-width='3'/><text x='14' y='19' text-anchor='middle' font-size='14' fill='#fff' font-family='Arial' font-weight='bold'>S</text></svg></div>`
        });
      default:
        return L.divIcon({
          className: 'custom-marker-icon default',
          html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12' fill='#6366f1' stroke='#fff' stroke-width='3'/></svg></div>`
        });
    }
  };

  return (
    <div className="px-4 pb-8 relative">
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%", borderRadius: "18px", boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        className="overflow-hidden"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyTo destination={to} locations={locations} />
        {from && to ? <MapRouteWithDirections from={from} to={to} onDirections={setDirections} locations={locations} /> : <MapRoute from={from} to={to} locations={locations} />}
        {/* Real-time user location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={L.divIcon({
            className: "user-location-icon",
            html: `<div style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;animation:pulse 1.2s infinite alternate"><svg width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='#22d3ee' stroke='#fff' stroke-width='3'/></svg></div>`
          })}>
            <Tooltip direction="top" offset={[0, -18]} permanent>Your Location</Tooltip>
          </Marker>
        )}

        {(Array.isArray(locations) ? locations : []).map((location, index) => (
          <Marker key={index} position={location.position} icon={getLocationIcon(location.type)}>
            <Tooltip direction="top" offset={[0, -18]}>{location.name}</Tooltip>
            {location.image && (
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <img src={location.image} alt={location.name} style={{ maxWidth: 180, borderRadius: 8, marginBottom: 8 }} />
                  <div>{location.name}</div>
                </div>
              </Popup>
            )}
          </Marker>
        ))}

        {/* Live moving locations (e.g., shuttles/crowd) */}
        {Array.isArray(liveLocations) &&
          liveLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.position}
              icon={L.divIcon({
                className: "live-location-icon",
                html: `<div style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;animation:pulse 1s infinite alternate"><svg width='18' height='18' viewBox='0 0 24 24'><circle cx='12' cy='12' r='8' fill='#f97316' stroke='#fff' stroke-width='2'/></svg></div>`,
              })}
            >
              <Tooltip direction="top" offset={[0, -12]}>
                Live: {loc.name}
              </Tooltip>
            </Marker>
          ))}

        {/* Floating glassy control panel */}
        <div
          className="absolute top-6 right-6 z-[1000] bg-white/80 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 backdrop-blur-lg rounded-2xl shadow-2xl border border-fuchsia-200 dark:border-fuchsia-900 p-5 flex flex-col gap-3 min-w-[260px] max-w-[340px] animate-fade-in transition-all duration-500 ease-out hover:scale-105 hover:shadow-fuchsia-400/30 focus-within:ring-4 focus-within:ring-fuchsia-400/40"
          tabIndex={0}
          aria-label="Route information panel"
          role="region"
        >
          <div className="flex items-center gap-2 mb-1" aria-label="Route Info Header">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="animate-bounce"><path d="M12 2v20m0 0l-4-4m4 4l4-4" stroke="#a21caf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-bold text-fuchsia-700 dark:text-fuchsia-200 text-base drop-shadow">Route Info</span>
          </div>
          {userLocation && (
            <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-100 animate-fade-in" aria-label="User Location">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22d3ee" stroke="#fff" strokeWidth="2"/></svg>
              <span>Your Location: <span className="font-semibold" tabIndex={0}>{userLocation[0].toFixed(5)}, {userLocation[1].toFixed(5)}</span></span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-100 animate-fade-in" aria-label="Waypoint Drag Info">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2563eb" stroke="#fff" strokeWidth="2"/></svg>
            <span>Drag <b>Start</b> or <b>End</b> markers to adjust route</span>
          </div>
          {directions.length > 0 && (
            <div className="mt-2 animate-fade-in" aria-label="Step-by-step Directions">
              <div className="font-semibold text-xs text-fuchsia-700 dark:text-fuchsia-200 mb-1">Directions:</div>
              <ol className="list-decimal ml-5 text-xs text-zinc-900 dark:text-zinc-50 space-y-1" tabIndex={0} aria-label="Directions List">
                {directions.map((step, i) => (
                  <li key={i} className="focus:bg-fuchsia-100 dark:focus:bg-fuchsia-900/40 outline-none rounded px-1 py-0.5" tabIndex={0}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </MapContainer>
    </div>
  );

// Add fade-in and glassy panel animation (outside component)
if (typeof document !== 'undefined' && !document.head.querySelector('style[data-fade-in]')) {
  const style2 = document.createElement('style');
  style2.innerHTML = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
  `;
  style2.setAttribute('data-fade-in', '');
  document.head.appendChild(style2);
}
};

export default CampusMap;
