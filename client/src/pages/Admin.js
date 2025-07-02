import React, { useState, useEffect, useCallback } from "react";
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
  Activity,
  Shield,
  Bell,
  LogOut,
  Menu,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Target,
  Zap,
} from "lucide-react";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated] = useState(true); // In real app, check auth
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  // Enhanced admin data with real-time updates
  const [adminData, setAdminData] = useState({
    stats: {
      totalEvents: 125,
      activeEvents: 8,
      totalParticipants: 5400,
      totalSponsors: 50,
      galleryImages: 2840,
      pendingApprovals: 12,
      monthlyGrowth: 23.5,
      systemHealth: 98.7,
    },
    recentActivity: [
      {
        id: 1,
        action: "Event Created",
        item: "AI Hackathon 2025",
        time: "2 hours ago",
        user: "Admin",
        type: "success",
      },
      {
        id: 2,
        action: "Sponsor Added",
        item: "TechCorp Solutions",
        time: "4 hours ago",
        user: "Admin",
        type: "info",
      },
      {
        id: 3,
        action: "Gallery Updated",
        item: "E-Week 2024 Highlights",
        time: "6 hours ago",
        user: "Admin",
        type: "info",
      },
      {
        id: 4,
        action: "Score Updated",
        item: "Programming Contest Results",
        time: "1 day ago",
        user: "Admin",
        type: "success",
      },
      {
        id: 5,
        action: "System Alert",
        item: "Server maintenance scheduled",
        time: "2 days ago",
        user: "System",
        type: "warning",
      },
    ],
  });

  // Add notification system
  const addNotification = useCallback((message, type = "info") => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications((prev) => [notification, ...prev.slice(0, 4)]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 5000);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          systemHealth: Math.max(
            95,
            Math.min(100, prev.stats.systemHealth + (Math.random() - 0.5) * 2),
          ),
        },
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const sidebarItems = [
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
      path: "/admin/events",
      badge: adminData.stats.activeEvents,
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
      id: "content",
      label: "Content",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/content",
      badge:
        adminData.stats.pendingApprovals > 0
          ? adminData.stats.pendingApprovals
          : null,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/admin/analytics",
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-container">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="admin-notifications">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification ${notification.type}`}
            >
              <div className="notification-content">
                {notification.type === "success" && (
                  <CheckCircle className="w-4 h-4" />
                )}
                {notification.type === "warning" && (
                  <AlertCircle className="w-4 h-4" />
                )}
                {notification.type === "info" && <Bell className="w-4 h-4" />}
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) =>
                    prev.filter((n) => n.id !== notification.id),
                  )
                }
                className="notification-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

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
            >
              {item.icon}
              <span className={`nav-label ${!sidebarOpen ? "hidden" : ""}`}>
                {item.label}
              </span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="system-status-mini">
            <div
              className={`status-dot ${adminData.stats.systemHealth > 95 ? "online" : "warning"}`}
            ></div>
            <span className={`status-text ${!sidebarOpen ? "hidden" : ""}`}>
              System: {adminData.stats.systemHealth.toFixed(1)}%
            </span>
          </div>
          <button
            className="logout-btn"
            onClick={() => addNotification("Logout successful", "success")}
          >
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
        {loading && (
          <div className="admin-loading">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <AdminDashboard
                stats={adminData.stats}
                recentActivity={adminData.recentActivity}
                onRefresh={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    addNotification(
                      "Dashboard refreshed successfully",
                      "success",
                    );
                  }, 1000);
                }}
                onQuickAction={(action) => {
                  addNotification(`${action} action initiated`, "info");
                }}
              />
            }
          />
          <Route
            path="/events"
            element={<AdminEvents onNotify={addNotification} />}
          />
          <Route
            path="/leaderboard"
            element={<AdminLeaderboard onNotify={addNotification} />}
          />
          <Route
            path="/participants"
            element={<AdminParticipants onNotify={addNotification} />}
          />
          <Route
            path="/gallery"
            element={<AdminGallery onNotify={addNotification} />}
          />
          <Route
            path="/history"
            element={<AdminHistory onNotify={addNotification} />}
          />
          <Route
            path="/content"
            element={<AdminContent onNotify={addNotification} />}
          />
          <Route
            path="/analytics"
            element={<AdminAnalytics onNotify={addNotification} />}
          />
          <Route
            path="/settings"
            element={<AdminSettings onNotify={addNotification} />}
          />
        </Routes>
      </main>
    </div>
  );
};

// Enhanced Dashboard Component
const AdminDashboard = ({
  stats,
  recentActivity,
  onRefresh,
  onQuickAction,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const handleQuickAction = (action) => {
    onQuickAction(action);
  };

  const timeRanges = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-main">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening with E-Week 2025.
          </p>
        </div>
        <div className="dashboard-actions">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="time-range-select"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            className="action-btn primary"
            onClick={() => handleQuickAction("Quick Add")}
          >
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
          <button
            className={`action-btn secondary ${refreshing ? "loading" : ""}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="stats-grid">
        <div
          className="stat-card clickable"
          onClick={() => handleQuickAction("View Events")}
        >
          <div className="stat-icon events">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>{stats.totalEvents}</h3>
              <div className="stat-trend positive">
                <Zap className="w-4 h-4" />
                <span>+12</span>
              </div>
            </div>
            <p>Total Events</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
              <span className="progress-text">75% completion rate</span>
            </div>
          </div>
        </div>
        <div
          className="stat-card clickable"
          onClick={() => handleQuickAction("View Participants")}
        >
          <div className="stat-icon participants">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>{stats.totalParticipants.toLocaleString()}</h3>
              <div className="stat-trend positive">
                <Target className="w-4 h-4" />
                <span>+{stats.monthlyGrowth}%</span>
              </div>
            </div>
            <p>Total Participants</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "88%" }}></div>
              </div>
              <span className="progress-text">88% engagement rate</span>
            </div>
          </div>
        </div>
        <div
          className="stat-card clickable"
          onClick={() => handleQuickAction("View Live Events")}
        >
          <div className="stat-icon active">
            <Activity className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>{stats.activeEvents}</h3>
              <div className="stat-trend live">
                <div className="live-indicator"></div>
                <span>LIVE</span>
              </div>
            </div>
            <p>Active Events</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill active"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className="progress-text">All systems operational</span>
            </div>
          </div>
        </div>
        <div
          className="stat-card clickable urgent"
          onClick={() => handleQuickAction("View Pending")}
        >
          <div className="stat-icon pending">
            <Bell className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>{stats.pendingApprovals}</h3>
              <div className="stat-trend warning">
                <AlertCircle className="w-4 h-4" />
                <span>Action Required</span>
              </div>
            </div>
            <p>Pending Approvals</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill warning"
                  style={{ width: "30%" }}
                ></div>
              </div>
              <span className="progress-text">Review needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Grid */}
      <div className="dashboard-content">
        {/* Enhanced Recent Activity */}
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <div className="header-actions">
              <button className="filter-btn-small">
                <Filter className="w-4 h-4" />
              </button>
              <button
                className="view-all"
                onClick={() => handleQuickAction("View All Activity")}
              >
                View All
              </button>
            </div>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className={`activity-item ${activity.type}`}
              >
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === "success" && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {activity.type === "warning" && (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {activity.type === "info" && <Activity className="w-4 h-4" />}
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.action}:</strong> {activity.item}
                  </p>
                  <div className="activity-meta">
                    <span className="activity-time">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                    <span className="activity-user">by {activity.user}</span>
                  </div>
                </div>
                <div className="activity-actions">
                  <button className="activity-action">
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="content-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
            <span className="card-subtitle">Most used admin tasks</span>
          </div>
          <div className="quick-actions">
            <button
              className="quick-action primary"
              onClick={() => handleQuickAction("Add Event")}
            >
              <div className="action-icon">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="action-content">
                <span className="action-title">Add Event</span>
                <span className="action-description">
                  Create new competition
                </span>
              </div>
            </button>
            <button
              className="quick-action"
              onClick={() => handleQuickAction("Upload Images")}
            >
              <div className="action-icon">
                <Upload className="w-5 h-5" />
              </div>
              <div className="action-content">
                <span className="action-title">Upload Images</span>
                <span className="action-description">Add to gallery</span>
              </div>
            </button>
            <button
              className="quick-action"
              onClick={() => handleQuickAction("Update Scores")}
            >
              <div className="action-icon">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="action-content">
                <span className="action-title">Update Scores</span>
                <span className="action-description">Manage leaderboard</span>
              </div>
            </button>
            <button
              className="quick-action"
              onClick={() => handleQuickAction("Add Participant")}
            >
              <div className="action-icon">
                <Users className="w-5 h-5" />
              </div>
              <div className="action-content">
                <span className="action-title">Add Participant</span>
                <span className="action-description">Register new user</span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced System Status */}
        <div className="content-card full-width">
          <div className="card-header">
            <h3>System Health Monitor</h3>
            <div className="system-health-score">
              <div className="health-indicator">
                <div className="health-circle">
                  <span>{stats.systemHealth.toFixed(1)}%</span>
                </div>
              </div>
              <span className="health-label">Overall Health</span>
            </div>
          </div>
          <div className="system-status-grid">
            <div className="status-item">
              <div className="status-header">
                <div className="status-indicator online"></div>
                <span className="status-name">Database</span>
              </div>
              <div className="status-details">
                <span className="status-value">Online</span>
                <span className="status-metric">Response: 12ms</span>
              </div>
            </div>
            <div className="status-item">
              <div className="status-header">
                <div className="status-indicator online"></div>
                <span className="status-name">File Storage</span>
              </div>
              <div className="status-details">
                <span className="status-value">78% Used</span>
                <span className="status-metric">2.3TB / 3TB</span>
              </div>
            </div>
            <div className="status-item">
              <div className="status-header">
                <div className="status-indicator warning"></div>
                <span className="status-name">Email Service</span>
              </div>
              <div className="status-details">
                <span className="status-value">Limited</span>
                <span className="status-metric">Queue: 45 pending</span>
              </div>
            </div>
            <div className="status-item">
              <div className="status-header">
                <div className="status-indicator online"></div>
                <span className="status-name">API Gateway</span>
              </div>
              <div className="status-details">
                <span className="status-value">All Active</span>
                <span className="status-metric">12 endpoints</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Events Management Component
const AdminEvents = ({ onNotify }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "AI Hackathon 2025",
      date: "2025-03-15",
      time: "09:00",
      status: "upcoming",
      participants: 120,
      location: "Tech Hub Alpha",
      category: "Competition",
      maxParticipants: 150,
    },
    {
      id: 2,
      name: "Robotics Challenge",
      date: "2025-03-18",
      time: "10:00",
      status: "active",
      participants: 85,
      location: "Engineering Lab",
      category: "Workshop",
      maxParticipants: 100,
    },
    {
      id: 3,
      name: "Web Development Contest",
      date: "2025-03-20",
      time: "14:00",
      status: "upcoming",
      participants: 95,
      location: "Computer Center",
      category: "Competition",
      maxParticipants: 120,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
    onNotify("Event deleted successfully", "success");
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(
      events.map((e) => (e.id === eventId ? { ...e, status: newStatus } : e)),
    );
    onNotify(`Event status updated to ${newStatus}`, "success");
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>Events Management</h1>
          <p className="section-description">
            Manage all E-Week events, participants, and schedules
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            className="action-btn primary"
            onClick={() => {
              setShowModal(true);
              onNotify("Opening event creation form", "info");
            }}
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>

      <div className="section-controls">
        <div className="search-bar">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
          <button className="filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      <div className="events-stats">
        <div className="events-stat">
          <span className="stat-number">{events.length}</span>
          <span className="stat-label">Total Events</span>
        </div>
        <div className="events-stat">
          <span className="stat-number">
            {events.filter((e) => e.status === "active").length}
          </span>
          <span className="stat-label">Active Now</span>
        </div>
        <div className="events-stat">
          <span className="stat-number">
            {events.reduce((sum, e) => sum + e.participants, 0)}
          </span>
          <span className="stat-label">Total Participants</span>
        </div>
        <div className="events-stat">
          <span className="stat-number">
            {Math.round(
              (events.reduce(
                (sum, e) => sum + e.participants / e.maxParticipants,
                0,
              ) /
                events.length) *
                100,
            )}
            %
          </span>
          <span className="stat-label">Avg. Fill Rate</span>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Event Details</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>
                  <div className="event-details">
                    <span className="event-name">{event.name}</span>
                    <span className="event-category">{event.category}</span>
                  </div>
                </td>
                <td>
                  <div className="event-datetime">
                    <span className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="event-time">{event.time}</span>
                  </div>
                </td>
                <td>
                  <select
                    className={`status-select ${event.status}`}
                    value={event.status}
                    onChange={(e) =>
                      handleStatusChange(event.id, e.target.value)
                    }
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <div className="participants-info">
                    <span className="participants-count">
                      {event.participants} / {event.maxParticipants}
                    </span>
                    <div className="participants-bar">
                      <div
                        className="participants-fill"
                        style={{
                          width: `${(event.participants / event.maxParticipants) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="location-info">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </td>
                <td className="actions">
                  <div className="action-group">
                    <button className="action-icon" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="action-icon"
                      title="Edit Event"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="action-icon danger"
                      title="Delete Event"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEvents.length === 0 && (
        <div className="empty-state">
          <Calendar className="w-16 h-16" />
          <h3>No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

// Enhanced components for other admin sections
const AdminLeaderboard = ({ onNotify }) => (
  <AdminSection
    title="Leaderboard Management"
    description="Manage competition scores and batch rankings"
    icon={<Trophy className="w-16 h-16" />}
    onNotify={onNotify}
    features={[
      "Update Scores",
      "Manage Rankings",
      "View Statistics",
      "Export Data",
    ]}
  />
);

const AdminParticipants = ({ onNotify }) => (
  <AdminSection
    title="Participants Management"
    description="Manage user accounts, registrations, and profiles"
    icon={<Users className="w-16 h-16" />}
    onNotify={onNotify}
    features={[
      "Add Participants",
      "Manage Batches",
      "Update Profiles",
      "Export Lists",
    ]}
  />
);

const AdminGallery = ({ onNotify }) => (
  <AdminSection
    title="Gallery Management"
    description="Upload, organize, and manage event photos and videos"
    icon={<Image className="w-16 h-16" />}
    onNotify={onNotify}
    features={[
      "Upload Media",
      "Organize Albums",
      "Approve Content",
      "Manage Tags",
    ]}
  />
);

const AdminHistory = ({ onNotify }) => (
  <AdminSection
    title="History Management"
    description="Manage E-Week legacy data and champion records"
    icon={<History className="w-16 h-16" />}
    onNotify={onNotify}
    features={[
      "Update Champions",
      "Manage Years",
      "Edit Achievements",
      "Archive Data",
    ]}
  />
);

const AdminContent = ({ onNotify }) => (
  <AdminSection
    title="Content Management"
    description="Edit website content, announcements, and static pages"
    icon={<FileText className="w-16 h-16" />}
    onNotify={onNotify}
    features={["Edit Pages", "Manage News", "Update About", "Approve Content"]}
  />
);

const AdminAnalytics = ({ onNotify }) => (
  <AdminSection
    title="Analytics & Reports"
    description="View detailed analytics and generate comprehensive reports"
    icon={<BarChart3 className="w-16 h-16" />}
    onNotify={onNotify}
    features={[
      "View Analytics",
      "Generate Reports",
      "Export Data",
      "Track Performance",
    ]}
  />
);

const AdminSettings = ({ onNotify }) => (
  <AdminSection
    title="System Settings"
    description="Configure system-wide settings and preferences"
    icon={<Settings className="w-16 h-16" />}
    onNotify={onNotify}
    features={[
      "General Settings",
      "User Permissions",
      "API Configuration",
      "Backup Settings",
    ]}
  />
);

const AdminSection = ({ title, description, icon, onNotify, features }) => (
  <div className="admin-section">
    <div className="section-header">
      <div className="header-content">
        <h1>{title}</h1>
        <p className="section-description">{description}</p>
      </div>
      <button
        className="action-btn primary"
        onClick={() => onNotify(`${title} - Getting started`, "info")}
      >
        <Plus className="w-4 h-4" />
        Get Started
      </button>
    </div>
    <div className="section-placeholder">
      <div className="placeholder-content">
        <div className="placeholder-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="feature-list">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <CheckCircle className="w-4 h-4" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="placeholder-actions">
          <button
            className="action-btn primary"
            onClick={() => onNotify(`Starting ${title} setup`, "success")}
          >
            Start Setup
          </button>
          <button className="action-btn secondary">View Documentation</button>
        </div>
      </div>
    </div>
  </div>
);

export default Admin;
