import { Search, BookOpen, Monitor, Building2, UtensilsCrossed, Theater } from "lucide-react";
import { useState } from "react";

const chips = [
  { label: "Library", icon: BookOpen },
  { label: "Computer Lab", icon: Monitor },
  { label: "Admin Block", icon: Building2 },
  { label: "Canteen", icon: UtensilsCrossed },
  { label: "Auditorium", icon: Theater },
];

const HeroSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <section className="relative px-4 pt-12 pb-8 sm:pt-16 sm:pb-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
          Navigate LPU Campus
        </h1>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">
          Find classrooms, labs, and facilities instantly
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search classroom, lab, building, or facility..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm text-sm"
          />
        </div>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {chips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => setQuery(chip.label)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all hover-lift"
            >
              <chip.icon size={13} />
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
