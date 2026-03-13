import CampusMap from "@/components/CampusMap";
import { Search } from "lucide-react";
import { useState } from "react";

const MapPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-1">Campus Map</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Explore buildings, find routes, and check crowd density
        </p>

        {/* Route planner */}
        <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From: Your location"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To: Destination"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
            Find Route
          </button>
        </div>
      </div>
      <CampusMap />
    </main>
  );
};

export default MapPage;
