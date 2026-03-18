// INTENTIONAL CHANGE: This line was added to test git commit and push functionality.
// [SYNC TEST] This comment was added to verify commit and push functionality on 2026-03-17
// Project synced and API paths updated to Railway backend
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
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => {
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
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/social" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
