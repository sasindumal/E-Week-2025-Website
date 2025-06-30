import React from "react";
import Layout from "../components/Layout";
import CountdownTimer from "../components/CountdownTimer";
import { Calendar, Trophy, Users, Zap } from "lucide-react";

const Home = () => {
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

  const eventHighlights = [
    {
      emoji: "🏆",
      title: "Technical Competitions",
      description:
        "Coding challenges, robotics, and engineering design competitions",
    },
    {
      emoji: "📚",
      title: "Workshops & Seminars",
      description:
        "Learn from industry experts and enhance your technical skills",
    },
    {
      emoji: "🤝",
      title: "Networking Events",
      description: "Connect with peers, alumni, and industry professionals",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
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

          <div className="hero-actions">
            <button className="btn btn-primary">Register Now</button>
            <button className="btn btn-secondary">Learn More</button>
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

      {/* Event Highlights */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Event Highlights</h2>
          <p className="section-subtitle">
            Get ready for an action-packed week of competitions, workshops, and
            networking
          </p>

          <div className="event-highlights">
            {eventHighlights.map((event, index) => (
              <div key={index} className="event-highlight">
                <span className="event-emoji">{event.emoji}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
            ))}
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
    </Layout>
  );
};

export default Home;
