
import React, { useState } from "react";
import CampusMap from "@/components/CampusMap";
import ARCampus3D from "@/components/ARCampus3D";
import MapCluster from "@/components/MapCluster";
import { Search } from "lucide-react";



const ROUTE_HISTORY_KEY = "lpu_route_history";

const MapPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stops, setStops] = useState<string[]>([]); // for waypoints
  const [showRoute, setShowRoute] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [routeHistory, setRouteHistory] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem(ROUTE_HISTORY_KEY) || "[]");
      } catch {
        return [];
      }
    }
    return [];
  });

  const saveRouteToHistory = (fromVal, toVal, stopsVal) => {
    if (!fromVal || !toVal) return;
    const newRoute = { from: fromVal, to: toVal, stops: stopsVal };
    setRouteHistory((prev) => {
      const filtered = prev.filter(r => !(r.from === fromVal && r.to === toVal && JSON.stringify(r.stops) === JSON.stringify(stopsVal)));
      const updated = [newRoute, ...filtered].slice(0, 5); // max 5
      localStorage.setItem(ROUTE_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Fetch campus locations from backend
  React.useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/locations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch locations");
        return res.json();
      })
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load campus locations");
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-1">Campus Map</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Explore buildings, find routes, and check crowd density
        </p>

        {/* Highlighted Smart Route Finder */}
        {/* Route history quick chips */}
        {routeHistory.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {routeHistory.map((route, idx) => (
              <button
                key={idx}
                type="button"
                className="px-3 py-1 rounded-full border text-xs font-medium bg-fuchsia-50 dark:bg-zinc-800 border-fuchsia-200 dark:border-zinc-700 text-fuchsia-700 dark:text-fuchsia-200 hover:text-foreground hover:border-primary/40 transition-all"
                onClick={() => {
                  setFrom(route.from);
                  setTo(route.to);
                  setStops(route.stops || []);
                  setShowRoute(true);
                }}
                title={`From: ${route.from} To: ${route.to}${route.stops && route.stops.length ? ' Stops: ' + route.stops.join(', ') : ''}`}
              >
                {route.from} → {route.to}{route.stops && route.stops.length ? ` (${route.stops.length} stops)` : ""}
              </button>
            ))}
          </div>
        )}

        <form
          className="relative mb-8"
          onSubmit={e => {
            e.preventDefault();
            setShowRoute(true);
            saveRouteToHistory(from, to, stops);
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 rounded-2xl blur opacity-60 animate-pulse z-0" />
          <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row gap-4 border-2 border-primary/30">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-semibold text-primary flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                From
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <select
                  value={from}
                  onChange={e => {
                    setFrom(e.target.value);
                    if (liveUpdate) setShowRoute(true);
                  }}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-blue-50 dark:bg-zinc-800 border-2 border-blue-200 dark:border-zinc-700 text-base text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition"
                >
                  <option value="">Select starting location</option>
                  <option value="__my_location__">My Location (GPS)</option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : error ? (
                    <option disabled>{error}</option>
                  ) : (
                    locations.map((loc) => (
                      <option key={loc.name} value={loc.name}>{loc.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-semibold text-pink-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                To
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                <select
                  value={to}
                  onChange={e => {
                    setTo(e.target.value);
                    if (liveUpdate) setShowRoute(true);
                  }}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-pink-50 dark:bg-zinc-800 border-2 border-pink-200 dark:border-zinc-700 text-base text-pink-900 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400/40 transition"
                >
                  <option value="">Select destination</option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : error ? (
                    <option disabled>{error}</option>
                  ) : (
                    locations.map((loc) => (
                      <option key={loc.name} value={loc.name}>{loc.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
                        {/* Waypoints UI */}
                        <div className="flex-1 flex flex-col gap-2">
                          <label className="text-xs font-semibold text-fuchsia-600 flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                            Stops (optional)
                          </label>
                          {stops.map((stop, idx) => (
                            <div className="relative flex items-center gap-2 mb-1" key={idx}>
                              <select
                                value={stop}
                                onChange={e => {
                                  const newStops = [...stops];
                                  newStops[idx] = e.target.value;
                                  setStops(newStops);
                                  if (liveUpdate) setShowRoute(true);
                                }}
                                className="w-full pl-10 pr-3 py-3 rounded-lg bg-fuchsia-50 dark:bg-zinc-800 border-2 border-fuchsia-200 dark:border-zinc-700 text-base text-fuchsia-900 dark:text-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40 transition"
                              >
                                <option value="">Select stop</option>
                                {loading ? (
                                  <option>Loading...</option>
                                ) : error ? (
                                  <option disabled>{error}</option>
                                ) : (
                                  locations.map((loc) => (
                                    <option key={loc.name} value={loc.name}>{loc.name}</option>
                                  ))
                                )}
                              </select>
                              <button type="button" className="text-xs text-red-500 hover:underline" onClick={() => {
                                setStops(stops.filter((_, i) => i !== idx));
                              }}>Remove</button>
                            </div>
                          ))}
                          <button type="button" className="text-xs text-fuchsia-700 hover:underline mt-1" onClick={() => setStops([...stops, ""])}>+ Add Stop</button>
                        </div>
            <div className="flex flex-col items-end gap-2 justify-end">
              <label className="flex items-center gap-2 text-xs font-semibold text-fuchsia-600 mb-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={liveUpdate}
                  onChange={e => setLiveUpdate(e.target.checked)}
                  className="accent-fuchsia-500 w-4 h-4 rounded"
                />
                Live Update
              </label>
              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 text-white text-base font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/30 animate-gradient-x"
              >
                <span className="drop-shadow">Find Smart Route</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* AR/3D Campus View */}
      <ARCampus3D />
      <CampusMap from={showRoute ? from : ""} to={showRoute ? to : ""} stops={stops} locations={locations} />
      {/* Clustered map demo below */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">All Campus Locations (Clustered)</h2>
        <MapCluster locations={locations} />
      </div>
    </main>
  );
};

export default MapPage;
