import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Trophy,
  Users,
  Image,
  History,
  Download,
  Settings,
  FileText,
  BarChart3,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Upload,
  Star,
  TrendingUp,
  Activity,
  Clock,
  Globe,
  Shield,
  Bell,
  LogOut,
  Menu,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // In real app, check auth
  const location = useLocation();

  // Mock admin data - in real app, fetch from API
  const [adminData, setAdminData] = useState({
    stats: {
      totalEvents: 125,
      activeEvents: 8,
      totalParticipants: 5400,
      totalSponsors: 50,
      galleryImages: 2840,
      pendingApprovals: 12,
    },
    recentActivity: [
      {
        id: 1,
        action: "Event Created",
        item: "AI Hackathon 2025",
        time: "2 hours ago",
        user: "Admin",
      },
      {
        id: 2,
        action: "Sponsor Added",
        item: "TechCorp Solutions",
        time: "4 hours ago",
        user: "Admin",
      },
      {
        id: 3,
        action: "Gallery Updated",
        item: "E-Week 2024 Highlights",
        time: "6 hours ago",
        user: "Admin",
      },
      {
        id: 4,
        action: "Leaderboard Updated",
        item: "Programming Contest",
        time: "1 day ago",
        user: "Admin",
      },
    ],
  });

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin",
    },
    {
      id: "events",
      label: "Events",
      icon: <Calendar className="w-5 h-5" />,
      path: "/admin/events",
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <Trophy className="w-5 h-5" />,
      path: "/admin/leaderboard",
    },
    {
      id: "participants",
      label: "Participants",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/participants",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: <Image className="w-5 h-5" />,
      path: "/admin/gallery",
    },
    {
      id: "history",
      label: "History",
      icon: <History className="w-5 h-5" />,
      path: "/admin/history",
    },
    {
      id: "downloads",
      label: "Downloads",
      icon: <Download className="w-5 h-5" />,
      path: "/admin/downloads",
    },
    {
      id: "content",
      label: "Content",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/content",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/admin/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <Shield className="w-8 h-8" />
            <span className={`logo-text ${!sidebarOpen ? "hidden" : ""}`}>
              E-Week Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.icon}
              <span className={`nav-label ${!sidebarOpen ? "hidden" : ""}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut className="w-5 h-5" />
            <span className={`nav-label ${!sidebarOpen ? "hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`admin-main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <AdminDashboard
                stats={adminData.stats}
                recentActivity={adminData.recentActivity}
              />
            }
          />
          <Route path="/events" element={<AdminEvents />} />
          <Route path="/leaderboard" element={<AdminLeaderboard />} />
          <Route path="/participants" element={<AdminParticipants />} />
          <Route path="/gallery" element={<AdminGallery />} />
          <Route path="/history" element={<AdminHistory />} />
          <Route path="/downloads" element={<AdminDownloads />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
};

// Dashboard Component
const AdminDashboard = ({ stats, recentActivity }) => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-actions">
          <button className="action-btn primary">
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
          <button className="action-btn secondary">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon events">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <h3>{stats.totalEvents}</h3>
            <p>Total Events</p>
            <span className="stat-change positive">+12 this month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon participants">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <h3>{stats.totalParticipants.toLocaleString()}</h3>
            <p>Total Participants</p>
            <span className="stat-change positive">+240 this week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <Activity className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <h3>{stats.activeEvents}</h3>
            <p>Active Events</p>
            <span className="stat-change neutral">Live now</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <Bell className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
            <span className="stat-change attention">Needs attention</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.action}:</strong> {activity.item}
                  </p>
                  <span className="activity-time">
                    {activity.time} by {activity.user}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action">
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
            <button className="quick-action">
              <Upload className="w-5 h-5" />
              <span>Upload Images</span>
            </button>
            <button className="quick-action">
              <Trophy className="w-5 h-5" />
              <span>Update Scores</span>
            </button>
            <button className="quick-action">
              <Users className="w-5 h-5" />
              <span>Add Participant</span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="content-card full-width">
          <div className="card-header">
            <h3>System Status</h3>
          </div>
          <div className="system-status">
            <div className="status-item">
              <div className="status-indicator online"></div>
              <span>Database Connection</span>
              <span className="status-value">Online</span>
            </div>
            <div className="status-item">
              <div className="status-indicator online"></div>
              <span>File Storage</span>
              <span className="status-value">78% Used</span>
            </div>
            <div className="status-item">
              <div className="status-indicator warning"></div>
              <span>Email Service</span>
              <span className="status-value">Limited</span>
            </div>
            <div className="status-item">
              <div className="status-indicator online"></div>
              <span>API Endpoints</span>
              <span className="status-value">All Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Events Management Component
const AdminEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "AI Hackathon 2025",
      date: "2025-03-15",
      status: "upcoming",
      participants: 120,
    },
    {
      id: 2,
      name: "Robotics Challenge",
      date: "2025-03-18",
      status: "active",
      participants: 85,
    },
    {
      id: 3,
      name: "Web Development Contest",
      date: "2025-03-20",
      status: "upcoming",
      participants: 95,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  return (
    <div className="admin-section">
      <div className="section-header">
        <h1>Events Management</h1>
        <button
          className="action-btn primary"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="section-controls">
        <div className="search-bar">
          <Search className="w-4 h-4" />
          <input type="text" placeholder="Search events..." />
        </div>
        <div className="filter-controls">
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
          <button className="filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="font-semibold">{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${event.status}`}>
                    {event.status}
                  </span>
                </td>
                <td>{event.participants}</td>
                <td className="actions">
                  <button className="action-icon">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="action-icon">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="action-icon danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Placeholder components for other admin sections
const AdminLeaderboard = () => <AdminSection title="Leaderboard Management" />;
const AdminParticipants = () => (
  <AdminSection title="Participants Management" />
);
const AdminGallery = () => <AdminSection title="Gallery Management" />;
const AdminHistory = () => <AdminSection title="History Management" />;
const AdminDownloads = () => <AdminSection title="Downloads Management" />;
const AdminContent = () => <AdminSection title="Content Management" />;
const AdminAnalytics = () => <AdminSection title="Analytics & Reports" />;
const AdminSettings = () => <AdminSection title="System Settings" />;

const AdminSection = ({ title }) => (
  <div className="admin-section">
    <div className="section-header">
      <h1>{title}</h1>
      <button className="action-btn primary">
        <Plus className="w-4 h-4" />
        Add New
      </button>
    </div>
    <div className="section-placeholder">
      <div className="placeholder-content">
        <FileText className="w-16 h-16" />
        <h3>{title}</h3>
        <p>
          This section is ready for implementation with full CRUD operations.
        </p>
        <button className="action-btn secondary">Get Started</button>
      </div>
    </div>
  </div>
);

export default Admin;
