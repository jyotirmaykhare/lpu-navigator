import HeroSearch from "@/components/HeroSearch";
import SmartSuggestions from "@/components/SmartSuggestions";
import CampusMap from "@/components/CampusMap";
import { useState } from "react";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <main className="min-h-screen">
      <HeroSearch setSearchLocation={setSearchLocation} />
      <SmartSuggestions />
      <CampusMap from="" to={searchLocation} />

    </main>
  );
};

export default Index;
