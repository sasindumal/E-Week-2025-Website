import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Code,
  Palette,
  Box,
  Gamepad2,
  Users,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Star,
  Target,
  Zap,
  Play,
  Monitor,
  Smartphone,
  Joystick,
  Award,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Shield,
  Car,
  Crosshair,
  Wrench,
  Cpu,
  ArrowRight,
} from "lucide-react";

const SkillStorm = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [registrationModal, setRegistrationModal] = useState(null);
  const [expandedSection, setExpandedSection] = useState("pc-games");

  // Registration modal handler
  const openRegistration = (competition) => {
    setRegistrationModal(competition);
  };

  const closeRegistration = () => {
    setRegistrationModal(null);
  };

  // Main competitions data
  const mainCompetitions = [
    {
      id: "codeyssey",
      name: "Codeyssey",
      subtitle: "Coding Competition for Talented Students",
      description:
        "Showcase your programming prowess in this ultimate coding challenge",
      icon: Code,
      gradient: "from-blue-500 to-purple-600",
      requirements: {
        teams: "Only 2 groups per batch can apply",
        members: "3 to 5 members per group",
        eligibility: "All engineering students",
      },
      prizes: [
        "$2,000 First Prize",
        "Internship Opportunities",
        "Tech Gadgets",
      ],
      duration: "6 hours",
      format: "Algorithm & Problem Solving",
    },
    {
      id: "pixel-ares",
      name: "Pixel Ares",
      subtitle: "Graphic Design Competition",
      description:
        "Unleash your creativity and design skills in this visual masterpiece challenge",
      icon: Palette,
      gradient: "from-pink-500 to-orange-600",
      requirements: {
        teams: "Individual competition",
        members: "Maximum 10 members per batch",
        eligibility: "Creative minds welcome",
      },
      prizes: [
        "Design Software Licenses",
        "Professional Portfolio Review",
        "Art Supplies",
      ],
      duration: "4 hours",
      format: "Creative Design Challenge",
    },
    {
      id: "titan-cad",
      name: "Titan CAD",
      subtitle: "SolidWorks Competition",
      description:
        "Engineer your way to victory with advanced 3D modeling and design",
      icon: Box,
      gradient: "from-green-500 to-teal-600",
      requirements: {
        teams: "Only 5 groups per batch can apply",
        members: "Exactly 2 members per group",
        eligibility: "Engineering students",
      },
      prizes: [
        "CAD Software Licenses",
        "3D Printer Access",
        "Engineering Kits",
      ],
      duration: "5 hours",
      format: "3D Modeling & Engineering",
    },
  ];

  // Esports competitions data
  const pcGames = [
    {
      id: "valorant",
      name: "Valorant",
      mode: "Unrated – Tournament Mode",
      teamSize: "5 players + 1 substitute",
      format: "Single/Double Elimination",
      restriction: "One team per batch",
      icon: Target,
      gradient: "from-red-500 to-pink-600",
      rules: [
        "Maximum FIVE players per team",
        "One substitute player allowed",
        "Each player registered for only one team",
        "Substitute must be registered before tournament",
        "Non-registered players not allowed",
        "Match overturn possible for violations",
      ],
    },
    {
      id: "six-siege",
      name: "Rainbow Six Siege",
      mode: "Tactical Shooter",
      teamSize: "5 players",
      format: "Tournament Format",
      restriction: "Random map selection",
      icon: Shield,
      gradient: "from-gray-600 to-blue-600",
      mapPool: ["House", "Chalet", "Club House", "Kanal", "Oregon"],
      matchDetails: [
        "2 rounds per match",
        "Preparation time: 60s",
        "Action phase: 300s",
        "Friendly fire disabled",
        "Damage Handicap: 150",
        "Hostage damage disabled",
        "Secure time limit: 15s",
        "Diffuser plant time: 10s",
      ],
    },
    {
      id: "blur",
      name: "Blur",
      mode: "Racing Competition",
      teamSize: "4 players maximum",
      format: "Class A and B available",
      restriction: "Four players per batch",
      icon: Car,
      gradient: "from-yellow-500 to-orange-600",
      mapPool: [
        "SanFran Sausalito – Bay Area Tour (3 Laps)",
        "La River – Concrete Basin (3 Laps)",
        "La Docks – Cago Run (3 Laps)",
        "Hollywood Hills – Hollywood Rift (2 Laps)",
        "Brighton – Coastal Cruice (3 Laps)",
        "Barcelona Gracia – Passeig De Gracia (3 Laps)",
        "Amboy – Route 66 (2 Laps)",
      ],
    },
    {
      id: "cod4",
      name: "COD 4 (Search & Destroy)",
      mode: "Search and Destroy",
      teamSize: "5 players (1 girl required)",
      format: "SND 10 minutes",
      restriction: "One team per batch",
      icon: Crosshair,
      gradient: "from-green-600 to-teal-600",
      mapPool: [
        "Crash",
        "Carnival",
        "Terminal",
        "Estate",
        "Karachchi",
        "Scrapyard",
      ],
      rules: [
        "Maximum FIVE players per team",
        "At least one girl per team",
        "Non-permitted key bindings illegal",
        "10-minute SND matches",
        "Winner chooses map, loser chooses side",
        "Friendly fire disabled",
        "Kill streak rewards disabled",
      ],
    },
    {
      id: "nfs-girls",
      name: "Need for Speed Most Wanted",
      mode: "Girls Only Racing",
      teamSize: "4 girls maximum",
      format: "Racing Tournament",
      restriction: "Girls only from each batch",
      icon: Car,
      gradient: "from-purple-500 to-pink-600",
      rules: [
        "Maximum four girls per batch",
        "Maps announced prior to game",
        "Single/Double elimination format",
        "Female participants only",
      ],
    },
  ];

  const mobileGames = [
    {
      id: "pubg-mobile",
      name: "PUBG Mobile",
      mode: "Battle Royale",
      teamSize: "4 teams per batch",
      format: "Mobile platform only",
      restriction: "No emulators allowed",
      icon: Target,
      gradient: "from-orange-500 to-red-600",
      mapPool: ["Erangel", "Sanhok"],
      rules: [
        "Maximum 4 teams per batch",
        "Mobile platform only - no emulators",
        "TDM mode if less than 8 teams",
        "Bring your own device",
        "No dress code required",
      ],
    },
    {
      id: "cod-mobile",
      name: "COD Mobile",
      mode: "Mobile Warfare",
      teamSize: "TBD",
      format: "Mobile Tournament",
      restriction: "Mobile only",
      icon: Crosshair,
      gradient: "from-blue-500 to-purple-600",
      rules: [
        "Mobile devices only",
        "Tournament format TBD",
        "Bring your own device",
      ],
    },
  ];

  const funGames = [
    {
      id: "monopoly",
      name: "Monopoly",
      platform: "PC",
      type: "Strategy Board Game",
      registration: "No registration required",
      icon: Joystick,
      gradient: "from-green-500 to-blue-500",
    },
    {
      id: "omi",
      name: "Omi",
      platform: "Mobile",
      type: "Casual Game",
      registration: "No registration required",
      icon: Smartphone,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <Layout>
      <div className="skillstorm-page">
        {/* Hero Section */}
        <section className="skillstorm-hero">
          <div className="hero-background-skillstorm"></div>
          <div className="container">
            <div className="hero-content-skillstorm">
              {/* SkillStorm Logo */}
              <div className="skillstorm-logo-container">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Faae1c430463649c0addd533bd2f58c0c?format=webp&width=800"
                  alt="SkillStorm Logo"
                  className="skillstorm-logo"
                />
                <div className="logo-glow-skillstorm"></div>
              </div>

              <h1 className="hero-title-skillstorm">
                SkillStorm 2025
                <Zap className="title-icon-skillstorm" size={48} />
              </h1>

              <p className="hero-subtitle-skillstorm">
                The Ultimate Multi-Disciplinary Competition Experience
                <br />
                <span className="highlight-text-skillstorm">
                  Code • Design • Engineer • Game
                </span>
              </p>

              <div className="hero-stats-skillstorm">
                <div className="stat-item-skillstorm">
                  <Code className="stat-icon-skillstorm" size={24} />
                  <span className="stat-number-skillstorm">3</span>
                  <span className="stat-label-skillstorm">
                    Core Competitions
                  </span>
                </div>
                <div className="stat-item-skillstorm">
                  <Gamepad2 className="stat-icon-skillstorm" size={24} />
                  <span className="stat-number-skillstorm">7</span>
                  <span className="stat-label-skillstorm">Esports Games</span>
                </div>
                <div className="stat-item-skillstorm">
                  <Trophy className="stat-icon-skillstorm" size={24} />
                  <span className="stat-number-skillstorm">$10K+</span>
                  <span className="stat-label-skillstorm">Total Prizes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Competitions */}
        <section className="main-competitions-section">
          <div className="container">
            <div className="section-header-skillstorm">
              <h2 className="section-title-skillstorm">
                Core Competitions
                <Target className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-skillstorm">
                Master your skills across coding, design, and engineering
              </p>
            </div>

            <div className="main-competitions-grid">
              {mainCompetitions.map((comp, index) => {
                const IconComponent = comp.icon;
                return (
                  <div
                    key={comp.id}
                    className="main-comp-card"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`comp-gradient bg-gradient-to-br ${comp.gradient}`}
                    >
                      <div className="comp-icon-container">
                        <IconComponent size={40} />
                      </div>

                      <h3 className="comp-title">{comp.name}</h3>
                      <h4 className="comp-subtitle">{comp.subtitle}</h4>
                      <p className="comp-description">{comp.description}</p>

                      <div className="comp-details">
                        <div className="detail-row-comp">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span>{comp.requirements.teams}</span>
                        </div>
                        <div className="detail-row-comp">
                          <UserCheck className="w-4 h-4 text-green-400" />
                          <span>{comp.requirements.members}</span>
                        </div>
                        <div className="detail-row-comp">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span>{comp.duration}</span>
                        </div>
                      </div>

                      <div className="comp-prizes">
                        <h5 className="prizes-title">Prizes & Rewards</h5>
                        <div className="prizes-list">
                          {comp.prizes.map((prize, idx) => (
                            <div key={idx} className="prize-item">
                              <Award className="w-3 h-3 text-yellow-400" />
                              <span>{prize}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => openRegistration(comp)}
                        className="comp-register-btn"
                      >
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

        {/* Esports Section */}
        <section className="esports-section">
          <div className="container">
            <div className="section-header-skillstorm">
              <h2 className="section-title-skillstorm">
                Clutch Zone - Esports Arena
                <Gamepad2 className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-skillstorm">
                Battle for supremacy across PC games, mobile games, and fun
                challenges
              </p>
            </div>

            {/* Gaming Categories */}
            <div className="gaming-categories">
              {/* PC Games */}
              <div className="category-section">
                <div
                  className="category-header"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === "pc-games" ? "" : "pc-games",
                    )
                  }
                >
                  <div className="category-info">
                    <Monitor className="category-icon" size={28} />
                    <h3 className="category-title">PC Games</h3>
                    <span className="games-count">{pcGames.length} Games</span>
                  </div>
                  <ChevronDown
                    className={`expand-icon ${expandedSection === "pc-games" ? "expanded" : ""}`}
                    size={24}
                  />
                </div>

                {expandedSection === "pc-games" && (
                  <div className="games-grid">
                    {pcGames.map((game, index) => {
                      const IconComponent = game.icon;
                      return (
                        <div
                          key={game.id}
                          className="game-card"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div
                            className={`game-gradient bg-gradient-to-br ${game.gradient}`}
                          >
                            <div className="game-header">
                              <div className="game-icon">
                                <IconComponent size={24} />
                              </div>
                              <div className="game-platform">PC</div>
                            </div>

                            <h4 className="game-title">{game.name}</h4>
                            <p className="game-mode">{game.mode}</p>

                            <div className="game-specs">
                              <div className="spec-item">
                                <Users className="w-4 h-4" />
                                <span>{game.teamSize}</span>
                              </div>
                              <div className="spec-item">
                                <Trophy className="w-4 h-4" />
                                <span>{game.format}</span>
                              </div>
                            </div>

                            {game.mapPool && (
                              <div className="map-pool">
                                <h5 className="pool-title">Map Pool</h5>
                                <div className="maps-list">
                                  {game.mapPool.slice(0, 3).map((map, idx) => (
                                    <span key={idx} className="map-tag">
                                      {map.split(" –")[0]}
                                    </span>
                                  ))}
                                  {game.mapPool.length > 3 && (
                                    <span className="map-more">
                                      +{game.mapPool.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => openRegistration(game)}
                              className="game-register-btn"
                            >
                              Register Team
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Games */}
              <div className="category-section">
                <div
                  className="category-header"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === "mobile-games" ? "" : "mobile-games",
                    )
                  }
                >
                  <div className="category-info">
                    <Smartphone className="category-icon" size={28} />
                    <h3 className="category-title">Mobile Games</h3>
                    <span className="games-count">
                      {mobileGames.length} Games
                    </span>
                  </div>
                  <ChevronDown
                    className={`expand-icon ${expandedSection === "mobile-games" ? "expanded" : ""}`}
                    size={24}
                  />
                </div>

                {expandedSection === "mobile-games" && (
                  <div className="games-grid">
                    {mobileGames.map((game, index) => {
                      const IconComponent = game.icon;
                      return (
                        <div
                          key={game.id}
                          className="game-card"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div
                            className={`game-gradient bg-gradient-to-br ${game.gradient}`}
                          >
                            <div className="game-header">
                              <div className="game-icon">
                                <IconComponent size={24} />
                              </div>
                              <div className="game-platform">Mobile</div>
                            </div>

                            <h4 className="game-title">{game.name}</h4>
                            <p className="game-mode">{game.mode}</p>

                            <div className="game-specs">
                              <div className="spec-item">
                                <Users className="w-4 h-4" />
                                <span>{game.teamSize}</span>
                              </div>
                              <div className="spec-item">
                                <Smartphone className="w-4 h-4" />
                                <span>{game.format}</span>
                              </div>
                            </div>

                            {game.mapPool && (
                              <div className="map-pool">
                                <h5 className="pool-title">Available Maps</h5>
                                <div className="maps-list">
                                  {game.mapPool.map((map, idx) => (
                                    <span key={idx} className="map-tag">
                                      {map}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => openRegistration(game)}
                              className="game-register-btn"
                            >
                              Register Team
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Fun Games */}
              <div className="category-section">
                <div
                  className="category-header"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === "fun-games" ? "" : "fun-games",
                    )
                  }
                >
                  <div className="category-info">
                    <Joystick className="category-icon" size={28} />
                    <h3 className="category-title">Fun Games</h3>
                    <span className="games-count">{funGames.length} Games</span>
                    <span className="no-reg-badge">
                      No Registration Required
                    </span>
                  </div>
                  <ChevronDown
                    className={`expand-icon ${expandedSection === "fun-games" ? "expanded" : ""}`}
                    size={24}
                  />
                </div>

                {expandedSection === "fun-games" && (
                  <div className="games-grid">
                    {funGames.map((game, index) => {
                      const IconComponent = game.icon;
                      return (
                        <div
                          key={game.id}
                          className="game-card fun-game"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div
                            className={`game-gradient bg-gradient-to-br ${game.gradient}`}
                          >
                            <div className="game-header">
                              <div className="game-icon">
                                <IconComponent size={24} />
                              </div>
                              <div className="game-platform">
                                {game.platform}
                              </div>
                            </div>

                            <h4 className="game-title">{game.name}</h4>
                            <p className="game-mode">{game.type}</p>

                            <div className="fun-game-info">
                              <div className="info-item">
                                <Play className="w-4 h-4 text-green-400" />
                                <span>Drop-in & Play</span>
                              </div>
                              <div className="info-item">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>Casual Competition</span>
                              </div>
                            </div>

                            <div className="fun-game-cta">
                              <span>Walk-in Welcome</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Registration Modal */}
        {registrationModal && (
          <div className="modal-overlay-skillstorm">
            <div className="modal-content-skillstorm">
              <div className="modal-header-skillstorm">
                <h3 className="modal-title-skillstorm">
                  Register for{" "}
                  {registrationModal.name || registrationModal.title}
                </h3>
                <button
                  onClick={closeRegistration}
                  className="modal-close-skillstorm"
                >
                  ×
                </button>
              </div>

              <div className="modal-body-skillstorm">
                <div className="registration-info">
                  <h4>Competition Requirements</h4>
                  {registrationModal.requirements && (
                    <div className="requirements-list">
                      <div className="req-item">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>{registrationModal.requirements.teams}</span>
                      </div>
                      <div className="req-item">
                        <UserCheck className="w-4 h-4 text-green-400" />
                        <span>{registrationModal.requirements.members}</span>
                      </div>
                    </div>
                  )}

                  {registrationModal.rules && (
                    <div className="rules-section">
                      <h5>Game Rules</h5>
                      <ul className="rules-list">
                        {registrationModal.rules
                          .slice(0, 4)
                          .map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="registration-form">
                  <div className="form-group">
                    <label>Team Name</label>
                    <input type="text" placeholder="Enter your team name" />
                  </div>
                  <div className="form-group">
                    <label>Batch</label>
                    <select>
                      <option>Select your batch</option>
                      <option>E20</option>
                      <option>E21</option>
                      <option>E22</option>
                      <option>E23</option>
                      <option>E24</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Team Leader Email</label>
                    <input type="email" placeholder="team.leader@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Team Members</label>
                    <textarea placeholder="List all team member names and IDs"></textarea>
                  </div>
                </div>

                <div className="modal-actions-skillstorm">
                  <button className="btn-register-skillstorm">
                    Submit Registration
                  </button>
                  <button
                    onClick={closeRegistration}
                    className="btn-cancel-skillstorm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SkillStorm;
