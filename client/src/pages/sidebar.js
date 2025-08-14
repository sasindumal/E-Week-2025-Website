import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Zap,
  Trophy,
  Users,
  Image,
  History,
  Shield,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ activeEvents = 0 }) => {
  const location = useLocation();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin",
      badge: null,
    },
    {
      id: "events",
      label: "Events",
      icon: <Calendar className="w-5 h-5" />,
      path: "/admin/ManageEvents",
      badge: activeEvents,
    },
    {
      id: "skillstorm",
      label: "SkillStorm",
      icon: <Zap className="w-5 h-5" />,
      path: "/admin/skillstorm",
      badge: null,
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <Trophy className="w-5 h-5" />,
      path: "/admin/leaderboard",
      badge: null,
    },
    {
      id: "participants",
      label: "Participants",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/participants",
      badge: null,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: <Image className="w-5 h-5" />,
      path: "/admin/gallery",
      badge: null,
    },
    {
      id: "history",
      label: "History",
      icon: <History className="w-5 h-5" />,
      path: "/admin/history",
      badge: null,
    },
    {
      id: "admins",
      label: "Admin Users",
      icon: <Shield className="w-5 h-5" />,
      path: "/admin/admins",
      badge: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
      badge: null,
    },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "240px",
        height: "100vh",
        background: "linear-gradient(180deg, #1a1a2e, #16213e)",
        paddingTop: "1.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        overflowY: "auto",
        boxShadow: "2px 0 8px rgba(0,0,0,0.7)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          color: "#e6b89c",
          fontWeight: "700",
          fontSize: "1.25rem",
          marginBottom: "2rem",
          paddingLeft: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          userSelect: "none",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <Shield size={24} strokeWidth={1.5} />
        <span>E-Week <strong>Admin</strong></span>
      </div>
      <nav style={{ flexGrow: 1 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: isActive ? "#f0c5b8" : "#b0b0b8",
                    backgroundColor: isActive ? "rgba(224, 141, 115, 0.15)" : "transparent",
                    border: isActive ? "1px solid #e08b73" : "none",
                    fontWeight: isActive ? "600" : "400",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {React.cloneElement(item.icon, {
                    color: isActive ? "#f0c5b8" : "#b0b0b8",
                    size: 20,
                    strokeWidth: 1.5,
                  })}
                  <span style={{ flexGrow: 1 }}>{item.label}</span>
                  {item.badge !== null && item.badge > 0 && (
                    <span
                      style={{
                        backgroundColor: "#f44336",
                        color: "#fff",
                        borderRadius: "50%",
                        padding: "0.2rem 0.6rem",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        minWidth: "20px",
                        textAlign: "center",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
