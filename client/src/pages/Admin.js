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
  Gamepad2,
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
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                addNotification("Logout successful", "success");
                setTimeout(() => {
                  window.location.href = "/admin/login";
                }, 1000);
              }
            }}
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
            path="/skillstorm"
            element={<AdminSkillStorm onNotify={addNotification} />}
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
            path="/admins"
            element={<AdminUsers onNotify={addNotification} />}
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

  // Mock data for upcoming and completed events
  const upcomingEvents = [
    {
      id: 1,
      name: "AI Hackathon 2025",
      date: "2025-08-26",
      time: "09:00",
      location: "Tech Hub Alpha",
      participants: 120,
      maxParticipants: 150,
      category: "Technical",
      status: "upcoming",
      daysLeft: 2,
    },
    {
      id: 2,
      name: "Robotics Championship",
      date: "2025-08-27",
      time: "14:00",
      location: "Engineering Lab",
      participants: 85,
      maxParticipants: 100,
      category: "Engineering",
      status: "upcoming",
      daysLeft: 3,
    },
    {
      id: 3,
      name: "Mobile App Sprint",
      date: "2025-08-28",
      time: "10:00",
      location: "Innovation Center",
      participants: 95,
      maxParticipants: 120,
      category: "Competition",
      status: "upcoming",
      daysLeft: 4,
    },
  ];

  const completedEvents = [
    {
      id: 1,
      name: "Opening Ceremony",
      date: "2025-08-20",
      participants: 500,
      winner: "All Batches",
      category: "Ceremony",
      rating: 4.9,
      feedback: "Excellent organization",
    },
    {
      id: 2,
      name: "Programming Contest",
      date: "2025-08-21",
      participants: 180,
      winner: "E21 - Code Warriors",
      category: "Technical",
      rating: 4.7,
      feedback: "Challenging problems",
    },
    {
      id: 3,
      name: "Design Workshop",
      date: "2025-08-22",
      participants: 120,
      winner: "E22 - Creative Minds",
      category: "Workshop",
      rating: 4.8,
      feedback: "Very informative",
    },
  ];

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
        {/* Upcoming Events */}
        <div className="content-card events-card">
          <div className="card-header">
            <h3>Upcoming Events</h3>
            <div className="header-actions">
              <button
                className="view-all"
                onClick={() => handleQuickAction("View All Events")}
              >
                View All
              </button>
            </div>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item upcoming">
                <div className="event-info">
                  <div className="event-main">
                    <h4 className="event-name">{event.name}</h4>
                    <div className="event-meta">
                      <span className="event-date">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString()} at{" "}
                        {event.time}
                      </span>
                      <span className="event-location">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="event-stats">
                    <div className="participants-stat">
                      <span className="stat-value">
                        {event.participants}/{event.maxParticipants}
                      </span>
                      <span className="stat-label">Participants</span>
                    </div>
                    <div className="days-left">
                      <span className="days-count">{event.daysLeft}</span>
                      <span className="days-label">days left</span>
                    </div>
                  </div>
                </div>
                <div className="event-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(event.participants / event.maxParticipants) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {Math.round(
                      (event.participants / event.maxParticipants) * 100,
                    )}
                    % filled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Events */}
        <div className="content-card events-card">
          <div className="card-header">
            <h3>Recent Completed Events</h3>
            <div className="header-actions">
              <button
                className="view-all"
                onClick={() => handleQuickAction("View Event Results")}
              >
                View Results
              </button>
            </div>
          </div>
          <div className="events-list">
            {completedEvents.map((event) => (
              <div key={event.id} className="event-item completed">
                <div className="event-info">
                  <div className="event-main">
                    <h4 className="event-name">{event.name}</h4>
                    <div className="event-meta">
                      <span className="event-date">
                        <CheckCircle className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="event-winner">
                        <Trophy className="w-3 h-3" />
                        {event.winner}
                      </span>
                    </div>
                  </div>
                  <div className="event-stats">
                    <div className="participants-stat">
                      <span className="stat-value">{event.participants}</span>
                      <span className="stat-label">Participants</span>
                    </div>
                    <div className="rating-stat">
                      <span className="rating-value">⭐ {event.rating}</span>
                      <span className="rating-label">Rating</span>
                    </div>
                  </div>
                </div>
                <div className="event-feedback">
                  <span className="feedback-text">"{event.feedback}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="content-card activity-card">
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
        <div className="content-card quick-actions-card">
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
      points: { first: 100, second: 70, third: 50 },
      winners: null,
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
      points: { first: 80, second: 50, third: 30 },
      winners: null,
    },
    {
      id: 3,
      name: "Web Development Contest",
      date: "2025-03-20",
      time: "14:00",
      status: "completed",
      participants: 95,
      location: "Computer Center",
      category: "Competition",
      maxParticipants: 120,
      type: "team",
      playersPerTeam: 3,
      maxTeamsPerBatch: 3,
      maxPlayersPerBatch: 25,
      points: { first: 120, second: 80, third: 60 },
      winners: {
        first: { batch: "E21", team: "Code Masters", points: 120 },
        second: { batch: "E22", team: "Web Warriors", points: 80 },
        third: { batch: "E23", team: "Dev Squad", points: 60 },
      },
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completingEvent, setCompletingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    eventId: null,
  });

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteEvent = (eventId) => {
    setDeleteConfirm({ show: true, eventId });
  };

  const confirmDelete = () => {
    setEvents(events.filter((e) => e.id !== deleteConfirm.eventId));
    onNotify("Event deleted successfully", "success");
    setDeleteConfirm({ show: false, eventId: null });
  };

  const handleCompleteEvent = (event) => {
    setCompletingEvent(event);
    setShowCompletionModal(true);
  };

  const handleSaveCompletion = (completionData) => {
    setEvents(
      events.map((e) =>
        e.id === completingEvent.id
          ? { ...e, status: "completed", winners: completionData.winners }
          : e,
      ),
    );

    // Submit to leaderboards
    if (completionData.winners) {
      Object.entries(completionData.winners).forEach(([position, winner]) => {
        onNotify(
          `${position} place: ${winner.batch} - ${winner.team || winner.name} (+${winner.points} points)`,
          "success",
        );
      });
    }

    onNotify(
      "Event completed and results submitted to leaderboard!",
      "success",
    );
    setShowCompletionModal(false);
    setCompletingEvent(null);
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
                    {(event.status === "active" ||
                      event.status === "upcoming") && (
                      <button
                        className="action-icon success"
                        title="Complete Event"
                        onClick={() => handleCompleteEvent(event)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
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

      {/* Event Completion Modal */}
      {showCompletionModal && (
        <EventCompletionModal
          event={completingEvent}
          isOpen={showCompletionModal}
          onClose={() => {
            setShowCompletionModal(false);
            setCompletingEvent(null);
          }}
          onSave={handleSaveCompletion}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal-overlay-admin">
          <div className="modal-content-admin small">
            <div className="modal-header-admin">
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body-admin">
              <p>
                Are you sure you want to delete this event? This action cannot
                be undone.
              </p>
            </div>
            <div className="modal-actions-admin">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ show: false, eventId: null })}
                className="btn-secondary-admin"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn-danger-admin"
              >
                Delete Event
              </button>
            </div>
          </div>
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
    points: { first: 100, second: 70, third: 50 },
    winners: null,
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
        points: { first: 100, second: 70, third: 50 },
        winners: null,
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

            <div className="form-group span-3">
              <label>Points Configuration</label>
              <div className="points-grid">
                <div className="points-field">
                  <label>1st Place</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.points.first}
                    onChange={(e) =>
                      handleInputChange("points", {
                        ...formData.points,
                        first: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="points-field">
                  <label>2nd Place</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.points.second}
                    onChange={(e) =>
                      handleInputChange("points", {
                        ...formData.points,
                        second: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="points-field">
                  <label>3rd Place</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.points.third}
                    onChange={(e) =>
                      handleInputChange("points", {
                        ...formData.points,
                        third: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
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

// Event Completion Modal Component
const EventCompletionModal = ({ event, isOpen, onClose, onSave }) => {
  const [winners, setWinners] = useState({
    first: {
      batch: "",
      team: "",
      name: "",
      points: event?.points?.first || 100,
    },
    second: {
      batch: "",
      team: "",
      name: "",
      points: event?.points?.second || 70,
    },
    third: {
      batch: "",
      team: "",
      name: "",
      points: event?.points?.third || 50,
    },
  });

  const [errors, setErrors] = useState({});

  const batches = ["E21", "E22", "E23", "E24", "E25"];

  useEffect(() => {
    if (event) {
      setWinners({
        first: { batch: "", team: "", name: "", points: event.points.first },
        second: { batch: "", team: "", name: "", points: event.points.second },
        third: { batch: "", team: "", name: "", points: event.points.third },
      });
    }
  }, [event]);

  const handleWinnerChange = (position, field, value) => {
    setWinners((prev) => ({
      ...prev,
      [position]: { ...prev[position], [field]: value },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(winners).forEach((position) => {
      const winner = winners[position];
      if (!winner.batch) {
        newErrors[`${position}_batch`] = "Batch is required";
      }
      if (event?.type === "team" && !winner.team) {
        newErrors[`${position}_team`] = "Team name is required";
      }
      if (event?.type === "individual" && !winner.name) {
        newErrors[`${position}_name`] = "Participant name is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ winners });
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="modal-overlay-admin">
      <div className="modal-content-admin large">
        <div className="modal-header-admin">
          <h3>Complete Event: {event.name}</h3>
          <button onClick={onClose} className="modal-close-admin">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="completion-grid">
            {Object.entries(winners).map(([position, winner]) => (
              <div key={position} className="winner-section">
                <h4 className={`winner-title ${position}`}>
                  <Crown className="w-5 h-5" />
                  {position === "first"
                    ? "1st"
                    : position === "second"
                      ? "2nd"
                      : "3rd"}{" "}
                  Place ({winner.points} points)
                </h4>

                <div className="winner-form">
                  <div className="form-group">
                    <label>Batch *</label>
                    <select
                      value={winner.batch}
                      onChange={(e) =>
                        handleWinnerChange(position, "batch", e.target.value)
                      }
                      className={errors[`${position}_batch`] ? "error" : ""}
                    >
                      <option value="">Select Batch</option>
                      {batches.map((batch) => (
                        <option key={batch} value={batch}>
                          {batch}
                        </option>
                      ))}
                    </select>
                    {errors[`${position}_batch`] && (
                      <span className="error-text">
                        {errors[`${position}_batch`]}
                      </span>
                    )}
                  </div>

                  {event.type === "team" ? (
                    <div className="form-group">
                      <label>Team Name *</label>
                      <input
                        type="text"
                        value={winner.team}
                        onChange={(e) =>
                          handleWinnerChange(position, "team", e.target.value)
                        }
                        placeholder="Enter team name"
                        className={errors[`${position}_team`] ? "error" : ""}
                      />
                      {errors[`${position}_team`] && (
                        <span className="error-text">
                          {errors[`${position}_team`]}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="form-group">
                      <label>Participant Name *</label>
                      <input
                        type="text"
                        value={winner.name}
                        onChange={(e) =>
                          handleWinnerChange(position, "name", e.target.value)
                        }
                        placeholder="Enter participant name"
                        className={errors[`${position}_name`] ? "error" : ""}
                      />
                      {errors[`${position}_name`] && (
                        <span className="error-text">
                          {errors[`${position}_name`]}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label>Points</label>
                    <input
                      type="number"
                      min="0"
                      value={winner.points}
                      onChange={(e) =>
                        handleWinnerChange(
                          position,
                          "points",
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="completion-note">
            <p>
              <strong>Note:</strong> Completing this event will automatically
              update the leaderboard with the winners and their points.
            </p>
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
              Complete Event & Update Leaderboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// AdminSkillStorm Component
const AdminSkillStorm = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState("events");
  const [skillstormEvents, setSkillstormEvents] = useState([
    {
      id: 1,
      name: "Codeyssey",
      category: "Core Competition",
      type: "team",
      playersPerTeam: 4,
      maxTeamsPerBatch: 2,
      maxPlayersPerBatch: 20,
      date: "2025-08-26",
      time: "09:00",
      location: "Programming Lab",
      status: "upcoming",
      participants: 45,
      maxParticipants: 100,
    },
    {
      id: 2,
      name: "Valorant",
      category: "PC Games",
      type: "team",
      playersPerTeam: 5,
      maxTeamsPerBatch: 1,
      maxPlayersPerBatch: 15,
      date: "2025-08-29",
      time: "09:00",
      location: "Gaming Arena A",
      status: "active",
      participants: 30,
      maxParticipants: 75,
    },
    {
      id: 3,
      name: "PUBG Mobile",
      category: "Mobile Games",
      type: "team",
      playersPerTeam: 4,
      maxTeamsPerBatch: 4,
      maxPlayersPerBatch: 30,
      date: "2025-08-31",
      time: "14:00",
      location: "Mobile Gaming Zone",
      status: "upcoming",
      participants: 60,
      maxParticipants: 150,
    },
  ]);

  const [skillstormRegistrations, setSkillstormRegistrations] = useState([
    {
      id: 1,
      eventName: "Codeyssey",
      eventId: 1,
      teamName: "Code Masters",
      batch: "E21",
      type: "team",
      submittedAt: "2025-01-15T10:30:00Z",
      participants: [
        {
          name: "Alex Johnson",
          registrationNumber: "E/21/045",
          contactNumber: "0771234567",
          email: "alex@example.com",
          isCaptain: true,
        },
        {
          name: "Sarah Wilson",
          registrationNumber: "E/21/046",
          contactNumber: "0771234568",
          email: "sarah@example.com",
          isCaptain: false,
        },
        {
          name: "Mike Chen",
          registrationNumber: "E/21/047",
          contactNumber: "0771234569",
          email: "mike@example.com",
          isCaptain: false,
        },
        {
          name: "Lisa Davis",
          registrationNumber: "E/21/048",
          contactNumber: "0771234570",
          email: "lisa@example.com",
          isCaptain: false,
        },
      ],
    },
    {
      id: 2,
      eventName: "Valorant",
      eventId: 2,
      teamName: "Fire Squad",
      batch: "E22",
      type: "team",
      submittedAt: "2025-01-16T14:20:00Z",
      participants: [
        {
          name: "Tom Brown",
          registrationNumber: "E/22/020",
          contactNumber: "0771234571",
          email: "tom@example.com",
          isCaptain: true,
        },
        {
          name: "Emma Taylor",
          registrationNumber: "E/22/021",
          contactNumber: "0771234572",
          email: "emma@example.com",
          isCaptain: false,
        },
        {
          name: "Ryan Garcia",
          registrationNumber: "E/22/022",
          contactNumber: "0771234573",
          email: "ryan@example.com",
          isCaptain: false,
        },
        {
          name: "Sophie Miller",
          registrationNumber: "E/22/023",
          contactNumber: "0771234574",
          email: "sophie@example.com",
          isCaptain: false,
        },
        {
          name: "David Lee",
          registrationNumber: "E/22/024",
          contactNumber: "0771234575",
          email: "david@example.com",
          isCaptain: false,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Event Management Functions
  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowAddEventModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowAddEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this competition? This action cannot be undone.",
      )
    ) {
      setSkillstormEvents((prev) => prev.filter((e) => e.id !== eventId));
      onNotify("SkillStorm event deleted successfully", "success");
    }
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setSkillstormEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e,
        ),
      );
      onNotify("SkillStorm event updated successfully", "success");
    } else {
      const newEvent = { ...eventData, id: Date.now(), participants: 0 };
      setSkillstormEvents((prev) => [...prev, newEvent]);
      onNotify("SkillStorm event created successfully", "success");
    }
    setShowAddEventModal(false);
    setEditingEvent(null);
  };

  const handleDeleteRegistration = (regId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this registration? This action cannot be undone.",
      )
    ) {
      setSkillstormRegistrations((prev) => prev.filter((r) => r.id !== regId));
      onNotify("Registration deleted successfully", "success");
    }
  };

  // Filter functions
  const filteredEvents = skillstormEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredRegistrations = skillstormRegistrations.filter((reg) => {
    const matchesSearch =
      reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.participants.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesSearch;
  });

  // Group registrations by event
  const groupedRegistrations = filteredRegistrations.reduce((acc, reg) => {
    if (!acc[reg.eventName]) {
      acc[reg.eventName] = [];
    }
    acc[reg.eventName].push(reg);
    return acc;
  }, {});

  const categories = [
    "Core Competition",
    "PC Games",
    "Mobile Games",
    "Fun Games",
  ];

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>SkillStorm Management</h1>
          <p className="section-description">
            Manage SkillStorm competitions, games, and participants
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn primary" onClick={handleAddEvent}>
            <Plus className="w-4 h-4" />
            Add Competition
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          <Calendar className="w-4 h-4" />
          <span>Events</span>
        </button>
        <button
          className={`tab-button ${activeTab === "participants" ? "active" : ""}`}
          onClick={() => setActiveTab("participants")}
        >
          <Users className="w-4 h-4" />
          <span>Participants</span>
        </button>
      </div>

      {activeTab === "events" && (
        <>
          {/* Events Controls */}
          <div className="section-controls">
            <div className="search-bar">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search competitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls">
              <select
                className="filter-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Events Statistics */}
          <div className="events-stats">
            <div className="events-stat">
              <span className="stat-number">{skillstormEvents.length}</span>
              <span className="stat-label">Total Competitions</span>
            </div>
            <div className="events-stat">
              <span className="stat-number">
                {skillstormEvents.filter((e) => e.status === "active").length}
              </span>
              <span className="stat-label">Active Now</span>
            </div>
            <div className="events-stat">
              <span className="stat-number">
                {skillstormEvents.reduce((sum, e) => sum + e.participants, 0)}
              </span>
              <span className="stat-label">Total Participants</span>
            </div>
            <div className="events-stat">
              <span className="stat-number">
                {skillstormRegistrations.length}
              </span>
              <span className="stat-label">Team Registrations</span>
            </div>
          </div>

          {/* Events Table */}
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Competition</th>
                  <th>Category</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className="event-details">
                        <span className="event-name">{event.name}</span>
                        <span className="event-location">{event.location}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`category-badge ${event.category.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {event.category}
                      </span>
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
                        onChange={(e) => {
                          setSkillstormEvents((prev) =>
                            prev.map((ev) =>
                              ev.id === event.id
                                ? { ...ev, status: e.target.value }
                                : ev,
                            ),
                          );
                          onNotify(
                            `Status updated to ${e.target.value}`,
                            "success",
                          );
                        }}
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
                    <td className="actions">
                      <div className="action-group">
                        <button className="action-icon" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="action-icon"
                          title="Edit Competition"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="action-icon danger"
                          title="Delete Competition"
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
        </>
      )}

      {activeTab === "participants" && (
        <>
          {/* Participants Controls */}
          <div className="section-controls">
            <div className="search-bar">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search teams, participants, or competitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Participants Statistics */}
          <div className="participants-stats">
            <div className="participants-stat">
              <span className="stat-number">
                {skillstormRegistrations.length}
              </span>
              <span className="stat-label">Total Teams</span>
            </div>
            <div className="participants-stat">
              <span className="stat-number">
                {skillstormRegistrations.reduce(
                  (sum, r) => sum + r.participants.length,
                  0,
                )}
              </span>
              <span className="stat-label">Total Players</span>
            </div>
            <div className="participants-stat">
              <span className="stat-number">
                {Object.keys(groupedRegistrations).length}
              </span>
              <span className="stat-label">Active Competitions</span>
            </div>
            <div className="participants-stat">
              <span className="stat-number">
                {
                  [...new Set(skillstormRegistrations.map((r) => r.batch))]
                    .length
                }
              </span>
              <span className="stat-label">Participating Batches</span>
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
                      {eventRegistrations.length} team
                      {eventRegistrations.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="registrations-grid">
                    {eventRegistrations.map((registration) => (
                      <div
                        key={registration.id}
                        className="registration-card skillstorm"
                      >
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
                            <button
                              className="action-icon"
                              title="View Details"
                            >
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
                          {registration.participants.map(
                            (participant, index) => (
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
                            ),
                          )}
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
              <Gamepad2 className="w-16 h-16" />
              <h3>No registrations found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Event Modal for SkillStorm */}
      {showAddEventModal && (
        <AddSkillStormEventModal
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

// Add SkillStorm Event Modal Component
const AddSkillStormEventModal = ({ event, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Core Competition",
    date: "",
    time: "",
    location: "",
    type: "team",
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
        category: "Core Competition",
        date: "",
        time: "",
        location: "",
        type: "team",
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
    if (!formData.name.trim()) newErrors.name = "Competition name is required";
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

  const categories = [
    "Core Competition",
    "PC Games",
    "Mobile Games",
    "Fun Games",
  ];

  return (
    <div className="modal-overlay-admin">
      <div className="modal-content-admin">
        <div className="modal-header-admin">
          <h3>{event ? "Edit Competition" : "Add New Competition"}</h3>
          <button onClick={onClose} className="modal-close-admin">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Competition Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter competition name"
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
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
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
                placeholder="Enter competition location"
                className={errors.location ? "error" : ""}
              />
              {errors.location && (
                <span className="error-text">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label>Competition Type</label>
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
              {event ? "Update Competition" : "Create Competition"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Enhanced AdminLeaderboard Component
const AdminLeaderboard = ({ onNotify }) => {
  const [batchRankings] = useState([
    {
      id: 1,
      batch: "E21",
      totalPoints: 4850,
      rank: 1,
      previousRank: 2,
      eventsWon: 8,
      podiumFinishes: 15,
      participationRate: 94,
      weeklyGain: 320,
      weeklyChange: 12.5,
      members: 45,
    },
    {
      id: 2,
      batch: "E22",
      totalPoints: 4620,
      rank: 2,
      previousRank: 1,
      eventsWon: 6,
      podiumFinishes: 13,
      participationRate: 89,
      weeklyGain: 280,
      weeklyChange: -4.8,
      members: 48,
    },
    {
      id: 3,
      batch: "E20",
      totalPoints: 4380,
      rank: 3,
      previousRank: 3,
      eventsWon: 5,
      podiumFinishes: 11,
      participationRate: 87,
      weeklyGain: 250,
      weeklyChange: 0.2,
      members: 42,
    },
    {
      id: 4,
      batch: "E23",
      totalPoints: 3950,
      rank: 4,
      previousRank: 5,
      eventsWon: 4,
      podiumFinishes: 8,
      participationRate: 82,
      weeklyGain: 310,
      weeklyChange: 8.9,
      members: 50,
    },
    {
      id: 5,
      batch: "E24",
      totalPoints: 3720,
      rank: 5,
      previousRank: 4,
      eventsWon: 3,
      podiumFinishes: 7,
      participationRate: 78,
      weeklyGain: 290,
      weeklyChange: -2.1,
      members: 47,
    },
  ]);

  const [eventScores, setEventScores] = useState([
    {
      id: 1,
      eventName: "AI Hackathon 2025",
      date: "2025-01-15",
      category: "Technical",
      status: "completed",
      scores: [
        { batch: "E21", score: 950, rank: 1, team: "Neural Nexus" },
        { batch: "E23", score: 890, rank: 2, team: "Data Dynamos" },
        { batch: "E22", score: 850, rank: 3, team: "Algorithm Aces" },
        { batch: "E20", score: 820, rank: 4, team: "Code Crusaders" },
        { batch: "E24", score: 780, rank: 5, team: "Logic Lords" },
      ],
    },
    {
      id: 2,
      eventName: "Robotics Championship",
      date: "2025-01-12",
      category: "Engineering",
      status: "completed",
      scores: [
        { batch: "E22", score: 920, rank: 1, team: "Robo Rangers" },
        { batch: "E21", score: 880, rank: 2, team: "Mech Masters" },
        { batch: "E20", score: 840, rank: 3, team: "Bot Builders" },
        { batch: "E24", score: 800, rank: 4, team: "Circuit Squad" },
        { batch: "E23", score: 760, rank: 5, team: "Tech Titans" },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("rankings");

  const handleDeleteEvent = (eventId) => {
    setEventScores((prev) => prev.filter((e) => e.id !== eventId));
    onNotify("Event removed from leaderboard", "success");
  };

  const filteredEvents = eventScores.filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>Leaderboard Management</h1>
          <p className="section-description">
            Manage competition scores, batch rankings, and event results
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <Upload className="w-4 h-4" />
            Export Rankings
          </button>
          <button
            className="action-btn primary"
            onClick={() =>
              onNotify("Add event scores functionality - coming soon", "info")
            }
          >
            <Plus className="w-4 h-4" />
            Add Event Scores
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "rankings" ? "active" : ""}`}
          onClick={() => setActiveTab("rankings")}
        >
          <Trophy className="w-4 h-4" />
          <span>Batch Rankings</span>
        </button>
        <button
          className={`tab-button ${activeTab === "scores" ? "active" : ""}`}
          onClick={() => setActiveTab("scores")}
        >
          <Target className="w-4 h-4" />
          <span>Event Scores</span>
        </button>
      </div>

      {activeTab === "rankings" && (
        <>
          {/* Rankings Statistics */}
          <div className="leaderboard-stats">
            <div className="leaderboard-stat">
              <span className="stat-number">{batchRankings.length}</span>
              <span className="stat-label">Active Batches</span>
            </div>
            <div className="leaderboard-stat">
              <span className="stat-number">
                {batchRankings.reduce((sum, b) => sum + b.eventsWon, 0)}
              </span>
              <span className="stat-label">Total Wins</span>
            </div>
            <div className="leaderboard-stat">
              <span className="stat-number">
                {batchRankings.reduce((sum, b) => sum + b.members, 0)}
              </span>
              <span className="stat-label">Total Participants</span>
            </div>
            <div className="leaderboard-stat">
              <span className="stat-number">
                {Math.round(
                  batchRankings.reduce(
                    (sum, b) => sum + b.participationRate,
                    0,
                  ) / batchRankings.length,
                )}
                %
              </span>
              <span className="stat-label">Avg Participation</span>
            </div>
          </div>

          {/* Batch Rankings Table */}
          <div className="rankings-table">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Batch</th>
                  <th>Total Points</th>
                  <th>Events Won</th>
                  <th>Podiums</th>
                  <th>Participation</th>
                  <th>Weekly Change</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {batchRankings.map((batch) => (
                  <tr key={batch.id} className={`rank-${batch.rank}`}>
                    <td>
                      <div className="rank-display">
                        <span className="rank-number">#{batch.rank}</span>
                        {batch.rank !== batch.previousRank && (
                          <span
                            className={`rank-change ${batch.rank < batch.previousRank ? "up" : "down"}`}
                          >
                            {batch.rank < batch.previousRank ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="batch-info">
                        <span className="batch-name">{batch.batch}</span>
                        <span className="batch-members">
                          {batch.members} members
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="points-display">
                        <span className="points-value">
                          {batch.totalPoints.toLocaleString()}
                        </span>
                        <span className="points-gain">+{batch.weeklyGain}</span>
                      </div>
                    </td>
                    <td>{batch.eventsWon}</td>
                    <td>{batch.podiumFinishes}</td>
                    <td>
                      <div className="participation-display">
                        <span>{batch.participationRate}%</span>
                        <div className="participation-bar">
                          <div
                            className="participation-fill"
                            style={{ width: `${batch.participationRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`weekly-change ${batch.weeklyChange > 0 ? "positive" : batch.weeklyChange < 0 ? "negative" : "neutral"}`}
                      >
                        {batch.weeklyChange > 0 ? "+" : ""}
                        {batch.weeklyChange}%
                      </span>
                    </td>
                    <td className="actions">
                      <div className="action-group">
                        <button className="action-icon" title="Edit Points">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="action-icon" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "scores" && (
        <>
          {/* Search Controls */}
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
          </div>

          {/* Event Scores */}
          <div className="event-scores-container">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-score-card">
                <div className="event-score-header">
                  <div className="event-info">
                    <h3>{event.eventName}</h3>
                    <div className="event-meta">
                      <span className="event-date">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="event-category">{event.category}</span>
                      <span className={`event-status ${event.status}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <button className="action-icon" title="Edit Scores">
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
                </div>

                <div className="scores-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Batch</th>
                        <th>Team</th>
                        <th>Score</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.scores.map((score) => (
                        <tr key={score.batch} className={`rank-${score.rank}`}>
                          <td>
                            <span className="rank-badge">#{score.rank}</span>
                          </td>
                          <td>
                            <span className="batch-badge">{score.batch}</span>
                          </td>
                          <td>{score.team}</td>
                          <td>
                            <span className="score-value">{score.score}</span>
                          </td>
                          <td>
                            <button
                              className="action-icon"
                              onClick={() =>
                                onNotify(
                                  "Edit score functionality - coming soon",
                                  "info",
                                )
                              }
                            >
                              >
                              <Edit className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
    if (
      window.confirm(
        "Are you sure you want to delete this registration? This action cannot be undone.",
      )
    ) {
      setRegistrations((prev) => prev.filter((r) => r.id !== regId));
      onNotify("Registration deleted successfully", "success");
    }
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

const AdminGallery = ({ onNotify }) => {
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: "Opening Ceremony 2025",
      type: "image",
      url: "https://via.placeholder.com/400x300",
      thumbnail: "https://via.placeholder.com/200x150",
      category: "Events",
      tags: ["opening", "ceremony", "2025"],
      uploadDate: "2025-01-15",
      status: "approved",
      uploadedBy: "Admin",
      views: 245,
      likes: 12,
    },
    {
      id: 2,
      title: "Hackathon Highlights",
      type: "video",
      url: "https://via.placeholder.com/400x300",
      thumbnail: "https://via.placeholder.com/200x150",
      category: "Competitions",
      tags: ["hackathon", "coding", "competition"],
      uploadDate: "2025-01-14",
      status: "pending",
      uploadedBy: "User123",
      views: 89,
      likes: 8,
    },
    {
      id: 3,
      title: "Team Building Activities",
      type: "image",
      url: "https://via.placeholder.com/400x300",
      thumbnail: "https://via.placeholder.com/200x150",
      category: "Activities",
      tags: ["team", "building", "fun"],
      uploadDate: "2025-01-13",
      status: "approved",
      uploadedBy: "Admin",
      views: 156,
      likes: 15,
    },
    {
      id: 4,
      title: "Awards Ceremony",
      type: "image",
      url: "https://via.placeholder.com/400x300",
      thumbnail: "https://via.placeholder.com/200x150",
      category: "Ceremonies",
      tags: ["awards", "winners", "ceremony"],
      uploadDate: "2025-01-12",
      status: "approved",
      uploadedBy: "Admin",
      views: 312,
      likes: 28,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    "Events",
    "Competitions",
    "Activities",
    "Ceremonies",
    "Workshops",
  ];

  const handleStatusChange = (itemId, newStatus) => {
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item,
      ),
    );
    onNotify(`Media ${newStatus} successfully`, "success");
  };

  const handleDeleteItem = (itemId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this media? This action cannot be undone.",
      )
    ) {
      setGalleryItems((prev) => prev.filter((item) => item.id !== itemId));
      onNotify("Media deleted successfully", "success");
    }
  };

  const handleEditItem = (item) => {
    onNotify("Edit media functionality - coming soon", "info");
  };

  const handleUploadMedia = () => {
    onNotify("Upload media functionality - coming soon", "info");
  };

  const filteredItems = galleryItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesCategory =
        filterCategory === "all" || item.category === filterCategory;
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesCategory && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>Gallery Management</h1>
          <p className="section-description">
            Upload, organize, and manage event photos and videos
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button className="action-btn primary" onClick={handleUploadMedia}>
            <Plus className="w-4 h-4" />
            Upload Media
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="gallery-controls">
        <div className="search-and-filters">
          <div className="search-bar">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search media by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>

            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="views">Sort by Views</option>
              <option value="likes">Sort by Likes</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="gallery-stats">
        <div className="gallery-stat">
          <span className="stat-number">{galleryItems.length}</span>
          <span className="stat-label">Total Media</span>
        </div>
        <div className="gallery-stat">
          <span className="stat-number">
            {galleryItems.filter((item) => item.status === "pending").length}
          </span>
          <span className="stat-label">Pending Approval</span>
        </div>
        <div className="gallery-stat">
          <span className="stat-number">
            {galleryItems.reduce((sum, item) => sum + item.views, 0)}
          </span>
          <span className="stat-label">Total Views</span>
        </div>
        <div className="gallery-stat">
          <span className="stat-number">
            {galleryItems.reduce((sum, item) => sum + item.likes, 0)}
          </span>
          <span className="stat-label">Total Likes</span>
        </div>
      </div>

      {/* Gallery Content */}
      <div className={`gallery-content ${viewMode}`}>
        {filteredItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <div className="item-preview">
              <img src={item.thumbnail} alt={item.title} />
              <div className="item-overlay">
                <div className="item-type">
                  {item.type === "video" ? "📹" : "����"}
                </div>
                <div className="item-actions">
                  <button className="action-icon" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="action-icon"
                    title="Edit"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="action-icon danger"
                    title="Delete"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="item-info">
              <h4 className="item-title">{item.title}</h4>
              <div className="item-meta">
                <span className="item-category">{item.category}</span>
                <span className="item-date">
                  {new Date(item.uploadDate).toLocaleDateString()}
                </span>
              </div>

              <div className="item-stats">
                <span className="stat">👁️ {item.views}</span>
                <span className="stat">❤️ {item.likes}</span>
              </div>

              <div className="item-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="item-status-control">
                <select
                  className={`status-select ${item.status}`}
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <Image className="w-16 h-16" />
          <h3>No media found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

const AdminHistory = ({ onNotify }) => {
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      year: "2024",
      title: "E-Week 2024",
      theme: "Innovation Beyond Boundaries",
      overallChampion: "E20",
      totalEvents: 25,
      totalParticipants: 1200,
      status: "completed",
      highlights: [
        "First virtual-hybrid event format",
        "Record participation of 1200+ students",
        "Introduction of AI/ML competitions",
      ],
      champions: {
        "Programming Contest": "E20 - Code Warriors",
        "Robotics Championship": "E21 - Mech Masters",
        "Design Competition": "E22 - Creative Minds",
        "Gaming Tournament": "E20 - Pro Gamers",
      },
      statistics: {
        events: 25,
        participants: 1200,
        prizes: "$50,000",
        sponsors: 15,
      },
    },
    {
      id: 2,
      year: "2023",
      title: "E-Week 2023",
      theme: "Engineering the Future",
      overallChampion: "E19",
      totalEvents: 22,
      totalParticipants: 950,
      status: "completed",
      highlights: [
        "Return to in-person events",
        "Launch of startup pitch competition",
        "International collaboration events",
      ],
      champions: {
        "Programming Contest": "E19 - Binary Blazers",
        "Robotics Championship": "E20 - Tech Titans",
        "Design Competition": "E19 - Design Dynamos",
        "Gaming Tournament": "E21 - Game Changers",
      },
      statistics: {
        events: 22,
        participants: 950,
        prizes: "$35,000",
        sponsors: 12,
      },
    },
    {
      id: 3,
      year: "2022",
      title: "E-Week 2022",
      theme: "Digital Transformation",
      overallChampion: "E18",
      totalEvents: 20,
      totalParticipants: 800,
      status: "completed",
      highlights: [
        "First fully digital E-Week",
        "Global online participation",
        "Virtual reality competitions",
      ],
      champions: {
        "Programming Contest": "E18 - Digital Warriors",
        "Robotics Championship": "E19 - Robo Revolution",
        "Design Competition": "E18 - Pixel Pioneers",
        "Gaming Tournament": "E18 - Virtual Victors",
      },
      statistics: {
        events: 20,
        participants: 800,
        prizes: "$25,000",
        sponsors: 10,
      },
    },
  ]);

  const [activeTab, setActiveTab] = useState("years");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAddYear = () => {
    onNotify("Add year functionality - coming soon", "info");
  };

  const handleEditYear = (year) => {
    onNotify("Edit year functionality - coming soon", "info");
  };

  const handleDeleteYear = (yearId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this year record? This action cannot be undone.",
      )
    ) {
      setHistoryData((prev) => prev.filter((y) => y.id !== yearId));
      onNotify("Year record deleted successfully", "success");
    }
  };

  const filteredHistory = historyData.filter((year) => {
    const matchesSearch =
      year.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      year.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      year.year.includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" || year.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>History Management</h1>
          <p className="section-description">
            Manage E-Week legacy data, champion records, and historical
            achievements
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <Upload className="w-4 h-4" />
            Export History
          </button>
          <button className="action-btn primary" onClick={handleAddYear}>
            <Plus className="w-4 h-4" />
            Add Year Record
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "years" ? "active" : ""}`}
          onClick={() => setActiveTab("years")}
        >
          <History className="w-4 h-4" />
          <span>Year Records</span>
        </button>
        <button
          className={`tab-button ${activeTab === "champions" ? "active" : ""}`}
          onClick={() => setActiveTab("champions")}
        >
          <Trophy className="w-4 h-4" />
          <span>Champions</span>
        </button>
      </div>

      {/* Controls */}
      <div className="section-controls">
        <div className="search-bar">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search years, themes, or champions..."
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
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planned">Planned</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="history-stats">
        <div className="history-stat">
          <span className="stat-number">{historyData.length}</span>
          <span className="stat-label">Total Years</span>
        </div>
        <div className="history-stat">
          <span className="stat-number">
            {historyData.reduce((sum, y) => sum + y.totalEvents, 0)}
          </span>
          <span className="stat-label">Total Events</span>
        </div>
        <div className="history-stat">
          <span className="stat-number">
            {historyData.reduce((sum, y) => sum + y.totalParticipants, 0)}
          </span>
          <span className="stat-label">Total Participants</span>
        </div>
        <div className="history-stat">
          <span className="stat-number">
            {historyData.filter((y) => y.status === "completed").length}
          </span>
          <span className="stat-label">Completed Years</span>
        </div>
      </div>

      {activeTab === "years" && (
        <div className="history-timeline">
          {filteredHistory.map((year) => (
            <div key={year.id} className="history-card">
              <div className="history-header">
                <div className="year-info">
                  <h3 className="year-title">{year.title}</h3>
                  <p className="year-theme">"{year.theme}"</p>
                  <div className="year-meta">
                    <span className="year-badge">{year.year}</span>
                    <span className={`status-badge ${year.status}`}>
                      {year.status}
                    </span>
                    <span className="champion-badge">
                      🏆 {year.overallChampion}
                    </span>
                  </div>
                </div>
                <div className="history-actions">
                  <button className="action-icon" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="action-icon"
                    title="Edit Year"
                    onClick={() => handleEditYear(year)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="action-icon danger"
                    title="Delete Year"
                    onClick={() => handleDeleteYear(year.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="history-content">
                <div className="statistics-grid">
                  <div className="stat-item">
                    <span className="stat-value">{year.statistics.events}</span>
                    <span className="stat-name">Events</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {year.statistics.participants}
                    </span>
                    <span className="stat-name">Participants</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{year.statistics.prizes}</span>
                    <span className="stat-name">Prizes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {year.statistics.sponsors}
                    </span>
                    <span className="stat-name">Sponsors</span>
                  </div>
                </div>

                <div className="highlights-section">
                  <h4>Key Highlights</h4>
                  <ul className="highlights-list">
                    {year.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="champions-section">
                  <h4>Event Champions</h4>
                  <div className="champions-grid">
                    {Object.entries(year.champions).map(([event, champion]) => (
                      <div key={event} className="champion-item">
                        <span className="event-name">{event}</span>
                        <span className="champion-name">{champion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "champions" && (
        <div className="champions-overview">
          <div className="champions-grid">
            {historyData.map((year) => (
              <div key={year.id} className="year-champions-card">
                <div className="champions-header">
                  <h3>{year.year} Champions</h3>
                  <span className="overall-champion">
                    🏆 {year.overallChampion}
                  </span>
                </div>
                <div className="champions-list">
                  {Object.entries(year.champions).map(([event, champion]) => (
                    <div key={event} className="champion-row">
                      <span className="event-title">{event}</span>
                      <span className="champion-team">{champion}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredHistory.length === 0 && (
        <div className="empty-state">
          <History className="w-16 h-16" />
          <h3>No history records found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

const AdminSettings = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      siteName: "E-Week 2025",
      siteDescription: "University of Jaffna Faculty of Engineering",
      contactEmail: "admin@eweek2025.lk",
      maintenanceMode: false,
      registrationOpen: true,
      maxParticipantsPerEvent: 150,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      eventReminders: true,
      scoreUpdates: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requirePasswordChange: false,
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionDays: 30,
      lastBackup: "2025-01-20T10:30:00Z",
    },
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
    onNotify(`${setting} updated successfully`, "success");
  };

  const handleBackupNow = () => {
    onNotify("Backup initiated successfully", "success");
    setSettings((prev) => ({
      ...prev,
      backup: {
        ...prev.backup,
        lastBackup: new Date().toISOString(),
      },
    }));
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>System Settings</h1>
          <p className="section-description">
            Configure system-wide settings and preferences
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <Upload className="w-4 h-4" />
            Export Settings
          </button>
          <button className="action-btn primary">
            <Shield className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          <Settings className="w-4 h-4" />
          <span>General</span>
        </button>
        <button
          className={`tab-button ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>
        <button
          className={`tab-button ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          <Shield className="w-4 h-4" />
          <span>Security</span>
        </button>
        <button
          className={`tab-button ${activeTab === "backup" ? "active" : ""}`}
          onClick={() => setActiveTab("backup")}
        >
          <Upload className="w-4 h-4" />
          <span>Backup</span>
        </button>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {activeTab === "general" && (
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Site Name</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) =>
                    handleSettingChange("general", "siteName", e.target.value)
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label>Site Description</label>
                <input
                  type="text"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    handleSettingChange(
                      "general",
                      "siteDescription",
                      e.target.value,
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label>Contact Email</label>
                <input
                  type="email"
                  value={settings.general.contactEmail}
                  onChange={(e) =>
                    handleSettingChange(
                      "general",
                      "contactEmail",
                      e.target.value,
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label>Max Participants Per Event</label>
                <input
                  type="number"
                  value={settings.general.maxParticipantsPerEvent}
                  onChange={(e) =>
                    handleSettingChange(
                      "general",
                      "maxParticipantsPerEvent",
                      parseInt(e.target.value),
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item toggle">
                <label>Maintenance Mode</label>
                <button
                  className={`toggle-btn ${settings.general.maintenanceMode ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "general",
                      "maintenanceMode",
                      !settings.general.maintenanceMode,
                    )
                  }
                >
                  {settings.general.maintenanceMode ? "ON" : "OFF"}
                </button>
              </div>
              <div className="setting-item toggle">
                <label>Registration Open</label>
                <button
                  className={`toggle-btn ${settings.general.registrationOpen ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "general",
                      "registrationOpen",
                      !settings.general.registrationOpen,
                    )
                  }
                >
                  {settings.general.registrationOpen ? "OPEN" : "CLOSED"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <div className="settings-grid">
              <div className="setting-item toggle">
                <label>Email Notifications</label>
                <button
                  className={`toggle-btn ${settings.notifications.emailNotifications ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "notifications",
                      "emailNotifications",
                      !settings.notifications.emailNotifications,
                    )
                  }
                >
                  {settings.notifications.emailNotifications ? "ON" : "OFF"}
                </button>
              </div>
              <div className="setting-item toggle">
                <label>SMS Notifications</label>
                <button
                  className={`toggle-btn ${settings.notifications.smsNotifications ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "notifications",
                      "smsNotifications",
                      !settings.notifications.smsNotifications,
                    )
                  }
                >
                  {settings.notifications.smsNotifications ? "ON" : "OFF"}
                </button>
              </div>
              <div className="setting-item toggle">
                <label>Push Notifications</label>
                <button
                  className={`toggle-btn ${settings.notifications.pushNotifications ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "notifications",
                      "pushNotifications",
                      !settings.notifications.pushNotifications,
                    )
                  }
                >
                  {settings.notifications.pushNotifications ? "ON" : "OFF"}
                </button>
              </div>
              <div className="setting-item toggle">
                <label>Event Reminders</label>
                <button
                  className={`toggle-btn ${settings.notifications.eventReminders ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "notifications",
                      "eventReminders",
                      !settings.notifications.eventReminders,
                    )
                  }
                >
                  {settings.notifications.eventReminders ? "ON" : "OFF"}
                </button>
              </div>
              <div className="setting-item toggle">
                <label>Score Updates</label>
                <button
                  className={`toggle-btn ${settings.notifications.scoreUpdates ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "notifications",
                      "scoreUpdates",
                      !settings.notifications.scoreUpdates,
                    )
                  }
                >
                  {settings.notifications.scoreUpdates ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <div className="settings-grid">
              <div className="setting-item toggle">
                <label>Two-Factor Authentication</label>
                <button
                  className={`toggle-btn ${settings.security.twoFactorAuth ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "security",
                      "twoFactorAuth",
                      !settings.security.twoFactorAuth,
                    )
                  }
                >
                  {settings.security.twoFactorAuth ? "ENABLED" : "DISABLED"}
                </button>
              </div>
              <div className="setting-item">
                <label>Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    handleSettingChange(
                      "security",
                      "sessionTimeout",
                      parseInt(e.target.value),
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label>Max Login Attempts</label>
                <input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) =>
                    handleSettingChange(
                      "security",
                      "maxLoginAttempts",
                      parseInt(e.target.value),
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label>Password Min Length</label>
                <input
                  type="number"
                  value={settings.security.passwordMinLength}
                  onChange={(e) =>
                    handleSettingChange(
                      "security",
                      "passwordMinLength",
                      parseInt(e.target.value),
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item toggle">
                <label>Require Password Change</label>
                <button
                  className={`toggle-btn ${settings.security.requirePasswordChange ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "security",
                      "requirePasswordChange",
                      !settings.security.requirePasswordChange,
                    )
                  }
                >
                  {settings.security.requirePasswordChange
                    ? "REQUIRED"
                    : "OPTIONAL"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "backup" && (
          <div className="settings-section">
            <h3>Backup Settings</h3>
            <div className="settings-grid">
              <div className="setting-item toggle">
                <label>Auto Backup</label>
                <button
                  className={`toggle-btn ${settings.backup.autoBackup ? "active" : ""}`}
                  onClick={() =>
                    handleSettingChange(
                      "backup",
                      "autoBackup",
                      !settings.backup.autoBackup,
                    )
                  }
                >
                  {settings.backup.autoBackup ? "ENABLED" : "DISABLED"}
                </button>
              </div>
              <div className="setting-item">
                <label>Backup Frequency</label>
                <select
                  value={settings.backup.backupFrequency}
                  onChange={(e) =>
                    handleSettingChange(
                      "backup",
                      "backupFrequency",
                      e.target.value,
                    )
                  }
                  className="setting-select"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Retention Days</label>
                <input
                  type="number"
                  value={settings.backup.retentionDays}
                  onChange={(e) =>
                    handleSettingChange(
                      "backup",
                      "retentionDays",
                      parseInt(e.target.value),
                    )
                  }
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label>Last Backup</label>
                <span className="setting-value">
                  {new Date(settings.backup.lastBackup).toLocaleString()}
                </span>
              </div>
              <div className="setting-item action">
                <button
                  className="action-btn primary"
                  onClick={handleBackupNow}
                >
                  <Upload className="w-4 h-4" />
                  Backup Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// AdminUsers Component
const AdminUsers = ({ onNotify }) => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "John Administrator",
      email: "admin@eweek.com",
      role: "Super Admin",
      status: "active",
      lastLogin: "2025-01-15T10:30:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah@eweek.com",
      role: "Event Manager",
      status: "active",
      lastLogin: "2025-01-14T16:45:00Z",
      createdAt: "2024-02-15T00:00:00Z",
      permissions: ["events", "participants", "gallery"],
    },
    {
      id: 3,
      name: "Mike Moderator",
      email: "mike@eweek.com",
      role: "Content Moderator",
      status: "inactive",
      lastLogin: "2025-01-10T09:15:00Z",
      createdAt: "2024-06-01T00:00:00Z",
      permissions: ["gallery", "history"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const roles = ["Super Admin", "Event Manager", "Content Moderator", "Viewer"];

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || admin.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || admin.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddAdmin = () => {
    setEditingAdmin(null);
    setShowAddAdminModal(true);
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setShowAddAdminModal(true);
  };

  const handleDeleteAdmin = (adminId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this admin? This action cannot be undone.",
      )
    ) {
      setAdmins((prev) => prev.filter((a) => a.id !== adminId));
      onNotify("Admin deleted successfully", "success");
    }
  };

  const handleStatusChange = (adminId, newStatus) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === adminId ? { ...admin, status: newStatus } : admin,
      ),
    );
    onNotify(`Admin status updated to ${newStatus}`, "success");
  };

  const handleSaveAdmin = (adminData) => {
    if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === editingAdmin.id
            ? { ...adminData, id: editingAdmin.id }
            : admin,
        ),
      );
      onNotify("Admin updated successfully", "success");
    } else {
      const newAdmin = {
        ...adminData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastLogin: null,
      };
      setAdmins((prev) => [...prev, newAdmin]);
      onNotify("Admin created successfully", "success");
    }
    setShowAddAdminModal(false);
    setEditingAdmin(null);
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="header-content">
          <h1>Admin Users</h1>
          <p className="section-description">
            Manage admin users, roles, and permissions
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn primary" onClick={handleAddAdmin}>
            <Plus className="w-4 h-4" />
            Add Admin
          </button>
        </div>
      </div>

      <div className="section-controls">
        <div className="search-bar">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span className="stat-number">{admins.length}</span>
          <span className="stat-label">Total Admins</span>
        </div>
        <div className="admin-stat">
          <span className="stat-number">
            {admins.filter((a) => a.status === "active").length}
          </span>
          <span className="stat-label">Active</span>
        </div>
        <div className="admin-stat">
          <span className="stat-number">
            {admins.filter((a) => a.role === "Super Admin").length}
          </span>
          <span className="stat-label">Super Admins</span>
        </div>
        <div className="admin-stat">
          <span className="stat-number">
            {
              admins.filter(
                (a) =>
                  a.lastLogin &&
                  new Date() - new Date(a.lastLogin) < 24 * 60 * 60 * 1000,
              ).length
            }
          </span>
          <span className="stat-label">Active Today</span>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Admin Details</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <div className="admin-details">
                    <span className="admin-name">{admin.name}</span>
                    <span className="admin-email">{admin.email}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`role-badge ${admin.role.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {admin.role}
                  </span>
                </td>
                <td>
                  <select
                    className={`status-select ${admin.status}`}
                    value={admin.status}
                    onChange={(e) =>
                      handleStatusChange(admin.id, e.target.value)
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <div className="login-info">
                    {admin.lastLogin ? (
                      <>
                        <span className="login-date">
                          {new Date(admin.lastLogin).toLocaleDateString()}
                        </span>
                        <span className="login-time">
                          {new Date(admin.lastLogin).toLocaleTimeString()}
                        </span>
                      </>
                    ) : (
                      <span className="never-logged">Never</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className="created-date">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="actions">
                  <div className="action-group">
                    <button
                      className="action-icon"
                      title="Edit Admin"
                      onClick={() => handleEditAdmin(admin)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {admin.role !== "Super Admin" && (
                      <button
                        className="action-icon danger"
                        title="Delete Admin"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAdmins.length === 0 && (
        <div className="empty-state">
          <Shield className="w-16 h-16" />
          <h3>No admins found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add/Edit Admin Modal */}
      {showAddAdminModal && (
        <AddAdminModal
          admin={editingAdmin}
          isOpen={showAddAdminModal}
          onClose={() => {
            setShowAddAdminModal(false);
            setEditingAdmin(null);
          }}
          onSave={handleSaveAdmin}
          roles={roles}
        />
      )}
    </div>
  );
};

// Add Admin Modal Component
const AddAdminModal = ({ admin, isOpen, onClose, onSave, roles }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "active",
    permissions: [],
  });

  const [errors, setErrors] = useState({});

  const allPermissions = [
    { id: "events", label: "Events Management" },
    { id: "skillstorm", label: "SkillStorm Management" },
    { id: "participants", label: "Participants Management" },
    { id: "leaderboard", label: "Leaderboard Management" },
    { id: "gallery", label: "Gallery Management" },
    { id: "history", label: "History Management" },
    { id: "admins", label: "Admin Management" },
    { id: "settings", label: "Settings Management" },
  ];

  useEffect(() => {
    if (admin) {
      setFormData(admin);
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Viewer",
        status: "active",
        permissions: [],
      });
    }
  }, [admin]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePermissionChange = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalData = {
        ...formData,
        permissions:
          formData.role === "Super Admin" ? ["all"] : formData.permissions,
      };
      onSave(finalData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-admin">
      <div className="modal-content-admin">
        <div className="modal-header-admin">
          <h3>{admin ? "Edit Admin" : "Add New Admin"}</h3>
          <button onClick={onClose} className="modal-close-admin">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter admin name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {formData.role !== "Super Admin" && (
              <div className="form-group span-2">
                <label>Permissions</label>
                <div className="permissions-grid">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="permission-item">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                      />
                      <label htmlFor={permission.id}>{permission.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              {admin ? "Update Admin" : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
