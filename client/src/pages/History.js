import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Calendar,
  Users,
  Target,
  Flame,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

const History = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeCategory, setActiveCategory] = useState("overall");
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

  // Historical E-Week data
  const eweekHistory = [
    {
      year: 2024,
      theme: "Digital Revolution",
      totalParticipants: 1250,
      totalEvents: 28,
      overallChampion: "E21",
      championPoints: 4850,
      categories: {
        overall: {
          champion: "E21",
          runnerUp: "E22",
          third: "E23",
          points: { first: 4850, second: 4620, third: 4380 },
        },
        technical: {
          champion: "E20",
          runnerUp: "E21",
          third: "E24",
          events: ["AI Hackathon", "Code Marathon", "Tech Innovation"],
        },
        engineering: {
          champion: "E22",
          runnerUp: "E21",
          third: "E20",
          events: [
            "Robotics Challenge",
            "Design Sprint",
            "Engineering Excellence",
          ],
        },
        innovation: {
          champion: "E21",
          runnerUp: "E23",
          third: "E22",
          events: ["Startup Pitch", "Innovation Lab", "Creative Solutions"],
        },
      },
      highlights: [
        "Record breaking 1,250 participants",
        "First-ever AI & Machine Learning track",
        "International collaboration with 5 universities",
        "€50,000 total prize pool",
      ],
      memorableEvents: [
        {
          name: "AI Revolution Hackathon",
          winner: "Neural Networks E20",
          description: "48-hour intensive AI development challenge",
        },
        {
          name: "Quantum Computing Workshop",
          winner: "Quantum Pioneers E21",
          description: "Breakthrough quantum algorithm development",
        },
        {
          name: "Sustainability Tech Challenge",
          winner: "Green Innovators E22",
          description: "Environmental solutions using technology",
        },
      ],
    },
    {
      year: 2023,
      theme: "Tech for Tomorrow",
      totalParticipants: 1180,
      totalEvents: 25,
      overallChampion: "E20",
      championPoints: 4650,
      categories: {
        overall: {
          champion: "E20",
          runnerUp: "E21",
          third: "E19",
          points: { first: 4650, second: 4420, third: 4200 },
        },
        technical: {
          champion: "E21",
          runnerUp: "E20",
          third: "E22",
          events: ["Web3 Development", "Cybersecurity CTF", "Cloud Computing"],
        },
        engineering: {
          champion: "E20",
          runnerUp: "E19",
          third: "E21",
          events: ["IoT Challenge", "Mechanical Design", "Systems Engineering"],
        },
        innovation: {
          champion: "E19",
          runnerUp: "E20",
          third: "E21",
          events: [
            "Blockchain Solutions",
            "AR/VR Experience",
            "Digital Transformation",
          ],
        },
      },
      highlights: [
        "Introduction of Web3 and Blockchain track",
        "Partnership with major tech companies",
        "First virtual reality competition",
        "€45,000 prize distribution",
      ],
      memorableEvents: [
        {
          name: "Metaverse Development Challenge",
          winner: "VR Visionaries E19",
          description: "Immersive virtual reality experience creation",
        },
        {
          name: "Blockchain Innovation Lab",
          winner: "Crypto Creators E20",
          description: "Decentralized application development",
        },
      ],
    },
    {
      year: 2022,
      theme: "Future Engineering",
      totalParticipants: 1050,
      totalEvents: 22,
      overallChampion: "E19",
      championPoints: 4380,
      categories: {
        overall: {
          champion: "E19",
          runnerUp: "E20",
          third: "E18",
          points: { first: 4380, second: 4150, third: 3950 },
        },
        technical: {
          champion: "E20",
          runnerUp: "E19",
          third: "E18",
          events: [
            "Python Championship",
            "Data Science Sprint",
            "Mobile App Dev",
          ],
        },
        engineering: {
          champion: "E19",
          runnerUp: "E18",
          third: "E20",
          events: [
            "Mechanical Excellence",
            "Electrical Innovation",
            "Civil Engineering",
          ],
        },
        innovation: {
          champion: "E18",
          runnerUp: "E19",
          third: "E20",
          events: [
            "Design Thinking",
            "Product Innovation",
            "Startup Simulator",
          ],
        },
      },
      highlights: [
        "Launch of Data Science track",
        "International guest speakers program",
        "Industry mentorship initiative",
        "€40,000 in prizes and scholarships",
      ],
      memorableEvents: [
        {
          name: "Data Science Olympics",
          winner: "Data Dynamos E20",
          description: "Machine learning and analytics competition",
        },
        {
          name: "Engineering Excellence Showcase",
          winner: "Precision Engineers E19",
          description: "Multi-disciplinary engineering challenge",
        },
      ],
    },
    {
      year: 2021,
      theme: "Innovation Unleashed",
      totalParticipants: 980,
      totalEvents: 20,
      overallChampion: "E18",
      championPoints: 4120,
      categories: {
        overall: {
          champion: "E18",
          runnerUp: "E19",
          third: "E17",
          points: { first: 4120, second: 3890, third: 3680 },
        },
        technical: {
          champion: "E19",
          runnerUp: "E18",
          third: "E17",
          events: [
            "Algorithm Design",
            "Software Engineering",
            "Database Challenge",
          ],
        },
        engineering: {
          champion: "E18",
          runnerUp: "E17",
          third: "E19",
          events: ["Robotics Build", "CAD Competition", "Circuit Design"],
        },
        innovation: {
          champion: "E17",
          runnerUp: "E18",
          third: "E19",
          events: [
            "Innovation Lab",
            "Creative Problem Solving",
            "Business Plan",
          ],
        },
      },
      highlights: [
        "First hybrid online-offline format",
        "Global virtual participation",
        "Innovation mentorship program",
        "€35,000 total awards",
      ],
      memorableEvents: [
        {
          name: "Virtual Reality Innovation",
          winner: "Digital Dreamers E17",
          description: "VR solution development for education",
        },
        {
          name: "COVID-19 Solution Challenge",
          winner: "Health Tech Heroes E18",
          description: "Technology solutions for pandemic challenges",
        },
      ],
    },
    {
      year: 2020,
      theme: "Engineering Excellence",
      totalParticipants: 920,
      totalEvents: 18,
      overallChampion: "E17",
      championPoints: 3950,
      categories: {
        overall: {
          champion: "E17",
          runnerUp: "E18",
          third: "E16",
          points: { first: 3950, second: 3720, third: 3500 },
        },
        technical: {
          champion: "E18",
          runnerUp: "E17",
          third: "E16",
          events: ["Coding Marathon", "Tech Innovation", "Digital Solutions"],
        },
        engineering: {
          champion: "E17",
          runnerUp: "E16",
          third: "E18",
          events: [
            "Mechanical Design",
            "Electrical Systems",
            "Structural Engineering",
          ],
        },
        innovation: {
          champion: "E16",
          runnerUp: "E17",
          third: "E18",
          events: [
            "Creative Engineering",
            "Problem Solving",
            "Innovation Sprint",
          ],
        },
      },
      highlights: [
        "Record engineering participation",
        "Industry partnership expansion",
        "Alumni mentorship network",
        "€30,000 scholarship fund",
      ],
      memorableEvents: [
        {
          name: "Engineering Grand Challenge",
          winner: "Elite Engineers E17",
          description: "Comprehensive engineering problem solving",
        },
        {
          name: "Sustainable Design Competition",
          winner: "Eco Innovators E16",
          description: "Environmental engineering solutions",
        },
      ],
    },
  ];

  const years = eweekHistory.map((h) => h.year);
  const currentYearData = eweekHistory.find((h) => h.year === selectedYear);

  const categories = [
    {
      id: "overall",
      label: "Overall Championship",
      icon: <Crown className="w-5 h-5" />,
    },
    {
      id: "technical",
      label: "Technical Excellence",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "engineering",
      label: "Engineering Mastery",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "innovation",
      label: "Innovation Leadership",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const getBatchColor = (batch) => {
    const colors = {
      E24: "from-purple-500 to-pink-500",
      E23: "from-blue-500 to-cyan-500",
      E22: "from-green-500 to-teal-500",
      E21: "from-yellow-500 to-orange-500",
      E20: "from-red-500 to-pink-500",
      E19: "from-indigo-500 to-purple-500",
      E18: "from-cyan-500 to-blue-500",
      E17: "from-emerald-500 to-green-500",
      E16: "from-orange-500 to-red-500",
    };
    return colors[batch] || "from-gray-500 to-gray-600";
  };

  return (
    <Layout>
      <div className="history-page animate-slide-up">
        {/* Hero Section */}
        <section className="history-hero" ref={heroRef}>
          {/* Animated Background like Events page */}
          <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />
          <div className="history-hero-bg">
            {/* Enhanced Floating Shapes */}
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
            </div>

            {/* Enhanced Particle Effect */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i}`}></div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="history-hero-content">
              <div
                className="history-hero-icon"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <HistoryIcon className="w-16 h-16" />
                <div className="logo-glow"></div>
              </div>
              <h1 className="history-hero-title hero-title-events">E-Week History</h1>
              <p className="history-hero-subtitle hero-subtitle-events">
                Explore the legacy, champions, and milestones of E-Week through the years
              </p>
            </div>
          </div>
        </section>

        {/* Year Navigation */}
        <section className="history-hero" ref={heroRef}>
        <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />
          <div className="container">
            <div className="year-selector">
              <button
                onClick={() => {
                  const currentIndex = years.indexOf(selectedYear);
                  if (currentIndex < years.length - 1) {
                    setSelectedYear(years[currentIndex + 1]);
                  }
                }}
                className="nav-arrow"
                disabled={years.indexOf(selectedYear) === years.length - 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="years-grid">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`year-btn ${selectedYear === year ? "active" : ""}`}
                  >
                    <span className="year-number">{year}</span>
                    <span className="year-theme">
                      {eweekHistory.find((h) => h.year === year)?.theme}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  const currentIndex = years.indexOf(selectedYear);
                  if (currentIndex > 0) {
                    setSelectedYear(years[currentIndex - 1]);
                  }
                }}
                className="nav-arrow"
                disabled={years.indexOf(selectedYear) === 0}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Year Overview */}
        <section className="year-overview">
          <div className="container">
            <div className="overview-header">
              <h2 className="overview-title">E-Week {selectedYear}</h2>
              <p className="overview-theme">"{currentYearData?.theme}"</p>
            </div>

            <div className="overview-stats">
              <div className="overview-stat">
                <Users className="w-6 h-6" />
                <span className="stat-number">
                  {currentYearData?.totalParticipants.toLocaleString()}
                </span>
                <span className="stat-label">Participants</span>
              </div>
              <div className="overview-stat">
                <Calendar className="w-6 h-6" />
                <span className="stat-number">
                  {currentYearData?.totalEvents}
                </span>
                <span className="stat-label">Events</span>
              </div>
              <div className="overview-stat">
                <Crown className="w-6 h-6" />
                <span className="stat-number">
                  {currentYearData?.overallChampion}
                </span>
                <span className="stat-label">Champion</span>
              </div>
              <div className="overview-stat">
                <Target className="w-6 h-6" />
                <span className="stat-number">
                  {currentYearData?.championPoints}
                </span>
                <span className="stat-label">Points</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="category-navigation">
          <div className="container">
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-tab ${activeCategory === category.id ? "active" : ""}`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Champions Display */}
        <section className="champions-display">
          <div className="container">
            {activeCategory === "overall" ? (
              <div className="champions-podium">
                <div className="podium-container">
                  {/* Second Place */}
                  <div className="podium-position second">
                    <div className="position-number">2</div>
                    <div
                      className={`champion-card bg-gradient-to-br ${getBatchColor(currentYearData?.categories.overall.runnerUp)}`}
                    >
                      <div className="champion-badge">
                        <Medal className="w-8 h-8 text-gray-300" />
                      </div>
                      <h3 className="champion-batch">
                        {currentYearData?.categories.overall.runnerUp}
                      </h3>
                      <p className="champion-points">
                        {currentYearData?.categories.overall.points.second} pts
                      </p>
                    </div>
                  </div>

                  {/* First Place */}
                  <div className="podium-position first">
                    <div className="position-number">1</div>
                    <div
                      className={`champion-card champion bg-gradient-to-br ${getBatchColor(currentYearData?.categories.overall.champion)}`}
                    >
                      <div className="champion-badge">
                        <Crown className="w-10 h-10 text-yellow-400" />
                      </div>
                      <h3 className="champion-batch">
                        {currentYearData?.categories.overall.champion}
                      </h3>
                      <p className="champion-points">
                        {currentYearData?.categories.overall.points.first} pts
                      </p>
                      <div className="champion-title">Overall Champion</div>
                    </div>
                  </div>

                  {/* Third Place */}
                  <div className="podium-position third">
                    <div className="position-number">3</div>
                    <div
                      className={`champion-card bg-gradient-to-br ${getBatchColor(currentYearData?.categories.overall.third)}`}
                    >
                      <div className="champion-badge">
                        <Award className="w-8 h-8 text-amber-500" />
                      </div>
                      <h3 className="champion-batch">
                        {currentYearData?.categories.overall.third}
                      </h3>
                      <p className="champion-points">
                        {currentYearData?.categories.overall.points.third} pts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="category-champions">
                <div className="category-header">
                  <h3 className="category-title">
                    {categories.find((c) => c.id === activeCategory)?.icon}
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </h3>
                </div>

                <div className="category-results">
                  <div className="results-podium">
                    {[
                      {
                        position: 1,
                        batch:
                          currentYearData?.categories[activeCategory]?.champion,
                        icon: <Trophy className="w-6 h-6" />,
                      },
                      {
                        position: 2,
                        batch:
                          currentYearData?.categories[activeCategory]?.runnerUp,
                        icon: <Medal className="w-6 h-6" />,
                      },
                      {
                        position: 3,
                        batch:
                          currentYearData?.categories[activeCategory]?.third,
                        icon: <Award className="w-6 h-6" />,
                      },
                    ].map((result) => (
                      <div key={result.position} className="result-card">
                        <div className="result-position">{result.position}</div>
                        <div
                          className={`result-batch bg-gradient-to-br ${getBatchColor(result.batch)}`}
                        >
                          {result.icon}
                          <span>{result.batch}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="category-events">
                    <h4>Key Events</h4>
                    <div className="events-list">
                      {currentYearData?.categories[activeCategory]?.events?.map(
                        (event, index) => (
                          <div key={index} className="event-item">
                            <Flame className="w-4 h-4" />
                            <span>{event}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Year Highlights */}
        <section className="year-highlights">
          <div className="container">
            <h3 className="highlights-title">Year Highlights</h3>
            <div className="highlights-grid">
              {currentYearData?.highlights.map((highlight, index) => (
                <div key={index} className="highlight-card">
                  <TrendingUp className="w-6 h-6" />
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Memorable Events */}
        <section className="memorable-events">
          <div className="container">
            <h3 className="memorable-title">Memorable Events</h3>
            <div className="memorable-grid">
              {currentYearData?.memorableEvents.map((event, index) => (
                <div key={index} className="memorable-card">
                  <div className="memorable-header">
                    <Star className="w-6 h-6" />
                    <h4>{event.name}</h4>
                  </div>
                  <div className="memorable-winner">
                    <Trophy className="w-4 h-4" />
                    <span>Winner: {event.winner}</span>
                  </div>
                  <p className="memorable-description">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default History;
