import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CountdownTimer from "../components/CountdownTimer";

import {
    Badge, Users, Speaker, MoreHorizontal,
  Calendar,
  Trophy,
  Settings,
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

const logos = [
  "/e21.jpg", // E21 logo
  "/e22.jpg", // E22 logo
  "/e23.png", // E23 logo
  "/e24.png"  // E24 logo
];



const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [leaderBoardRows, setLeaderBoardRows] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  
  const categoryIcons = {
  Competition: <Trophy size={24} color="#FFD700" />,
   Workshop: <Settings size={24} color="#2196F3" />,
  Social: <Users size={24} color="#9C27B0" />,
  Conference: <Speaker size={24} color="#FF5722" />,
  Other: <MoreHorizontal size={24} color="#607D8B" />,
  Ceremony: <Badge size={24} color="#FFC107" />,
};

  
  useEffect(() => {
      const fetchLeaderBoard = async () => {
        try {
          const response = await fetch("/api/leaderboard/getLeaderBoard");
          if (!response.ok) throw new Error("Failed to fetch leaderboard data");
          const data = await response.json();
          const teams = ["E21", "E22", "E23", "E24"];
          const teamData = teams.map((team) => {
            const rankArray = data[`${team}Rank`] || [];
            const totalWonEvents = rankArray.filter(
              (rank) => rank && rank.toLowerCase() === "winners"
            ).length;
            const members = Math.floor(Math.random() * 10) + 40;
  
            return {
              team,
              members,
              points: data[`${team}Points`] || 0,
              totalWonEvents,
              podiums: rankArray.filter(
                (rank) => rank && rank.toLowerCase() !== "thirdrunnerup"
              ).length,
              improvement: data[`${team}Improvement`] || 0,
            };
          });
  
          const sortedTeams = teamData.sort((a, b) => b.points - a.points);
          setLeaderBoardRows(sortedTeams);
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
        }
      };
  
      fetchLeaderBoard();
      fetchUpcomingEvents();
      
    }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/createEvents/UpcomingEvents"
      );
      if (!response.ok) throw new Error("Failed to fetch upcoming events");
      const data = await response.json();
      setUpcomingEvents(data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };



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

  const modernFeatures = [
    {
      icon: Sparkles,
      title: "Engineering Excellence",
      description:
        "Showcase the capabilities, achievements, and unity of the Faculty of Engineering to the world.",
      color: "from-blue-600 to-cyan-500",
      delay: "0ms",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description:
        "Inspire and educate society through workshops, seminars, and school outreach programs.",
      color: "from-green-600 to-lime-500",
      delay: "100ms",
    },
    {
      icon: Code,
      title: "Dynamic Competitions",
      description:
        "Unleash talent through design, coding, gaming, and creativity contests across disciplines.",
      color: "from-purple-600 to-pink-500",
      delay: "200ms",
    },
    {
      icon: Trophy,
      title: "Unity & Collaboration",
      description:
        "Foster strong bonds between students, staff, and the community through shared goals and teamwork.",
      color: "from-yellow-500 to-orange-500",
      delay: "300ms",
    },
    {
      icon: HeartHandshake,
      title: "Social Responsibility",
      description:
        "Give back to society with initiatives like blood donation campaigns and public awareness drives.",
      color: "from-red-600 to-rose-500",
      delay: "400ms",
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
        className="modern-hero"
        ref={heroRef}
        style={{
          backgroundImage: "url('/greek-gods-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 3 }}>
          {/* Animated Background */}
          <div className="hero-background">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
            </div>

            {/* Particle Effect */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i}`}></div>
              ))}
            </div>
          </div>

          <div className="hero-content-modern">
            {/* Floating Logo */}
            <div
              className="logo-container"
              style={{
                transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
              }}
            >
              <img
                src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
                alt="E-Week 2025"
                className="modern-logo"
              />
              <div className="logo-glow"></div>
            </div>

            {/* Modern Typography */}
            <div className="hero-text">
              <h1 className="modern-title">
                <span className="title-line">E-WEEK</span>
                <span className="title-year">2K25</span>
                <div className="title-underline"></div>
              </h1>
              <p className="countdown-title">Organized By E22</p>

              <p className="modern-subtitle">
                Warriors of the Odyssey, rise! The storm is near, and only the
                brave shall write history.
                <br />
                <span className="highlight-text">
                  Get ready into the battle.
                </span>
              </p>
            </div>

            {/* Enhanced Countdown */}
            <div className="modern-countdown">
              <CountdownTimer targetDate="2025-08-25T00:00:00" />
            </div>

            {/* Modern CTA Buttons */}
            <div className="modern-actions">
              <button
                onClick={() => setShowNotificationModal(true)}
                className="btn-modern btn-primary-modern"
              >
                <Bell size={20} />
                <span>Register for Notifications</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollToSection("events")}
                className="btn-modern btn-secondary-modern"
              >
                <Play size={20} />
                <span>Watch Trailer</span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div
              className="scroll-indicator"
              onClick={() => scrollToSection("leaderboard")}
            >
              <ChevronDown size={24} />
              <span>Explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Batch Competition */}
      <section className="modern-section" id="leaderboard">
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-title-modern">
              Batch Competition
              <Sparkles className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-modern">
              Real-time leaderboard showing which engineering batch is
              dominating the events
            </p>
          </div>

          <div className="leaderboard-modern">
            {leaderBoardRows.map((row,i) => (
              
              
              <div
                key={row.team}
                className={`leaderboard-card ${i+1 <= 3 ? "top-three" : ""}`}
                style={{
                  animationDelay: `${(i+1)* 100}ms`,
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
                }}
              >
                <div
                  className={`card-gradient bg-gradient-to-br yellow-400 to-yellow-600`}
                >
                  <div className="rank-badge">#{i+1}</div>
                  <div className="batch-emoji">
                    <img
                      src={
                        row.team === "E21"
                          ? logos[0]
                          : row.team === "E22"
                          ? logos[1]
                          : row.team === "E23"
                          ? logos[2]
                          : row.team === "E24"
                          ? logos[3]
                          : ""
                      }
                      alt={row.team + " logo"}
                      style={{ width: "100px", height: "auto" }} 
                    />
                  </div>
                  <h3 className="batch-name">{row.team}</h3>

                  <div className="stats-section">
                    <div className="main-stat">
                      <span className="stat-number">
                        {row.points.toLocaleString()}
                      </span>
                      <span className="stat-label">Points</span>
                    </div>

                    <div className="sub-stats">
                      <div className="sub-stat">
                        <span className="sub-number">{row.totalWonEvents}</span>
                        <span className="sub-label">Wins</span>
                      </div>
                        <div className="sub-stat growth">
                   <span
                   style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  color:
               row.improvement < 0
                    ? "red"
                  : row.improvement === 0
                 ? "gray"
                 : "green",
  }}
>
  {row.improvement}%
</span>

                     <span className="sub-label">Growth Rate</span>
                         </div>

                    </div>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(row.points / 2500) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 mb-8">
            <p className="text-white opacity-80 mb-6">
              🎯 Earn points by participating in event activities!
            </p>
            <div className="mt-8"></div>
            <Link
              to="/leaderboard"
              className="btn-modern btn-secondary-modern inline-flex items-center gap-10"
            >
              <Trophy size={20} />
              <span>View Full Leaderboard</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Events Section */}
      <section className="modern-section events-section" id="events">
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-title-modern">
              Upcoming Events
              <Calendar className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-modern">
              Cutting-edge competitions and workshops designed for the next
              generation of engineers
            </p>
          </div>

          <div className="events-grid-modern">
            {upcomingEvents.map((event,_id) => {
             
              return (
                <div
                  key={_id}
                  className="event-card-modern"
                  style={{ animationDelay: `${2* 150}ms` }}
                >
                  <div
                    className={`event-gradient bg-gradient-to-br yellow-400 to-yellow-600`}
                  >
                      <div className="event-header">
                        

                      <div className="event-icon">
                        <Calendar size={24} color="blue" />
                      </div>
                      <span>
                     {categoryIcons[event.category] || <MoreHorizontal size={24} />}
                     </span>

                    </div>

                    <h3 className="event-title">{event.title}</h3>

                    <div className="event-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                      <span>
                        {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                        .format(new Date(event.date))}
                      </span>

                      </div>
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  
                   {event.category === "Competition" && (
                  <div className="event-stats">
                    <div className="stat-pill">
                   <Users size={14} />
                    <span>{event.MaxNoOfParticipantsPerTeam}</span>
                    </div>
                   <div className="stat-pill prize">
                      <Award size={14} />
                     <span>{event.pointsConfiguration[0]}</span>
                    </div>
                           </div>
)}

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Sponsors Showcase */}
      <section className="modern-section sponsors-section">
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-title-modern">
              Premium Partners
              <Star className="title-icon" size={32} />
            </h2>
            <p className="section-subtitle-modern">
              Powered by industry leaders investing in the future of engineering
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

      {/* Modern Features */}
      <section className="modern-section features-section">
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-title-modern">
              Why E-WEEK 2K25 Excellent?
              <Zap className="title-icon" size={32} />
            </h2>
          </div>

          <div className="features-grid-modern">
            {modernFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card-modern"
                  style={{ animationDelay: feature.delay }}
                >
                  <div
                    className={`feature-gradient bg-gradient-to-br ${feature.color}`}
                  >
                    <div className="feature-icon-modern">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="feature-title-modern">{feature.title}</h3>
                    <p className="feature-description-modern">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="modern-footer">
        <div className="container">
          <div className="footer-content-modern">
            <div className="footer-logo-section">
              <img
                src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
                alt="E-Week 2025"
                className="footer-logo-modern"
              />
              <p className="footer-tagline">Engineering the Future, Together</p>
            </div>

            <div className="footer-info">
              <p className="footer-text-modern">
                University of Jaffna • Faculty of Engineering
              </p>
              <p className="footer-copyright-modern">
                © E-WEEK 2K25 • ORGANIZED BY E22
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Ultra-Modern Notification Modal */}
      {showNotificationModal && (
        <div className="modal-overlay-modern">
          <div className="modal-content-modern">
            <div className="modal-header-modern">
              <h3 className="modal-title-modern">
                🚀 Join the E-WEEK 2K25 Journey
              </h3>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="modal-close-modern"
              >
                ×
              </button>
            </div>

            {!isRegistered ? (
              <form
                onSubmit={handleNotificationSignup}
                className="modal-form-modern"
              >
                <p className="modal-description">
                  Get exclusive notifications, event updates, and be the first
                  to know when registration opens!
                </p>

                <div className="input-group-modern">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="input-modern"
                    required
                  />
                  <div className="input-glow"></div>
                </div>

                <div className="modal-actions-modern">
                  <button
                    type="submit"
                    className="btn-modern btn-primary-modern full-width"
                  >
                    <Bell size={20} />
                    <span>Notify Me</span>
                    <Sparkles size={16} />
                  </button>
                </div>

                <p className="modal-footer-text">
                  Join 500+ already signed up!
                </p>
              </form>
            ) : (
              <div className="success-message-modern">
                <div className="success-icon">🎉</div>
                <h4 className="success-title">Welcome Aboard!</h4>
                <p className="success-description">
                  You're now part of the E-Week 2025 community. Get ready for an
                  amazing journey!
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
