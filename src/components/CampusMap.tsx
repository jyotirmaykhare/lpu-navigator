import { useState } from "react";
import { MapPin, Navigation, Accessibility, Flame, X, Bath, UtensilsCrossed, Landmark, BookOpen } from "lucide-react";

interface Building {
  id: string;
  name: string;
  x: number;
  y: number;
  rooms: string[];
  type: "academic" | "facility" | "admin";
}

const buildings: Building[] = [
  { id: "1", name: "Block 34", x: 20, y: 25, rooms: ["Room A201", "Room A202", "Room A203", "Lab L1"], type: "academic" },
  { id: "2", name: "Block 32", x: 45, y: 18, rooms: ["Room B101", "Room B102", "Computer Lab"], type: "academic" },
  { id: "3", name: "Central Library", x: 65, y: 35, rooms: ["Reading Hall", "Digital Section", "Discussion Room"], type: "facility" },
  { id: "4", name: "Admin Block", x: 30, y: 55, rooms: ["Registrar Office", "Dean Office"], type: "admin" },
  { id: "5", name: "UniMall", x: 55, y: 65, rooms: ["Food Court", "Domino's", "Café Coffee Day"], type: "facility" },
  { id: "6", name: "Shanti Devi Mittal Auditorium", x: 78, y: 55, rooms: ["Main Hall", "Green Room"], type: "facility" },
  { id: "7", name: "Block 38", x: 15, y: 70, rooms: ["Room C301", "Room C302", "Physics Lab"], type: "academic" },
  { id: "8", name: "Sports Complex", x: 80, y: 20, rooms: ["Gym", "Swimming Pool", "Indoor Court"], type: "facility" },
];

const quickTools = [
  { icon: Bath, label: "Washroom" },
  { icon: UtensilsCrossed, label: "Canteen" },
  { icon: Landmark, label: "ATM" },
  { icon: BookOpen, label: "Library" },
];

const CampusMap = () => {
  const [selected, setSelected] = useState<Building | null>(null);
  const [heatmap, setHeatmap] = useState(false);
  const [accessibility, setAccessibility] = useState(false);

  const heatColors = ["bg-campus-green/30", "bg-campus-yellow/30", "bg-campus-red/30"];

  return (
    <section className="px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Map */}
          <div className="flex-1 relative glass-card overflow-hidden" style={{ minHeight: 420 }}>
            {/* Map header */}
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              <button
                onClick={() => setHeatmap(!heatmap)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  heatmap ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Flame size={13} />
                Crowd Heatmap
              </button>
              <button
                onClick={() => setAccessibility(!accessibility)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  accessibility ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Accessibility size={13} />
                Accessible Routes
              </button>
            </div>

            {/* Simulated map grid */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />

            {/* Roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 10 40 L 90 40" stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" strokeDasharray={accessibility ? "3,2" : "none"} />
              <path d="M 50 10 L 50 90" stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" />
              <path d="M 10 70 L 90 70" stroke="hsl(var(--border))" strokeWidth="1" fill="none" opacity="0.5" />
              <path d="M 25 10 L 25 90" stroke="hsl(var(--border))" strokeWidth="1" fill="none" opacity="0.5" />
              {accessibility && (
                <path d="M 15 42 L 85 42" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" strokeDasharray="2,1.5" opacity="0.6" />
              )}
            </svg>

            {/* Heatmap blobs */}
            {heatmap && buildings.map((b, i) => (
              <div
                key={`heat-${b.id}`}
                className={`absolute rounded-full ${heatColors[i % 3]} blur-xl pointer-events-none`}
                style={{
                  left: `${b.x - 6}%`,
                  top: `${b.y - 6}%`,
                  width: "12%",
                  height: "12%",
                }}
              />
            ))}

            {/* Building markers */}
            {buildings.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(b)}
                className={`absolute z-10 flex flex-col items-center group transition-transform hover:scale-110 ${
                  selected?.id === b.id ? "scale-110" : ""
                }`}
                style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -100%)" }}
              >
                <MapPin
                  size={24}
                  className={`drop-shadow-md transition-colors ${
                    selected?.id === b.id ? "text-primary fill-primary/20" : "text-primary/70"
                  }`}
                  fill={selected?.id === b.id ? "hsl(var(--primary) / 0.2)" : "none"}
                />
                <span className="text-[9px] font-medium text-foreground bg-card/90 px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap shadow-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  {b.name}
                </span>
              </button>
            ))}

            {/* Heatmap legend */}
            {heatmap && (
              <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-campus-green" /> Low</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-campus-yellow" /> Medium</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-campus-red" /> High</span>
              </div>
            )}

            {/* Selected building card */}
            {selected && (
              <div className="absolute bottom-3 right-3 z-20 bg-card border border-border rounded-xl shadow-lg p-4 w-64 animate-fade-in">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{selected.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{selected.type}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-1 mb-3">
                  {selected.rooms.map((r) => (
                    <p key={r} className="text-xs text-muted-foreground">• {r}</p>
                  ))}
                </div>
                <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                  <Navigation size={13} />
                  Navigate
                </button>
              </div>
            )}
          </div>

          {/* Quick Tools */}
          <div className="lg:w-16 flex lg:flex-col gap-2 justify-center">
            {quickTools.map((t) => (
              <button
                key={t.label}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group"
                title={`Find nearest ${t.label}`}
              >
                <t.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[9px] text-muted-foreground group-hover:text-foreground transition-colors hidden lg:block">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusMap;
