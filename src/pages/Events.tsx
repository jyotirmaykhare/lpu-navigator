import { Calendar, MapPin, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  { title: "Smart India Hackathon", date: "March 15, 2026", location: "Block 34, Lab L1", tag: "Tech" },
  { title: "TechFest 2026", date: "March 20-22, 2026", location: "Shanti Devi Mittal Auditorium", tag: "Tech" },
  { title: "Cultural Night", date: "March 25, 2026", location: "Baldev Raj Mittal Uni Mall", tag: "Cultural" },
  { title: "AI/ML Workshop", date: "March 18, 2026", location: "Block 32, Computer Lab", tag: "Workshop" },
  { title: "Sports Day", date: "March 28, 2026", location: "Sports Complex", tag: "Sports" },
  { title: "Career Fair", date: "April 2, 2026", location: "Admin Block Lawn", tag: "Career" },
];

const tagColors: Record<string, string> = {
  Tech: "bg-primary/10 text-primary",
  Cultural: "bg-campus-yellow/15 text-campus-yellow",
  Workshop: "bg-campus-green/15 text-campus-green",
  Sports: "bg-campus-red/15 text-campus-red",
  Career: "bg-muted text-muted-foreground",
};

const Events = () => (
  <main className="min-h-screen px-4 py-8 sm:py-12">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Campus Events</h1>
      <p className="text-sm text-muted-foreground mb-8">Upcoming events and activities at LPU</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e) => (
          <div key={e.title} className="glass-card p-5 hover-lift group">
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${tagColors[e.tag] || tagColors.Career}`}>
              {e.tag}
            </span>
            <h3 className="text-base font-semibold text-foreground mb-2">{e.title}</h3>
            <div className="space-y-1.5 mb-4">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Calendar size={12} /> {e.date}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin size={12} /> {e.location}
              </p>
            </div>
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Navigation size={12} />
              Navigate to Event
            </Link>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default Events;
