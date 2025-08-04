import React, { useState } from "react";
import Layout from "../components/Layout";
import EventRegistrationModal from "../components/EventRegistrationModal";
import {
  Code,
  Palette,
  Box,
  Gamepad2,
  Users,
  Trophy,
  Clock,
  Star,
  Target,
  Zap,
  Play,
  Monitor,
  Smartphone,
  Joystick,
  Award,
  ChevronDown,
  UserCheck,
  Shield,
  Car,
  Crosshair,
  ArrowRight,
} from "lucide-react";

const SkillStorm = () => {
  const [registrationModal, setRegistrationModal] = useState({
    isOpen: false,
    event: null,
  });
  const [expandedSection, setExpandedSection] = useState("pc-games");

  // Registration modal handler
  const openRegistration = (competition) => {
    setRegistrationModal({ isOpen: true, event: competition });
  };

  const closeRegistration = () => {
    setRegistrationModal({ isOpen: false, event: null });
  };

  const handleRegistrationSubmit = (registrationData) => {
    console.log("SkillStorm Registration submitted:", registrationData);
    // Here you would typically send to backend API
    alert("Registration submitted successfully!");
  };

  // Sacred trials data
  const mainCompetitions = [
    {
      id: "athenas-code",
      name: "Trial of Athena's Code",
      subtitle: "Sacred Programming Quest for Divine Wisdom",
      description:
        "Channel Athena's infinite wisdom to solve divine algorithms and earn the blessing of the goddess of strategic thinking",
      icon: Code,
      gradient: "from-blue-500 to-purple-600",
      requirements: {
        teams: "Only 2 sacred guilds per house may enter",
        members: "3 to 5 heroes per guild",
        eligibility: "All engineering disciples",
      },
      prizes: [
        "🏆 2,000 Golden Drachmas",
        "🔮 Oracle's Apprenticeship",
        "⚡ Divine Tech Artifacts",
      ],
      duration: "6 divine hours",
      format: "Sacred Algorithm & Divine Problem Solving",
      type: "guild",
      playersPerTeam: 4,
      maxTeamsPerBatch: 2,
      maxPlayersPerBatch: 20,
      date: "2025-08-26",
      time: "09:00",
      location: "Temple of Programming Wisdom",
      blessing: "🦉 Blessed by Athena's Owl",
    },
    {
      id: "aphrodites-art",
      name: "Trial of Aphrodite's Beauty",
      subtitle: "Divine Design Competition of Eternal Aesthetics",
      description:
        "Harness Aphrodite's gift of beauty to create visual masterpieces that would grace the halls of Olympus itself",
      icon: Palette,
      gradient: "from-pink-500 to-orange-600",
      requirements: {
        teams: "Solo champions only",
        members: "Maximum 10 artists per divine house",
        eligibility: "Creative souls blessed by the muses",
      },
      prizes: [
        "🎨 Divine Design Arsenal",
        "👁️ Master Artist's Sacred Review",
        "🌟 Celestial Art Supplies",
      ],
      duration: "4 sacred hours",
      format: "Divine Creative Challenge",
      type: "solo hero",
      maxPlayersPerBatch: 10,
      date: "2025-08-27",
      time: "10:00",
      location: "Sanctuary of Divine Arts",
      blessing: "💖 Graced by Aphrodite",
    },
    {
      id: "hephaestus-forge",
      name: "Trial of Hephaestus' Forge",
      subtitle: "Sacred Engineering & Divine Craftsmanship",
      description:
        "Master the divine forging techniques of Hephaestus to create engineering marvels worthy of the gods themselves",
      icon: Box,
      gradient: "from-orange-500 to-red-600",
      requirements: {
        teams: "Only 5 forging pairs per house may enter",
        members: "Exactly 2 master craftsmen per pair",
        eligibility: "Engineering disciples of the forge",
      },
      prizes: [
        "⚒️ Divine CAD Arsenal",
        "🔥 Sacred 3D Forge Access",
        "🛠️ Celestial Engineering Tools",
      ],
      duration: "5 forging hours",
      format: "3D Divine Modeling & Sacred Engineering",
      type: "forge pair",
      playersPerTeam: 2,
      maxTeamsPerBatch: 5,
      maxPlayersPerBatch: 25,
      date: "2025-08-28",
      time: "14:00",
      location: "Hephaestus' Divine Forge",
      blessing: "🔥 Blessed by Sacred Fire",
    },
  ];

  // Esports competitions data
  const pcGames = [
    {
      id: "valorant",
      name: "Siege of Troy",
      subtitle: "Valorant Divine War",
      mode: "Sacred Combat – Tournament of Gods",
      teamSize: "5 divine warriors + 1 blessed guardian",
      format: "Epic Elimination Battles",
      restriction: "One legion per divine house",
      icon: Target,
      gradient: "from-red-500 to-pink-600",
      rules: [
        "Maximum FIVE divine warriors per legion",
        "One blessed guardian allowed",
        "Each warrior bound to single legion",
        "Guardian must be consecrated before battle",
        "Mortal warriors forbidden",
        "Divine judgment for sacred violations",
      ],
      type: "war legion",
      playersPerTeam: 5,
      maxTeamsPerBatch: 1,
      maxPlayersPerBatch: 15,
      date: "2025-08-29",
      time: "09:00",
      location: "Colosseum of Divine War",
      blessing: "🏹 Blessed by Artemis the Huntress",
    },
    {
      id: "six-siege",
      name: "Fortress of Athena",
      subtitle: "Rainbow Six Divine Siege",
      mode: "Tactical Sacred Combat",
      teamSize: "5 divine guardians",
      format: "Sacred Tournament of Wisdom",
      restriction: "Random divine realm selection",
      icon: Shield,
      gradient: "from-gray-600 to-blue-600",
      mapPool: [
        "Divine Palace",
        "Sacred Chalet",
        "Heroes' Club",
        "River Styx",
        "Mount Olympus",
      ],
      matchDetails: [
        "2 divine rounds per sacred match",
        "Strategic preparation: 60 blessed seconds",
        "Divine action phase: 300 eternal seconds",
        "Allied protection enabled",
        "Divine power handicap: 150",
        "Innocent protection guaranteed",
        "Sacred victory time: 15 divine seconds",
        "Artifact placement time: 10 blessed seconds",
      ],
      type: "guardian squad",
      playersPerTeam: 5,
      maxTeamsPerBatch: 1,
      maxPlayersPerBatch: 15,
      date: "2025-08-29",
      time: "14:00",
      location: "Athena's Tactical Temple",
      blessing: "🛡️ Protected by Athena's Shield",
    },
    {
      id: "blur",
      name: "Chariot of Helios",
      subtitle: "Divine Racing Championships",
      mode: "Solar Chariot Competition",
      teamSize: "4 divine charioteers maximum",
      format: "Golden and Silver Chariots available",
      restriction: "Four sun riders per divine house",
      icon: Car,
      gradient: "from-yellow-500 to-orange-600",
      mapPool: [
        "Sanctum of Poseidon – Bay of Tritons (3 Divine Laps)",
        "River of Styx – Underworld Basin (3 Shadow Laps)",
        "Hermes' Highway – Swift Messenger Run (3 Speed Laps)",
        "Olympus Heights – Divine Mountain Rift (2 Sacred Laps)",
        "Coastal Realm – Oceanic Divine Cruise (3 Wave Laps)",
        "Temple Districts – Sacred Plaza Racing (3 Holy Laps)",
        "Desert of Apollo – Solar Highway (2 Blazing Laps)",
      ],
      type: "chariot crew",
      playersPerTeam: 4,
      maxTeamsPerBatch: 1,
      maxPlayersPerBatch: 12,
      date: "2025-08-30",
      time: "10:00",
      location: "Helios Racing Colosseum",
      blessing: "☀️ Blessed by Helios the Sun God",
    },
    {
      id: "cod4",
      name: "Spartan Elite Forces",
      subtitle: "COD 4 Sacred Hunt & Eliminate",
      mode: "Hunt and Divine Elimination",
      teamSize: "5 warriors (1 amazon required)",
      format: "Sacred Hunt 10 divine minutes",
      restriction: "One elite squad per divine house",
      icon: Crosshair,
      gradient: "from-green-600 to-teal-600",
      mapPool: [
        "Battle of Marathon",
        "Festival of Dionysus",
        "Oracle's Terminal",
        "Hero's Estate",
        "Ancient Karachchi",
        "Warrior's Scrapyard",
      ],
      rules: [
        "Maximum FIVE divine warriors per squad",
        "At least one amazon warrior required",
        "Forbidden combat bindings illegal",
        "10 divine minutes sacred hunt matches",
        "Victor chooses realm, defeated chooses position",
        "Allied protection enabled",
        "Divine streak rewards disabled",
      ],
      type: "elite squad",
      playersPerTeam: 5,
      maxTeamsPerBatch: 1,
      maxPlayersPerBatch: 15,
      date: "2025-08-30",
      time: "15:00",
      location: "Spartan War Academy",
      blessing: "⚔️ Blessed by Ares, God of War",
    },
    {
      id: "nfs-girls",
      name: "Amazon Racing Challenge",
      subtitle: "Need for Speed Divine Huntresses",
      mode: "Amazon Warriors Only Racing",
      teamSize: "4 divine huntresses maximum",
      format: "Sacred Racing Tournament",
      restriction: "Amazon warriors only from each house",
      icon: Car,
      gradient: "from-purple-500 to-pink-600",
      rules: [
        "Maximum four amazon warriors per house",
        "Divine realms announced before sacred race",
        "Single/Double divine elimination format",
        "Amazon huntresses only",
      ],
      type: "huntress pack",
      playersPerTeam: 4,
      maxTeamsPerBatch: 1,
      maxPlayersPerBatch: 12,
      date: "2025-08-31",
      time: "10:00",
      location: "Artemis Racing Sanctuary",
      blessing: "🏹 Blessed by Artemis, Goddess of the Hunt",
    },
  ];

  const mobileGames = [
    {
      id: "pubg-mobile",
      name: "Battle of the Titans",
      subtitle: "PUBG Mobile Divine Royale",
      mode: "Epic Divine Battle Royale",
      teamSize: "4 divine squads per house",
      format: "Sacred mobile tablet only",
      restriction: "No mortal emulation allowed",
      icon: Target,
      gradient: "from-orange-500 to-red-600",
      mapPool: ["Realm of Erangel", "Sacred Sanhok"],
      rules: [
        "Maximum 4 divine squads per house",
        "Sacred mobile tablet only - no mortal emulation",
        "Divine deathmatch if less than 8 squads",
        "Bring your blessed divine tablet",
        "Heroes may wear battle attire",
      ],
      type: "divine squad",
      playersPerTeam: 4,
      maxTeamsPerBatch: 4,
      maxPlayersPerBatch: 30,
      date: "2025-08-31",
      time: "14:00",
      location: "Mobile Divine Battlegrounds",
      blessing: "🎯 Blessed by Apollo's Accuracy",
    },
    {
      id: "cod-mobile",
      name: "Mobile War of Gods",
      subtitle: "COD Mobile Divine Warfare",
      mode: "Sacred Mobile Combat",
      teamSize: "Divine squad formation TBD",
      format: "Mobile Divine Tournament",
      restriction: "Sacred tablets only",
      icon: Crosshair,
      gradient: "from-blue-500 to-purple-600",
      rules: [
        "Sacred mobile tablets only",
        "Divine tournament format to be revealed",
        "Bring your blessed battle tablet",
      ],
      type: "divine squad",
      playersPerTeam: 5,
      maxTeamsPerBatch: 3,
      maxPlayersPerBatch: 25,
      date: "2025-08-31",
      time: "16:00",
      location: "Mobile War Temple",
      blessing: "📱 Blessed by Hermes' Swift Communication",
    },
  ];

  const funGames = [
    {
      id: "monopoly",
      name: "Olympus Empire",
      subtitle: "Divine Monopoly",
      platform: "Sacred PC",
      type: "Strategic Divine Board Game",
      registration: "Open to all mortals and demigods",
      icon: Joystick,
      gradient: "from-green-500 to-blue-500",
      blessing: "🏛️ Blessed by Zeus, Ruler of Domains",
    },
    {
      id: "omi",
      name: "Divine Omi",
      subtitle: "Sacred Casual Quest",
      platform: "Blessed Mobile",
      type: "Casual Divine Entertainment",
      registration: "Open to all seeking divine fun",
      icon: Smartphone,
      gradient: "from-purple-500 to-pink-500",
      blessing: "🎮 Blessed by Dionysus, God of Celebration",
    },
  ];

  return (
    <Layout>
      <div className="skillstorm-page">
        {/* Trials of Heroes Section */}
        <section
          className="skillstorm-hero-odyssey"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2022650/pexels-photo-2022650.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div
            className="hero-background-skillstorm"
            style={{
              background:
                "linear-gradient(135deg, rgba(220,20,60,0.9) 0%, rgba(0,0,139,0.9) 50%, rgba(25,25,112,0.95) 100%)",
            }}
          ></div>
          <div className="container">
            <div className="hero-content-skillstorm">
              {/* Divine Trials Logo */}
              <div className="skillstorm-logo-container">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Faae1c430463649c0addd533bd2f58c0c?format=webp&width=800"
                  alt="Trials of Heroes - The Divine Challenges"
                  className="skillstorm-logo"
                />
                <div className="divine-logo-glow-skillstorm"></div>
                <div className="laurel-frame">🏆</div>
              </div>

              <h1 className="hero-title-odyssey-skillstorm">
                ⚔️ TRIALS OF HEROES ⚔️
                <Zap className="title-icon-skillstorm" size={48} />
              </h1>

              <p className="hero-subtitle-odyssey-skillstorm">
                Face the Ultimate Multi-Divine Challenge Experience
                <br />
                <span className="highlight-text-odyssey-skillstorm">
                  ⚡ Code • 🎨 Design • ⚙️ Engineer • 🎮 Battle ⚡
                </span>
              </p>

              <div
                className="hero-cards-odyssey-skillstorm"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "2rem",
                  marginTop: "3rem",
                  maxWidth: "900px",
                  margin: "3rem auto 0",
                }}
              >
                <div
                  className="hero-card-skillstorm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9))",
                    padding: "2rem",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <Code
                      className="stat-icon-skillstorm"
                      size={48}
                      style={{ marginBottom: "1rem", color: "#60A5FA" }}
                    />
                    <div
                      className="stat-number-skillstorm"
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      3
                    </div>
                    <div
                      className="stat-label-skillstorm"
                      style={{ fontSize: "1.1rem", opacity: 0.9 }}
                    >
                      Sacred Trials
                    </div>
                    <p
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.9rem",
                        opacity: 0.8,
                      }}
                    >
                      Divine coding, design & engineering challenges
                    </p>
                  </div>
                </div>
                <div
                  className="hero-card-skillstorm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(245, 101, 101, 0.9))",
                    padding: "2rem",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <Gamepad2
                      className="stat-icon-skillstorm"
                      size={48}
                      style={{ marginBottom: "1rem", color: "#F87171" }}
                    />
                    <div
                      className="stat-number-skillstorm"
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      7
                    </div>
                    <div
                      className="stat-label-skillstorm"
                      style={{ fontSize: "1.1rem", opacity: 0.9 }}
                    >
                      War Games
                    </div>
                    <p
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.9rem",
                        opacity: 0.8,
                      }}
                    >
                      Epic esports battles across PC & mobile
                    </p>
                  </div>
                </div>
                <div
                  className="hero-card-skillstorm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(251, 191, 36, 0.9))",
                    padding: "2rem",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <Trophy
                      className="stat-icon-skillstorm"
                      size={48}
                      style={{ marginBottom: "1rem", color: "#FBBF24" }}
                    />
                    <div
                      className="stat-number-skillstorm"
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      100+
                    </div>
                    <div
                      className="stat-label-skillstorm"
                      style={{ fontSize: "1.1rem", opacity: 0.9 }}
                    >
                      Glory Points
                    </div>
                    <p
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.9rem",
                        opacity: 0.8,
                      }}
                    >
                      Eternal rewards for the worthy champions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sacred Trials */}
        <section className="odyssey-section sacred-trials-section">
          <div className="container">
            <div className="section-header-odyssey">
              <h2 className="section-title-odyssey">
                🏛️ The Three Sacred Trials 🏛️
                <Target className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-odyssey">
                Prove your divine mastery across the sacred arts of code,
                design, and engineering
              </p>
            </div>

            <div className="sacred-trials-grid">
              {mainCompetitions.map((comp, index) => {
                const IconComponent = comp.icon;
                return (
                  <div
                    key={comp.id}
                    className="sacred-trial-card"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`sacred-gradient bg-gradient-to-br ${comp.gradient}`}
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

        {/* Divine War Games Section */}
        <section className="odyssey-section divine-colosseum-section">
          <div className="container">
            <div className="section-header-odyssey">
              <h2 className="section-title-odyssey">
                ⚔️ Colosseum of Divine War Games ⚔️
                <Gamepad2 className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-odyssey">
                Enter the sacred arenas where digital warriors clash in epic
                battles for the favor of the gods!
              </p>
            </div>

            {/* Divine War Categories */}
            <div className="divine-war-categories">
              {/* PC War Campaigns */}
              <div className="divine-category-section">
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
                    <h3 className="category-title">⚔️ PC War Campaigns</h3>
                    <span className="games-count">
                      {pcGames.length} Epic Battles
                    </span>
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
                    <h3 className="category-title">📱 Mobile Divine Trials</h3>
                    <span className="games-count">
                      {mobileGames.length} Sacred Quests
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
                    <h3 className="category-title">🎭 Divine Entertainment</h3>
                    <span className="games-count">
                      {funGames.length} Sacred Pastimes
                    </span>
                    <span className="no-reg-badge">Open to All Mortals</span>
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
        <EventRegistrationModal
          event={registrationModal.event}
          isOpen={registrationModal.isOpen}
          onClose={closeRegistration}
          onSubmit={handleRegistrationSubmit}
        />
      </div>
    </Layout>
  );
};

export default SkillStorm;
