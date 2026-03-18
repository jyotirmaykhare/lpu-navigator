import { BookOpen, Monitor, UtensilsCrossed, Dumbbell, Building2, Theater, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type FacilityIconKey = "library" | "labs" | "cafeteria" | "sports" | "admin" | "auditorium";

const iconMap: Record<FacilityIconKey, React.ComponentType<{ size?: number }>> = {
  library: BookOpen,
  labs: Monitor,
  cafeteria: UtensilsCrossed,
  sports: Dumbbell,
  admin: Building2,
  auditorium: Theater,
};

const Facilities = () => {
  const [facilities, setFacilities] = useState<Array<{ id?: number; name: string; description: string; icon?: FacilityIconKey }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/facilities")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load facilities");
        return res.json();
      })
      .then((data) => {
        setFacilities(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load facilities");
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-1">Campus Facilities</h1>
        <p className="text-sm text-muted-foreground mb-8">Explore everything LPU campus has to offer</p>

        {loading && <p className="text-sm text-muted-foreground">Loading facilities...</p>}
        {error && !loading && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f) => {
              const Icon = (f.icon && iconMap[f.icon]) || BookOpen;
              return (
                <div key={f.id ?? f.name} className="glass-card p-5 hover-lift group cursor-pointer">
                  <div className="mb-3 text-primary">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{f.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{f.description}</p>
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <MapPin size={12} />
                    View on Map
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Facilities;
