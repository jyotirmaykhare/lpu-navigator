
import SmartSuggestions from "@/components/SmartSuggestions";
import CampusMap from "@/components/CampusMap";
import { campusLocations } from "@/data/campusLocations";
import { useState } from "react";


const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <main className="min-h-screen flex flex-col gap-8 md:gap-12 py-6 md:py-12 animate-fadein">
      <section className="glass-card hover-lift p-4 md:p-8 w-full max-w-3xl mx-auto animate-fadein">
        <SmartSuggestions />
      </section>
      <section className="glass-card hover-lift p-2 md:p-4 w-full max-w-5xl mx-auto animate-fadein">
        <CampusMap from="" to={searchLocation} locations={campusLocations} />
      </section>
    </main>
  );
};

export default Index;
