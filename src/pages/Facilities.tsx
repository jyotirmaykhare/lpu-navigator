import { BookOpen, Monitor, UtensilsCrossed, Dumbbell, Building2, Theater, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const facilities = [
  { icon: BookOpen, name: "Library", desc: "Central library with 50,000+ books and digital resources", color: "text-primary" },
  { icon: Monitor, name: "Computer Labs", desc: "State-of-the-art labs with high-speed internet", color: "text-campus-green" },
  { icon: UtensilsCrossed, name: "Cafeteria", desc: "Multiple food courts and dining options across campus", color: "text-campus-yellow" },
  { icon: Dumbbell, name: "Sports Complex", desc: "Olympic-size pool, gym, and indoor sports facilities", color: "text-campus-red" },
  { icon: Building2, name: "Admin Block", desc: "Registrar, admissions, and administrative offices", color: "text-muted-foreground" },
  { icon: Theater, name: "Auditorium", desc: "Shanti Devi Mittal Auditorium for events and seminars", color: "text-primary" },
];

const Facilities = () => (
  <main className="min-h-screen px-4 py-8 sm:py-12">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Campus Facilities</h1>
      <p className="text-sm text-muted-foreground mb-8">Explore everything LPU campus has to offer</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map((f) => (
          <div key={f.name} className="glass-card p-5 hover-lift group cursor-pointer">
            <div className={`mb-3 ${f.color}`}>
              <f.icon size={28} />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">{f.name}</h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{f.desc}</p>
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <MapPin size={12} />
              View on Map
            </Link>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default Facilities;
