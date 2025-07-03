import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Play,
  Trophy,
  Target,
  Zap,
  Code,
  Cpu,
  Lightbulb,
  Award,
  Activity,
  Timer,
  Flame,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react";

const Events = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 7-day schedule
  const weekSchedule = [
    {
      day: "Monday",
      date: "Aug 25",
      events: [
        {
          id: 1,
          name: "Opening Ceremony",
          time: "09:00 - 10:30",
          location: "Main Auditorium",
          type: "Ceremony",
          participants: 500,
          status: "completed",
        },
        {
          id: 2,
          name: "AI Hackathon Kickoff",
          time: "11:00 - 12:00",
          location: "Tech Hub",
          type: "Competition",
          participants: 120,
          status: "completed",
        },
        {
          id: 3,
          name: "Robotics Workshop",
          time: "14:00 - 17:00",
          location: "Lab A",
          type: "Workshop",
          participants: 80,
          status: "completed",
        },
      ],
    },
    {
      day: "Tuesday",
      date: "Aug 26",
      events: [
        {
          id: 4,
          name: "Programming Contest",
          time: "09:00 - 12:00",
          location: "Computer Lab",
          type: "Competition",
          participants: 150,
          status: "ongoing",
        },
        {
          id: 5,
          name: "IoT Innovation Lab",
          time: "13:00 - 16:00",
          location: "Innovation Center",
          type: "Workshop",
          participants: 60,
          status: "scheduled",
        },
        {
          id: 6,
          name: "Startup Pitch Session",
          time: "18:00 - 20:00",
          location: "Pitch Arena",
          type: "Presentation",
          participants: 40,
          status: "scheduled",
        },
      ],
    },
    {
      day: "Wednesday",
      date: "Aug 27",
      events: [
        {
          id: 7,
          name: "Machine Learning Summit",
          time: "10:00 - 12:00",
          location: "Conference Hall",
          type: "Conference",
          participants: 200,
          status: "scheduled",
        },
        {
          id: 8,
          name: "Cybersecurity Challenge",
          time: "14:00 - 18:00",
          location: "Security Lab",
          type: "Competition",
          participants: 90,
          status: "scheduled",
        },
      ],
    },
    {
      day: "Thursday",
      date: "Aug 28",
      events: [
        {
          id: 9,
          name: "Web Dev Marathon",
          time: "09:00 - 17:00",
          location: "Dev Center",
          type: "Marathon",
          participants: 100,
          status: "scheduled",
        },
        {
          id: 10,
          name: "Tech Talk Series",
          time: "19:00 - 21:00",
          location: "Amphitheater",
          type: "Talk",
          participants: 300,
          status: "scheduled",
        },
      ],
    },
    {
      day: "Friday",
      date: "Aug 29",
      events: [
        {
          id: 11,
          name: "Design Thinking Workshop",
          time: "10:00 - 13:00",
          location: "Creative Studio",
          type: "Workshop",
          participants: 70,
          status: "scheduled",
        },
        {
          id: 12,
          name: "Innovation Showcase",
          time: "15:00 - 18:00",
          location: "Exhibition Hall",
          type: "Showcase",
          participants: 250,
          status: "scheduled",
        },
      ],
    },
    {
      day: "Saturday",
      date: "Aug 30",
      events: [
        {
          id: 13,
          name: "Final Presentations",
          time: "09:00 - 12:00",
          location: "Main Stage",
          type: "Presentation",
          participants: 400,
          status: "scheduled",
        },
        {
          id: 14,
          name: "Awards Ceremony",
          time: "14:00 - 16:00",
          location: "Grand Hall",
          type: "Ceremony",
          participants: 500,
          status: "scheduled",
        },
      ],
    },
    {
      day: "Sunday",
      date: "Aug 31",
      events: [
        {
          id: 15,
          name: "Closing Ceremony",
          time: "10:00 - 12:00",
          location: "Main Auditorium",
          type: "Ceremony",
          participants: 500,
          status: "scheduled",
        },
        {
          id: 16,
          name: "Networking Brunch",
          time: "12:30 - 14:30",
          location: "Garden Pavilion",
          type: "Social",
          participants: 200,
          status: "scheduled",
        },
      ],
    },
  ];

  // Ongoing events
  const ongoingEvents = [
    {
      id: 1,
      name: "AI & Machine Learning Hackathon",
      startTime: "09:00",
      endTime: "17:00",
      location: "Tech Hub Alpha",
      participants: 120,
      progress: 65,
      category: "Competition",
      icon: Code,
      gradient: "from-blue-500 to-purple-600",
      timeRemaining: "4h 23m",
      status: "live",
    },
    {
      id: 2,
      name: "Robotics Design Challenge",
      startTime: "10:00",
      endTime: "16:00",
      location: "Engineering Lab",
      participants: 85,
      progress: 45,
      category: "Engineering",
      icon: Cpu,
      gradient: "from-green-500 to-teal-600",
      timeRemaining: "6h 15m",
      status: "live",
    },
    {
      id: 3,
      name: "Startup Pitch Preparation",
      startTime: "14:00",
      endTime: "18:00",
      location: "Innovation Center",
      participants: 45,
      progress: 30,
      category: "Workshop",
      icon: Lightbulb,
      gradient: "from-orange-500 to-red-600",
      timeRemaining: "2h 45m",
      status: "live",
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      name: "Cybersecurity War Games",
      date: "Tomorrow",
      time: "09:00 AM",
      duration: "6 hours",
      location: "Security Command Center",
      participants: "150+ registered",
      category: "Competition",
      priority: "high",
      icon: Target,
      gradient: "from-red-500 to-pink-600",
      description: "Advanced cybersecurity simulation and defense challenges",
      points: "30 Points",
      tags: ["Security", "CTF", "Networking"],
    },
    {
      id: 2,
      name: "Quantum Computing Workshop",
      date: "Aug 28",
      time: "2:00 PM",
      duration: "4 hours",
      location: "Quantum Lab",
      participants: "80+ registered",
      category: "Workshop",
      priority: "medium",
      icon: Zap,
      gradient: "from-purple-500 to-blue-600",
      description: "Hands-on experience with quantum algorithms and circuits",
      points: "20 Points",
      tags: ["Quantum", "Computing", "Research"],
    },
    {
      id: 3,
      name: "Mobile App Development Sprint",
      date: "Aug 29",
      time: "10:00 AM",
      duration: "8 hours",
      location: "Mobile Dev Studio",
      participants: "100+ registered",
      category: "Competition",
      priority: "high",
      icon: Code,
      gradient: "from-green-500 to-cyan-600",
      description: "Build and deploy mobile apps in a day-long sprint",
      points: "10 Points",
      tags: ["Mobile", "React Native", "Flutter"],
    },
    {
      id: 4,
      name: "Design Thinking Masterclass",
      date: "Aug 30",
      time: "11:00 AM",
      duration: "3 hours",
      location: "Creative Hub",
      participants: "60+ registered",
      category: "Workshop",
      priority: "medium",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-orange-600",
      description: "Learn human-centered design principles and methods",
      points: "20 Points",
      tags: ["Design", "UX", "Innovation"],
    },
  ];

  // Past events with scorecards
  const pastEvents = [
    {
      id: 1,
      name: "Opening Hackathon",
      date: "Aug 25, 2025",
      category: "Competition",
      participants: 180,
      duration: "24 hours",
      status: "completed",
      icon: "🚀",
      scores: [
        { team: "Code Crusaders", batch: "E21", score: 950, rank: 1 },
        { team: "Digital Dynamos", batch: "E23", score: 890, rank: 2 },
        { team: "Tech Titans", batch: "E22", score: 850, rank: 3 },
        { team: "Innovation Inc", batch: "E20", score: 820, rank: 4 },
        { team: "Future Builders", batch: "E24", score: 780, rank: 5 },
      ],
    },
    {
      id: 2,
      name: "Robotics Championship",
      date: "Aug 24, 2025",
      category: "Engineering",
      participants: 120,
      duration: "8 hours",
      status: "completed",
      icon: "🤖",
      scores: [
        { team: "Robo Rangers", batch: "E22", score: 920, rank: 1 },
        { team: "Mech Masters", batch: "E21", score: 880, rank: 2 },
        { team: "Bot Builders", batch: "E20", score: 840, rank: 3 },
        { team: "Circuit Squad", batch: "E24", score: 800, rank: 4 },
        { team: "Auto Engineers", batch: "E23", score: 760, rank: 5 },
      ],
    },
    {
      id: 3,
      name: "AI Innovation Challenge",
      date: "Aug 23, 2025",
      category: "Innovation",
      participants: 95,
      duration: "12 hours",
      status: "completed",
      icon: "🧠",
      scores: [
        { team: "Neural Networks", batch: "E23", score: 910, rank: 1 },
        { team: "Deep Learners", batch: "E21", score: 870, rank: 2 },
        { team: "AI Architects", batch: "E22", score: 850, rank: 3 },
        { team: "Machine Minds", batch: "E24", score: 810, rank: 4 },
        { team: "Data Wizards", batch: "E20", score: 790, rank: 5 },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/20";
      case "ongoing":
        return "text-yellow-400 bg-yellow-400/20";
      case "scheduled":
        return "text-blue-400 bg-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      Competition: "from-red-500 to-pink-600",
      Workshop: "from-blue-500 to-cyan-600",
      Conference: "from-purple-500 to-blue-600",
      Ceremony: "from-yellow-500 to-orange-600",
      Marathon: "from-green-500 to-teal-600",
      Talk: "from-indigo-500 to-purple-600",
      Presentation: "from-orange-500 to-red-600",
      Showcase: "from-pink-500 to-purple-600",
      Social: "from-cyan-500 to-blue-600",
    };
    return colors[type] || "from-gray-500 to-gray-600";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-400 bg-red-400/10 text-red-400";
      case "medium":
        return "border-yellow-400 bg-yellow-400/10 text-yellow-400";
      default:
        return "border-blue-400 bg-blue-400/10 text-blue-400";
    }
  };

  // Filter and sort upcoming events
  const filteredUpcomingEvents = upcomingEvents
    .filter((event) => {
      const matchesSearch =
        searchTerm === "" ||
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "scheduled" && event.date !== "Today");

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "time":
          // Simple time comparison for demo - in real app would parse dates properly
          comparison = a.time.localeCompare(b.time);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "participants":
          const aParticipants = parseInt(a.participants.replace(/\D/g, ""));
          const bParticipants = parseInt(b.participants.replace(/\D/g, ""));
          comparison = bParticipants - aParticipants;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <Layout>
      <div className="events-page">
        {/* Hero Section */}
        <section className="events-hero">
          <div className="hero-background-events"></div>
          <div className="container">
            <div className="hero-content-events">
              <h1 className="hero-title-events">
                Event Central
                <Activity className="title-icon" size={48} />
              </h1>
              <p className="hero-subtitle-events">
                Your complete guide to E-Week 2025 events, schedules, and
                competitions
              </p>
              <div className="hero-stats-events">
                <div className="stat-card-events">
                  <Flame className="stat-icon text-red-400" size={24} />
                  <span className="stat-number">3</span>
                  <span className="stat-label">Live Events</span>
                </div>
                <div className="stat-card-events">
                  <Clock className="stat-icon text-blue-400" size={24} />
                  <span className="stat-number">15</span>
                  <span className="stat-label">Upcoming</span>
                </div>
                <div className="stat-card-events">
                  <CheckCircle className="stat-icon text-green-400" size={24} />
                  <span className="stat-number">8</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: 7-Day Schedule */}
        <section className="schedule-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                7-Day Event Schedule
                <Calendar className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Complete timeline of all E-Week 2025 activities
              </p>
            </div>

            {/* Day Selector */}
            <div className="day-selector">
              {weekSchedule.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`day-button ${selectedDay === index ? "active" : ""}`}
                >
                  <span className="day-name">{day.day}</span>
                  <span className="day-date">{day.date}</span>
                  <span className="day-count">{day.events.length} events</span>
                </button>
              ))}
            </div>

            {/* Selected Day Events */}
            <div className="schedule-timeline">
              <h3 className="timeline-title">
                {weekSchedule[selectedDay].day} Schedule
              </h3>
              <div className="timeline-events">
                {weekSchedule[selectedDay].events.map((event, index) => (
                  <div
                    key={event.id}
                    className="timeline-event"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="event-time">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-connector"></div>
                    <div className="event-card-timeline">
                      <div className="event-header-timeline">
                        <h4 className="event-name-timeline">{event.name}</h4>
                        <span
                          className={`event-status ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <div className="event-details-timeline">
                        <div className="detail-item-timeline">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="detail-item-timeline">
                          <Users className="w-4 h-4 text-green-400" />
                          <span>{event.participants} participants</span>
                        </div>
                      </div>
                      <div
                        className={`event-type-badge bg-gradient-to-r ${getTypeColor(event.type)}`}
                      >
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Ongoing Events */}
        <section className="ongoing-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                Live Events
                <Flame className="title-icon text-red-400" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Events happening right now with real-time updates
              </p>
            </div>

            <div className="ongoing-grid">
              {ongoingEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div
                    key={event.id}
                    className="ongoing-card"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`ongoing-gradient bg-gradient-to-br ${event.gradient}`}
                    >
                      {/* Live Indicator */}
                      <div className="live-indicator">
                        <div className="live-dot"></div>
                        <span>LIVE</span>
                      </div>

                      {/* Event Icon */}
                      <div className="ongoing-icon">
                        <IconComponent size={32} />
                      </div>

                      {/* Event Info */}
                      <h3 className="ongoing-title">{event.name}</h3>
                      <div className="ongoing-meta">
                        <div className="meta-item-ongoing">
                          <Clock className="w-4 h-4" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="meta-item-ongoing">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="meta-item-ongoing">
                          <Users className="w-4 h-4" />
                          <span>{event.participants} participants</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="progress-container">
                        <div className="progress-header">
                          <span>Progress</span>
                          <span>{event.progress}%</span>
                        </div>
                        <div className="progress-bar-ongoing">
                          <div
                            className="progress-fill-ongoing"
                            style={{ width: `${event.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Time Remaining */}
                      <div className="time-remaining">
                        <Timer className="w-4 h-4 text-yellow-400" />
                        <span>{event.timeRemaining} remaining</span>
                      </div>

                      {/* Action Button */}
                      <button className="ongoing-cta">
                        <Play className="w-4 h-4" />
                        <span>Watch Live</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advanced Search and Filter System */}
        {
          <section className="events-search-section">
            <div className="container">
              <div className="events-search-header">
                <h2 className="search-section-title">
                  Find Your Events
                  <Search className="title-icon" size={32} />
                </h2>
                <p className="search-section-subtitle">
                  Advanced search and filtering to discover the perfect events
                  for you
                </p>
              </div>

              <div className="events-search-bar">
                <div className="search-container">
                  <div className="search-input-wrapper">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search events by name, category, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="clear-search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`filter-toggle ${isFilterOpen ? "active" : ""}`}
                  >
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                  </button>

                  <div className="sort-controls">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="time">Time</option>
                      <option value="name">Name</option>
                      <option value="participants">Participants</option>
                      <option value="category">Category</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="sort-order"
                    >
                      {sortOrder === "asc" ? (
                        <SortAsc className="w-5 h-5" />
                      ) : (
                        <SortDesc className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Advanced Filters Panel */}
                {isFilterOpen && (
                  <div className="filters-panel">
                    <div className="filter-group">
                      <label className="filter-label">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                      >
                        <option value="all">All Categories</option>
                        <option value="Competition">Competition</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Ceremony">Ceremony</option>
                        <option value="Social">Social</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <label className="filter-label">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="filter-select"
                      >
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="ongoing">Live/Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="filter-actions">
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedStatus("all");
                          setSortBy("time");
                          setSortOrder("asc");
                        }}
                        className="clear-filters"
                      >
                        Clear All
                      </button>
                      <span className="results-count">
                        {filteredUpcomingEvents.length} events found
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }

        {/* Section 03: Upcoming Events */}
        <section className="upcoming-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                Upcoming Events
                <Clock className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Register now for these exciting upcoming competitions and
                workshops
              </p>
            </div>

            <div className="upcoming-grid grid">
              {filteredUpcomingEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div
                    key={event.id}
                    className="upcoming-card"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`upcoming-gradient bg-gradient-to-br ${event.gradient}`}
                    >
                      {/* Priority Badge */}
                      <div
                        className={`priority-badge ${getPriorityColor(event.priority)}`}
                      >
                        {event.priority.toUpperCase()}
                      </div>

                      {/* Event Icon */}
                      <div className="upcoming-icon">
                        <IconComponent size={28} />
                      </div>

                      {/* Event Info */}
                      <h3 className="upcoming-title">{event.name}</h3>
                      <p className="upcoming-description">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="upcoming-details">
                        <div className="detail-row">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <div className="detail-row">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span>{event.duration}</span>
                        </div>
                        <div className="detail-row">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="detail-row">
                          <Users className="w-4 h-4 text-orange-400" />
                          <span>{event.participants}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="event-tags">
                        {event.tags.map((tag, idx) => (
                          <span key={idx} className="event-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Prize Info */}
                      <div className="prize-info">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span>{event.points}</span>
                      </div>

                      {/* Action Button */}
                      <button className="upcoming-cta">
                        <span>Register Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 04: Past Events with Scorecards */}
        <section className="past-events-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                Past Events & Results
                <Trophy className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Complete results and scorecards from completed competitions
              </p>
            </div>

            <div className="past-events-grid">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="past-event-card"
                  style={{ animationDelay: `${index * 250}ms` }}
                >
                  <div className="past-event-header">
                    <div className="past-event-info">
                      <div className="past-event-icon">{event.icon}</div>
                      <div className="past-event-details">
                        <h3 className="past-event-name">{event.name}</h3>
                        <div className="past-event-meta">
                          <span>{event.date}</span>
                          <span>•</span>
                          <span>{event.participants} participants</span>
                          <span>•</span>
                          <span>{event.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="past-event-category">{event.category}</div>
                  </div>

                  <div className="scoreboard">
                    <h4 className="scoreboard-title">Final Results</h4>
                    <div className="scores-list">
                      {event.scores.map((score, idx) => (
                        <div key={idx} className="score-row">
                          <div className="score-rank">
                            <div
                              className={`rank-number ${
                                idx < 3 ? "podium" : "regular"
                              }`}
                            >
                              #{score.rank}
                            </div>
                          </div>
                          <div className="score-team">
                            <span className="team-name">{score.team}</span>
                            <span className="team-batch">{score.batch}</span>
                          </div>
                          <div className="score-points">
                            <span className="points-value">{score.score}</span>
                            <span className="points-label">pts</span>
                          </div>
                          <div className="score-progress">
                            <div
                              className="score-bar"
                              style={{
                                width: `${(score.score / Math.max(...event.scores.map((s) => s.score))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Events;
