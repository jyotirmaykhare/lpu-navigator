import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";


import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import Facilities from "./pages/Facilities";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Issues from "./pages/Issues";

const App = () => {
  useRealTimeEventNotifications();
  useNotificationPolling();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/social" element={<SocialDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

            <Route path="/map" element={<MapPage />} />
