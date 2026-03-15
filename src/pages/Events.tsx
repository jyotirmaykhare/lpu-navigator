import { Calendar, MapPin, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const tagColors: Record<string, string> = {
  Tech: "bg-primary/10 text-primary",
  Cultural: "bg-campus-yellow/15 text-campus-yellow",
  Workshop: "bg-campus-green/15 text-campus-green",
  Sports: "bg-campus-red/15 text-campus-red",
  Career: "bg-muted text-muted-foreground",
};

const Events = () => {
  const [events, setEvents] = useState<Array<{ id?: number; name?: string; title?: string; date: string; description?: string; location?: string; tag?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load events");
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-1">Campus Events</h1>
        <p className="text-sm text-muted-foreground mb-8">Upcoming events and activities at LPU</p>

        {loading && <p className="text-sm text-muted-foreground">Loading events...</p>}
        {error && !loading && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((e) => {
              const title = e.title || e.name || "Event";
              const tag = e.tag || "Career";
              const location = e.location || e.description || "";
              return (
                <div key={e.id ?? title} className="glass-card p-5 hover-lift group">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${tagColors[tag] || tagColors.Career}`}>
                    {tag}
                  </span>
                  <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Calendar size={12} /> {e.date}
                    </p>
                    {location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <MapPin size={12} /> {location}
                      </p>
                    )}
                  </div>
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <Navigation size={12} />
                    Navigate to Event
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

export default Events;
