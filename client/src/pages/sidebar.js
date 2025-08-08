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
    <aside style={{ width: "240px", backgroundColor: "#fbf8f8ff", padding: "1rem" }}>
      <h2 style={{ marginBottom: "2rem", color: "red" }}>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "1rem" }}>
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  color: location.pathname === item.path ? "#000" : "#555",
                  fontWeight: location.pathname === item.path ? "bold" : "normal",
                }}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.75rem",
                      marginLeft: "auto",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
