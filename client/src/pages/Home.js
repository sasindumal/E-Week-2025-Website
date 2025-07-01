import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CountdownTimer from "../components/CountdownTimer";
import {
  Calendar,
  Trophy,
  Users,
  Zap,
  Bell,
  Clock,
  MapPin,
  Star,
} from "lucide-react";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Mock data for batch leaderboard (fun competition before event)
  const batchLeaderboard = [
    { batch: "E21", points: 450, emoji: "🏆", rank: 1, activities: 15 },
    { batch: "E22", points: 420, emoji: "🥈", rank: 2, activities: 12 },
    { batch: "E20", points: 380, emoji: "🥉", rank: 3, activities: 10 },
    { batch: "E23", points: 350, emoji: "🌟", rank: 4, activities: 8 },
    { batch: "E24", points: 320, emoji: "⭐", rank: 5, activities: 6 },
  ];

  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Programming Contest",
      date: "August 25, 2025",
      time: "9:00 AM",
      location: "Computer Lab A",
      category: "Technical",
      priority: "high",
    },
    {
      id: 2,
      title: "Robotics Challenge",
      date: "August 26, 2025",
      time: "2:00 PM",
      location: "Engineering Workshop",
      category: "Engineering",
      priority: "high",
    },
    {
      id: 3,
      title: "Innovation Pitch",
      date: "August 27, 2025",
      time: "10:00 AM",
      location: "Main Auditorium",
      category: "Innovation",
      priority: "medium",
    },
    {
      id: 4,
      title: "Circuit Design Workshop",
      date: "August 28, 2025",
      time: "1:00 PM",
      location: "Electronics Lab",
      category: "Workshop",
      priority: "medium",
    },
  ];

  // Mock sponsors data
  const sponsors = [
    {
      name: "TechCorp",
      logo: "🏢",
      tier: "platinum",
      description: "Leading technology solutions",
    },
    {
      name: "InnovateLab",
      logo: "🔬",
      tier: "gold",
      description: "Innovation and research",
    },
    {
      name: "CodeMasters",
      logo: "💻",
      tier: "gold",
      description: "Software development experts",
    },
    {
      name: "FutureTech",
      logo: "🚀",
      tier: "silver",
      description: "Future technology pioneers",
    },
    {
      name: "GreenEnergy",
      logo: "🌱",
      tier: "silver",
      description: "Sustainable energy solutions",
    },
    {
      name: "DataDrive",
      logo: "📊",
      tier: "bronze",
      description: "Data analytics platform",
    },
    {
      name: "CloudSys",
      logo: "☁️",
      tier: "bronze",
      description: "Cloud infrastructure",
    },
    {
      name: "AIVision",
      logo: "🤖",
      tier: "bronze",
      description: "Artificial intelligence",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Exciting Events",
      description:
        "Multiple competitive events spanning technology, innovation, and engineering challenges",
    },
    {
      icon: Trophy,
      title: "Win Big",
      description:
        "Compete for amazing prizes and recognition in various categories",
    },
    {
      icon: Users,
      title: "Team Building",
      description:
        "Connect with fellow engineers and build lasting professional relationships",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Showcase your creativity and technical skills in cutting-edge challenges",
    },
  ];

  const handleNotificationSignup = (e) => {
    e.preventDefault();
    if (email) {
      setIsRegistered(true);
      setEmail("");
      setTimeout(() => {
        setShowNotificationModal(false);
        setIsRegistered(false);
      }, 3000);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red border-red";
      case "medium":
        return "text-yellow-400 border-yellow-400";
      default:
        return "text-blue-400 border-blue-400";
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "platinum":
        return "bg-gradient-to-r from-purple-400 to-purple-600";
      case "gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      default:
        return "bg-gradient-to-r from-orange-400 to-orange-600";
    }
  };

  return (
    <Layout>
      {/* Hero Section with Countdown */}
      <section className="hero">
        <div className="hero-content">
          <img
            src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
            alt="E-Week 2025"
            className="hero-logo"
          />

          <h1 className="hero-title">
            E-WEEK
            <span className="highlight">2025</span>
          </h1>

          <p className="hero-subtitle">
            The ultimate engineering competition at University of Jaffna Faculty
            of Engineering. Join us for an unforgettable week of innovation,
            competition, and excellence.
          </p>

          <CountdownTimer targetDate="2025-08-25T00:00:00" />

          {/* Registration for Notifications */}
          <div className="hero-actions">
            <button
              onClick={() => setShowNotificationModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Bell size={20} />
              Get Notified
            </button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Batch Leaderboard Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Batch Competition</h2>
          <p className="section-subtitle">
            Pre-event excitement! See which batch is leading in engagement and
            activities
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {batchLeaderboard.map((batch, index) => (
                <div
                  key={batch.batch}
                  className={`card text-center transition-all duration-300 hover:scale-105 ${
                    batch.rank === 1
                      ? "ring-2 ring-yellow-400"
                      : batch.rank === 2
                        ? "ring-2 ring-gray-400"
                        : batch.rank === 3
                          ? "ring-2 ring-orange-400"
                          : ""
                  }`}
                >
                  <div className="text-4xl mb-2">{batch.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {batch.batch}
                  </h3>
                  <div className="text-2xl font-bold text-red mb-1">
                    {batch.points}
                  </div>
                  <div className="text-sm text-white opacity-70">points</div>
                  <div className="text-xs text-white opacity-60 mt-2">
                    {batch.activities} activities
                  </div>
                  <div className="text-xs text-white opacity-60">
                    Rank #{batch.rank}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-white opacity-80">
                🎯 Earn points by participating in pre-event activities, polls,
                and challenges!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title text-navy">Upcoming Events</h2>
          <p className="section-subtitle">
            Mark your calendars for these exciting events in chronological order
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl p-6 border-l-4 ${getPriorityColor(event.priority)} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-navy">
                      {event.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)} border`}
                    >
                      {event.category}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-navy opacity-70">
                      <Calendar className="w-4 h-4 mr-3 text-red" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-navy opacity-70">
                      <Clock className="w-4 h-4 mr-3 text-red" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-navy opacity-70">
                      <MapPin className="w-4 h-4 mr-3 text-red" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button className="w-full bg-navy text-white py-2 rounded-lg font-medium hover:bg-red transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Sliding Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Sponsors</h2>
          <p className="section-subtitle">
            Proudly supported by industry leaders and innovators
          </p>

          <div className="sponsors-container">
            <div className="sponsors-slider">
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className={`sponsor-card ${getTierColor(sponsor.tier)}`}
                >
                  <div className="sponsor-logo">{sponsor.logo}</div>
                  <h3 className="sponsor-name">{sponsor.name}</h3>
                  <p className="sponsor-description">{sponsor.description}</p>
                  <div className="sponsor-tier">
                    {sponsor.tier.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title text-navy">Why Join E-Week 2025?</h2>
          <p className="section-subtitle">
            Experience the thrill of engineering excellence through our
            carefully curated events and competitions
          </p>

          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="feature-title text-navy">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <img
            src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
            alt="E-Week 2025"
            className="footer-logo"
          />
          <p className="footer-text">
            University of Jaffna • Faculty of Engineering
          </p>
          <p className="footer-copyright">
            © 2025 E-Week. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-navy rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              🔔 Get Event Notifications
            </h3>

            {!isRegistered ? (
              <form onSubmit={handleNotificationSignup} className="space-y-4">
                <p className="text-white opacity-80 text-center mb-4">
                  Be the first to know when registration opens and get exclusive
                  updates!
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white text-navy placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red"
                  required
                />
                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Notify Me
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNotificationModal(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-green-400 mb-2">
                  Success!
                </h4>
                <p className="text-white opacity-80">
                  You'll receive notifications when registration opens and for
                  important updates!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
