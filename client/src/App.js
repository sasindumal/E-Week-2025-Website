import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import SkillStorm from "./pages/SkillStorm";
import Downloads from "./pages/Downloads";
import Gallery from "./pages/Gallery";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashBoard";
import NotFound from "./pages/NotFound";
import ManageEvents from "./pages/ManageEvents";
import EventForm from "./pages/EventForm";
// Context
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/skillstorm" element={<SkillStorm />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/admin/ManageEvents" element={<ManageEvents />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/EventForm" element={<EventForm />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
