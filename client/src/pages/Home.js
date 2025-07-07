import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  ArrowRight,
  Play,
  ChevronDown,
  Sparkles,
  Target,
  Award,
  Code,
  Cpu,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Divine pantheon leaderboard with godly styling
  const batchLeaderboard = [
    {
      batch: "E21",
      points: 2450,
      logo: "⚡",
      rank: 1,
      wins: 24,
      growth: "+12%",
      color: "from-yellow-400 to-yellow-600",
      title: "Zeus's Thunder",
      blessing: "Master of Lightning",
    },
    {
      batch: "E22",
      points: 2120,
      logo: "🦉",
      rank: 2,
      wins: 18,
      growth: "+8%",
      color: "from-gray-300 to-gray-500",
      title: "Athena's Wisdom",
      blessing: "Goddess of Strategy",
    },
    {
      batch: "E20",
      points: 1980,
      logo: "🔱",
      rank: 3,
      wins: 15,
      growth: "+5%",
      color: "from-blue-400 to-cyan-600",
      title: "Poseidon's Might",
      blessing: "Lord of the Seas",
    },
    {
      batch: "E23",
      points: 1750,
      logo: "⚔️",
      rank: 4,
      wins: 12,
      growth: "+15%",
      color: "from-red-400 to-red-600",
      title: "Ares' Valor",
      blessing: "God of War",
    },
    {
      batch: "E24",
      points: 1420,
      logo: "🏹",
      rank: 5,
      wins: 9,
      growth: "+22%",
      color: "from-purple-400 to-purple-600",
      title: "Apollo's Light",
      blessing: "God of Arts",
    },
  ];

  // Legendary trials and challenges
  const upcomingEvents = [
    {
      id: 1,
      title: "Trial of Athena's Wisdom",
      subtitle: "AI & Machine Learning Hackathon",
      date: "August 25, 2025",
      time: "9:00 AM",
      location: "Temple of Innovation",
      category: "Divine Trial",
      priority: "legendary",
      participants: "500+ Heroes",
      prize: "20 Glory Points",
      icon: Code,
      gradient: "from-blue-500 to-purple-600",
      blessing: "🦉 Blessed by Athena",
    },
    {
      id: 2,
      title: "Hephaestus' Forge Challenge",
      subtitle: "Robotics Championship",
      date: "August 26, 2025",
      time: "2:00 PM",
      location: "Divine Forge",
      category: "Epic Quest",
      priority: "legendary",
      participants: "200+ Warriors",
      prize: "30 Glory Points",
      icon: Cpu,
      gradient: "from-orange-500 to-red-600",
      blessing: "🔥 Forged by Fire",
    },
    {
      id: 3,
      title: "Apollo's Oracle Prophecy",
      subtitle: "Startup Pitch Battle",
      date: "August 27, 2025",
      time: "10:00 AM",
      location: "Oracle's Sanctum",
      category: "Sacred Trial",
      priority: "epic",
      participants: "150+ Visionaries",
      prize: "20 Glory Points",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-orange-600",
      blessing: "☀️ Illuminated by Apollo",
    },
    {
      id: 4,
      title: "Hermes' Network Mastery",
      subtitle: "IoT Solutions Workshop",
      date: "August 28, 2025",
      time: "1:00 PM",
      location: "Messenger's Domain",
      category: "Divine Workshop",
      priority: "epic",
      participants: "100+ Seekers",
      prize: "10 Glory Points",
      icon: Target,
      gradient: "from-green-500 to-teal-600",
      blessing: "🪶 Swift as Hermes",
    },
  ];

  // Premium sponsors with enhanced data
  const sponsors = [
    {
      name: "TechCorp Global",
      logo: "🏢",
      tier: "platinum",
      description: "Leading AI & Cloud Solutions",
      value: "$50K",
      industry: "Technology",
    },
    {
      name: "InnovateLab",
      logo: "🔬",
      tier: "gold",
      description: "Research & Development Pioneer",
      value: "$30K",
      industry: "R&D",
    },
    {
      name: "CodeMasters Inc",
      logo: "💻",
      tier: "gold",
      description: "Software Development Excellence",
      value: "$25K",
      industry: "Software",
    },
    {
      name: "FutureTech Systems",
      logo: "🚀",
      tier: "silver",
      description: "Next-Gen Technology Solutions",
      value: "$15K",
      industry: "Hardware",
    },
    {
      name: "GreenEnergy Solutions",
      logo: "🌱",
      tier: "silver",
      description: "Sustainable Innovation Leaders",
      value: "$12K",
      industry: "Energy",
    },
    {
      name: "DataDrive Analytics",
      logo: "📊",
      tier: "bronze",
      description: "Big Data & Analytics Platform",
      value: "$8K",
      industry: "Analytics",
    },
    {
      name: "CloudSys Networks",
      logo: "☁️",
      tier: "bronze",
      description: "Cloud Infrastructure Specialists",
      value: "$6K",
      industry: "Cloud",
    },
    {
      name: "AIVision Technologies",
      logo: "🤖",
      tier: "bronze",
      description: "Computer Vision & AI",
      value: "$5K",
      industry: "AI/ML",
    },
  ];

  const divineVirtues = [
    {
      icon: Sparkles,
      title: "Arete (Excellence)",
      description:
        "Pursue the highest virtue and mastery in all endeavors, as the gods demand nothing less than perfection from true heroes.",
      color: "from-blue-600 to-cyan-500",
      delay: "0ms",
      symbol: "⚡",
    },
    {
      icon: Users,
      title: "Philotimo (Honor)",
      description:
        "Unite mortals and immortals through honor, respect, and the sacred bonds that forge legendary alliances.",
      color: "from-green-600 to-lime-500",
      delay: "100ms",
      symbol: "🏛️",
    },
    {
      icon: Code,
      title: "Agon (Contest)",
      description:
        "Embrace the spirit of heroic competition where champions rise through trials of skill, wit, and valor.",
      color: "from-purple-600 to-pink-500",
      delay: "200ms",
      symbol: "⚔️",
    },
    {
      icon: Trophy,
      title: "Koinonia (Fellowship)",
      description:
        "Forge unbreakable bonds between heroes, creating a brotherhood that transcends mortal limitations.",
      color: "from-yellow-500 to-orange-500",
      delay: "300ms",
      symbol: "🤝",
    },
    {
      icon: HeartHandshake,
      title: "Eunoia (Benevolence)",
      description:
        "Channel divine compassion to aid the realm, spreading wisdom and healing throughout the land.",
      color: "from-red-600 to-rose-500",
      delay: "400ms",
      symbol: "💝",
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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      {/* Ultra-Modern Hero Section */}
      <section
        className="odyssey-hero"
        ref={heroRef}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/15190971/pexels-photo-15190971.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Divine Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(220,20,60,0.8) 0%, rgba(0,0,139,0.8) 50%, rgba(25,25,112,0.9) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 3 }}>
          {/* Greek Columns and Elements */}
          <div className="greek-background">
            <div className="floating-columns">
              <div className="column column-1">⚱️</div>
              <div className="column column-2">🏛️</div>
              <div className="column column-3">⚔️</div>
              <div className="column column-4">🛡️</div>
              <div className="column column-5">🏺</div>
            </div>

            {/* Divine Particles */}
            <div className="divine-particles">
              {[...Array(25)].map((_, i) => (
                <div key={i} className={`divine-particle divine-particle-${i}`}>
                  ✨
                </div>
              ))}
            </div>
          </div>

          <div className="hero-content-odyssey">
            {/* Divine Logo */}
            <div
              className="divine-logo-container"
              style={{
                transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
              }}
            >
              <img
                src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
                alt="E-Week 2025 - The Odyssey"
                className="odyssey-logo"
              />
              <div className="divine-glow"></div>
              <div className="laurel-wreath">🏆</div>
            </div>

            {/* Epic Typography */}
            <div className="hero-text-odyssey">
              <h1 className="odyssey-title">
                <span className="title-line-odyssey">THE ODYSSEY</span>
                <span className="title-year-odyssey">MMXXV</span>
                <div className="greek-underline">⚡</div>
              </h1>
              <p className="divine-subtitle">Forged by the Gods of E22</p>

              <p className="epic-quote">
                "By Zeus's thunder and Athena's wisdom, the greatest heroes
                shall rise!
                <br />
                The trials await, and only the worthy shall claim eternal
                glory!"
                <br />
                <span className="divine-highlight">
                  ⚔️ Join the Pantheon of Champions ⚔️
                </span>
              </p>
            </div>

            {/* Divine Countdown */}
            <div className="divine-countdown">
              <div className="countdown-header">
                <span>🔥 The Great Trials Begin In 🔥</span>
              </div>
              <CountdownTimer targetDate="2025-08-25T00:00:00" />
            </div>

            {/* Hero Actions */}
            <div className="odyssey-actions">
              <button
                onClick={() => setShowNotificationModal(true)}
                className="btn-odyssey btn-primary-odyssey"
              >
                <Bell size={20} />
                <span>Join the Prophecy</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollToSection("events")}
                className="btn-odyssey btn-secondary-odyssey"
              >
                <Play size={20} />
                <span>Witness the Glory</span>
              </button>
            </div>

            {/* Divine Scroll Indicator */}
            <div
              className="divine-scroll-indicator"
              onClick={() => scrollToSection("leaderboard")}
            >
              <ChevronDown size={24} />
              <span>⚡ Enter the Pantheon ⚡</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divine Pantheon Rankings */}
      <section className="odyssey-section" id="leaderboard">
        <div className="container">
          <div className="section-header-odyssey">
            <h2 className="section-title-odyssey">
              🏛️ Pantheon of Heroes 🏛️
              <Sparkles className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-odyssey">
              Behold the mighty battalions ascending to godhood through valor
              and wisdom! Which heroes shall claim their place among the
              immortals?
            </p>
          </div>

          <div className="pantheon-modern">
            {batchLeaderboard.map((batch, index) => (
              <div
                key={batch.batch}
                className={`pantheon-card ${batch.rank <= 3 ? "divine-three" : ""}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
                }}
              >
                <div
                  className={`divine-gradient bg-gradient-to-br ${batch.color}`}
                >
                  <div className="divine-rank">#{batch.rank}</div>
                  <div className="god-symbol">{batch.logo}</div>
                  <h3 className="battalion-name">{batch.batch}</h3>
                  <h4 className="divine-title">{batch.title}</h4>
                  <p className="divine-blessing">{batch.blessing}</p>

                  <div className="divine-stats">
                    <div className="glory-stat">
                      <span className="glory-number">
                        {batch.points.toLocaleString()}
                      </span>
                      <span className="glory-label">Glory Points</span>
                    </div>

                    <div className="victory-stats">
                      <div className="victory-stat">
                        <span className="victory-number">{batch.wins}</span>
                        <span className="victory-label">Victories</span>
                      </div>
                      <div className="ascension-stat">
                        <span className="ascension-number">{batch.growth}</span>
                        <span className="ascension-label">
                          Divine Ascension
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="divine-progress">
                    <div className="divine-progress-label">Path to Olympus</div>
                    <div
                      className="divine-progress-fill"
                      style={{ width: `${(batch.points / 2500) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 mb-8">
            <p className="text-white opacity-80 mb-6">
              ⚔️ Earn glory points through heroic deeds and divine trials! ⚔️
            </p>
            <div className="mt-8"></div>
            <Link
              to="/leaderboard"
              className="btn-odyssey btn-secondary-odyssey inline-flex items-center gap-10"
            >
              <Trophy size={20} />
              <span>Behold the Full Pantheon</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Epic Trials Section */}
      <section className="odyssey-section trials-section" id="events">
        <div className="container">
          <div className="section-header-odyssey">
            <h2 className="section-title-odyssey">
              ⚔️ The Great Trials ⚔️
              <Calendar className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-odyssey">
              Face the legendary challenges that will test your courage, wisdom,
              and strength! Only the worthy shall earn their place in the Hall
              of Heroes!
            </p>
          </div>

          <div className="trials-grid-odyssey">
            {upcomingEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={event.id}
                  className="trial-card-odyssey"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`trial-gradient bg-gradient-to-br ${event.gradient}`}
                  >
                    <div className="trial-header">
                      <div className="trial-icon">
                        <IconComponent size={24} />
                      </div>
                      <div className="trial-priority">
                        <span className={`legend-badge ${event.priority}`}>
                          {event.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <h3 className="trial-title">{event.title}</h3>
                    <h4 className="trial-subtitle">{event.subtitle}</h4>
                    <p className="divine-blessing-text">{event.blessing}</p>

                    <div className="trial-details">
                      <div className="detail-item-trial">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="detail-item-trial">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item-trial">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="trial-stats">
                      <div className="heroes-pill">
                        <Users size={14} />
                        <span>{event.participants}</span>
                      </div>
                      <div className="glory-pill">
                        <Award size={14} />
                        <span>{event.prize}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divine Patron Gods Showcase */}
      <section className="odyssey-section patrons-section">
        <div className="container">
          <div className="section-header-odyssey">
            <h2 className="section-title-odyssey">
              🏛️ Patron Gods & Benefactors 🏛️
              <Star className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-odyssey">
              Blessed by divine patrons and mortal allies who support our heroic
              endeavors
            </p>
          </div>

          <div className="sponsors-showcase">
            <div className="sponsors-track">
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className={`sponsor-card-modern ${sponsor.tier}`}
                >
                  <div className="sponsor-tier-badge">{sponsor.tier}</div>
                  <div className="sponsor-logo-modern">{sponsor.logo}</div>
                  <h3 className="sponsor-name-modern">{sponsor.name}</h3>
                  <p className="sponsor-description-modern">
                    {sponsor.description}
                  </p>
                  <div className="sponsor-meta">
                    <span className="sponsor-value">{sponsor.value}</span>
                    <span className="sponsor-industry">{sponsor.industry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divine Virtues */}
      <section className="odyssey-section virtues-section">
        <div className="container">
          <div className="section-header-odyssey">
            <h2 className="section-title-odyssey">
              ⚡ The Five Sacred Virtues ⚡
              <Zap className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-odyssey">
              Discover the divine principles that guide our epic odyssey
            </p>
          </div>

          <div className="virtues-grid-odyssey">
            {divineVirtues.map((virtue, index) => {
              const IconComponent = virtue.icon;
              return (
                <div
                  key={index}
                  className="virtue-card-odyssey"
                  style={{ animationDelay: virtue.delay }}
                >
                  <div
                    className={`virtue-gradient bg-gradient-to-br ${virtue.color}`}
                  >
                    <div className="virtue-symbol">{virtue.symbol}</div>
                    <div className="virtue-icon-odyssey">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="virtue-title-odyssey">{virtue.title}</h3>
                    <p className="virtue-description-odyssey">
                      {virtue.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divine Temple Footer */}
      <footer className="divine-footer">
        <div className="container">
          <div className="footer-content-odyssey">
            <div className="footer-temple-section">
              <img
                src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
                alt="The Odyssey 2025"
                className="footer-logo-odyssey"
              />
              <p className="footer-prophecy">
                🏛️ Forging Legends, Honoring Excellence 🏛️
              </p>
            </div>

            <div className="footer-temple-info">
              <p className="footer-text-odyssey">
                🏺 Sacred Halls of Jaffna • Temple of Engineering Wisdom 🏺
              </p>
              <p className="footer-inscription-odyssey">
                ⚡ THE ODYSSEY MMXXV • BLESSED BY THE GODS OF E22 ⚡
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Divine Oracle Prophecy Modal */}
      {showNotificationModal && (
        <div className="oracle-overlay-divine">
          <div className="oracle-content-divine">
            <div className="oracle-header-divine">
              <h3 className="oracle-title-divine">
                🔮 Receive the Divine Prophecy 🔮
              </h3>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="oracle-close-divine"
              >
                ×
              </button>
            </div>

            {!isRegistered ? (
              <form
                onSubmit={handleNotificationSignup}
                className="oracle-form-divine"
              >
                <p className="oracle-description">
                  Let the Oracle's whispers reach you with sacred knowledge of
                  trials ahead! Be among the first to receive divine messages
                  when the great challenges begin!
                </p>

                <div className="input-group-divine">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your sacred scroll address"
                    className="input-divine"
                    required
                  />
                  <div className="input-divine-glow"></div>
                </div>

                <div className="oracle-actions-divine">
                  <button
                    type="submit"
                    className="btn-divine btn-primary-divine full-width"
                  >
                    <Bell size={20} />
                    <span>Receive the Prophecy</span>
                    <Sparkles size={16} />
                  </button>
                </div>

                <p className="oracle-footer-text">
                  🏛️ Join 500+ heroes who've received the divine messages! 🏛️
                </p>
              </form>
            ) : (
              <div className="blessing-message-divine">
                <div className="blessing-icon">⚡</div>
                <h4 className="blessing-title">The Gods Have Blessed You!</h4>
                <p className="blessing-description">
                  You are now chosen among the heroes! The Oracle shall whisper
                  to you when the great trials begin. May the gods favor your
                  journey!
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
