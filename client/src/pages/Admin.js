import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Trophy,
  Users,
  Image,
  History,
  Settings,
  FileText,
  BarChart3,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
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
  SortAsc,
  SortDesc,
  Crown,
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const handleQuickAction = (action) => {
    onQuickAction(action);
  };

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
          <button
            className={`action-btn secondary ${refreshing ? "loading" : ""}`}
            onClick={handleRefresh}
            disabled={refreshing}
            style={{ gap: "2px", marginLeft: "-1px", padding: "12px 36px" }}
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
              <div className="stat-trend live">LIVE</div>
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
      type: "team",
      playersPerTeam: 4,
      maxTeamsPerBatch: 2,
      maxPlayersPerBatch: 20,
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
      type: "individual",
      maxPlayersPerBatch: 15,
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
      type: "team",
      playersPerTeam: 3,
      maxTeamsPerBatch: 3,
      maxPlayersPerBatch: 25,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowAddEventModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowAddEventModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e,
        ),
      );
      onNotify("Event updated successfully", "success");
    } else {
      const newEvent = { ...eventData, id: Date.now(), participants: 0 };
      setEvents([...events, newEvent]);
      onNotify("Event created successfully", "success");
    }
    setShowAddEventModal(false);
    setEditingEvent(null);
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
          <button className="action-btn primary" onClick={handleAddEvent}>
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
              <th>Type</th>
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
                  <div className="event-type-info">
                    <span className={`type-badge ${event.type}`}>
                      {event.type === "team" ? "Team" : "Individual"}
                    </span>
                    {event.type === "team" && (
                      <span className="type-details">
                        {event.playersPerTeam} players/team
                      </span>
                    )}
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
                      onClick={() => handleEditEvent(event)}
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

      {/* Add/Edit Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          event={editingEvent}
          isOpen={showAddEventModal}
          onClose={() => {
            setShowAddEventModal(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

// Add Event Modal Component
const AddEventModal = ({ event, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    category: "Competition",
    type: "individual",
    playersPerTeam: 4,
    maxTeamsPerBatch: 2,
    maxPlayersPerBatch: 20,
    maxParticipants: 100,
    status: "upcoming",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        name: "",
        date: "",
        time: "",
        location: "",
        category: "Competition",
        type: "individual",
        playersPerTeam: 4,
        maxTeamsPerBatch: 2,
        maxPlayersPerBatch: 20,
        maxParticipants: 100,
        status: "upcoming",
      });
    }
  }, [event]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-admin">
      <div className="modal-content-admin">
        <div className="modal-header-admin">
          <h3>{event ? "Edit Event" : "Add New Event"}</h3>
          <button onClick={onClose} className="modal-close-admin">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter event name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                <option value="Competition">Competition</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Ceremony">Ceremony</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "error" : ""}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label>Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className={errors.time ? "error" : ""}
              />
              {errors.time && <span className="error-text">{errors.time}</span>}
            </div>

            <div className="form-group span-2">
              <label>Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter event location"
                className={errors.location ? "error" : ""}
              />
              {errors.location && (
                <span className="error-text">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label>Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option value="individual">Individual</option>
                <option value="team">Team</option>
              </select>
            </div>

            {formData.type === "team" && (
              <>
                <div className="form-group">
                  <label>Players per Team</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={formData.playersPerTeam}
                    onChange={(e) =>
                      handleInputChange(
                        "playersPerTeam",
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Max Teams per Batch</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.maxTeamsPerBatch}
                    onChange={(e) =>
                      handleInputChange(
                        "maxTeamsPerBatch",
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Max Players per Batch</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.maxPlayersPerBatch}
                onChange={(e) =>
                  handleInputChange(
                    "maxPlayersPerBatch",
                    parseInt(e.target.value),
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Total Max Participants</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={formData.maxParticipants}
                onChange={(e) =>
                  handleInputChange("maxParticipants", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="modal-actions-admin">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-admin"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary-admin">
              {event ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
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

const AdminParticipants = ({ onNotify }) => {
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      eventName: "AI Hackathon 2025",
      eventId: 1,
      teamName: "Code Warriors",
      batch: "E21",
      type: "team",
      submittedAt: "2025-01-15T10:30:00Z",
      participants: [
        {
          name: "John Doe",
          registrationNumber: "E/21/001",
          contactNumber: "0771234567",
          email: "john@example.com",
          isCaptain: true,
        },
        {
          name: "Jane Smith",
          registrationNumber: "E/21/002",
          contactNumber: "0771234568",
          email: "jane@example.com",
          isCaptain: false,
        },
      ],
    },
    {
      id: 2,
      eventName: "Quantum Computing Workshop",
      eventId: 2,
      teamName: "Individual - John Wilson",
      batch: "E22",
      type: "individual",
      submittedAt: "2025-01-16T14:20:00Z",
      participants: [
        {
          name: "John Wilson",
          registrationNumber: "E/22/015",
          contactNumber: "0771234569",
          email: "wilson@example.com",
          isCaptain: true,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Get unique events and batches for filters
  const events = [...new Set(registrations.map((r) => r.eventName))];
  const batches = [...new Set(registrations.map((r) => r.batch))];

  const filteredRegistrations = registrations
    .filter((reg) => {
      const matchesSearch =
        reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.participants.some((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesEvent =
        filterEvent === "all" || reg.eventName === filterEvent;
      const matchesBatch = filterBatch === "all" || reg.batch === filterBatch;

      return matchesSearch && matchesEvent && matchesBatch;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(b.submittedAt) - new Date(a.submittedAt);
          break;
        case "event":
          comparison = a.eventName.localeCompare(b.eventName);
          break;
        case "batch":
          comparison = a.batch.localeCompare(b.batch);
          break;
        case "team":
          comparison = a.teamName.localeCompare(b.teamName);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Group registrations by event
  const groupedRegistrations = filteredRegistrations.reduce((acc, reg) => {
    if (!acc[reg.eventName]) {
      acc[reg.eventName] = [];
    }
    acc[reg.eventName].push(reg);
    return acc;
  }, {});

  const handleDeleteRegistration = (regId) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== regId));
    onNotify("Registration deleted successfully", "success");
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>Participants Management</h1>
          <p className="section-description">
            Manage event registrations and participant details
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <Upload className="w-4 h-4" />
            Export
          </button>
          <button className="action-btn primary">
            <Plus className="w-4 h-4" />
            Add Registration
          </button>
        </div>
      </div>

      <div className="section-controls">
        <div className="search-bar">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search participants, teams, or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
          >
            <option value="all">All Events</option>
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
          >
            <option value="all">All Batches</option>
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="event">Sort by Event</option>
            <option value="batch">Sort by Batch</option>
            <option value="team">Sort by Team</option>
          </select>
          <button
            className="sort-order-btn"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="participants-stats">
        <div className="participants-stat">
          <span className="stat-number">{registrations.length}</span>
          <span className="stat-label">Total Registrations</span>
        </div>
        <div className="participants-stat">
          <span className="stat-number">
            {Object.keys(groupedRegistrations).length}
          </span>
          <span className="stat-label">Events with Registrations</span>
        </div>
        <div className="participants-stat">
          <span className="stat-number">
            {registrations.reduce((sum, r) => sum + r.participants.length, 0)}
          </span>
          <span className="stat-label">Total Participants</span>
        </div>
        <div className="participants-stat">
          <span className="stat-number">
            {registrations.filter((r) => r.type === "team").length}
          </span>
          <span className="stat-label">Team Registrations</span>
        </div>
      </div>

      {/* Grouped Registrations */}
      <div className="registrations-container">
        {Object.entries(groupedRegistrations).map(
          ([eventName, eventRegistrations]) => (
            <div key={eventName} className="event-group">
              <div className="event-group-header">
                <h3>{eventName}</h3>
                <span className="registration-count">
                  {eventRegistrations.length} registration
                  {eventRegistrations.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="registrations-grid">
                {eventRegistrations.map((registration) => (
                  <div key={registration.id} className="registration-card">
                    <div className="registration-header">
                      <div className="registration-info">
                        <h4>{registration.teamName}</h4>
                        <div className="registration-meta">
                          <span className="batch-badge">
                            {registration.batch}
                          </span>
                          <span className="type-badge">
                            {registration.type}
                          </span>
                          <span className="date-info">
                            {new Date(
                              registration.submittedAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="registration-actions">
                        <button className="action-icon" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="action-icon"
                          title="Edit Registration"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="action-icon danger"
                          title="Delete Registration"
                          onClick={() =>
                            handleDeleteRegistration(registration.id)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="participants-list">
                      {registration.participants.map((participant, index) => (
                        <div key={index} className="participant-row">
                          <div className="participant-info">
                            <span className="participant-name">
                              {participant.isCaptain && (
                                <Crown className="w-3 h-3 text-yellow-400" />
                              )}
                              {participant.name}
                            </span>
                            <span className="participant-reg">
                              {participant.registrationNumber}
                            </span>
                          </div>
                          <div className="participant-contact">
                            <span className="participant-phone">
                              {participant.contactNumber}
                            </span>
                            <span className="participant-email">
                              {participant.email}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      {filteredRegistrations.length === 0 && (
        <div className="empty-state">
          <Users className="w-16 h-16" />
          <h3>No registrations found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

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
        style={{ padding: "12px 45px 12px 40px" }}
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
            style={{ padding: "12px 38px" }}
          >
            Start Setup
          </button>
          <button
            className="action-btn secondary"
            style={{ padding: "12px 60px" }}
          >
            View Documentation
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Admin;
