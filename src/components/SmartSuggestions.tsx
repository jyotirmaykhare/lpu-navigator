import { GraduationCap, BookOpen, Coffee, ArrowRight } from "lucide-react";

const suggestions = [
  {
    icon: GraduationCap,
    title: "Next Class",
    subtitle: "Room A203",
    detail: "Data Structures — in 25 min",
    color: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Nearest Study Space",
    subtitle: "Central Library",
    detail: "2 min walk • Low crowd",
    color: "text-campus-green",
  },
  {
    icon: Coffee,
    title: "Cafeteria Open Now",
    subtitle: "UniMall Food Court",
    detail: "Open until 9 PM",
    color: "text-campus-yellow",
  },
];

const SmartSuggestions = () => (
  <section className="px-4 pb-8">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Smart Suggestions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {suggestions.map((s) => (
          <div
            key={s.title}
            className="glass-card p-4 flex items-start gap-3 hover-lift cursor-pointer group"
          >
            <div className={`mt-0.5 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{s.title}</p>
              <p className="text-sm font-semibold text-foreground">{s.subtitle}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.detail}</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SmartSuggestions;
