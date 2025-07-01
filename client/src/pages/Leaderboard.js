import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Users,
  Target,
  Zap,
  Star,
  ChevronUp,
  ChevronDown,
  BarChart3,
  Activity,
} from "lucide-react";

const Leaderboard = () => {
  const [selectedTimeframe] = useState("all");

  // Enhanced batch rankings with detailed stats
  const batchRankings = [
    {
      rank: 1,
      previousRank: 2,
      batch: "E21",
      totalPoints: 4850,
      weeklyGain: 320,
      participationRate: 94,
      eventsWon: 8,
      podiumFinishes: 15,
      members: 45,
      avatar: "🏆",
      color: "from-yellow-400 via-yellow-500 to-yellow-600",
      glowColor: "rgba(251, 191, 36, 0.4)",
      trend: "up",
      weeklyChange: 12.5,
      highlights: [
        "Programming Contest 1st",
        "Robotics Challenge 1st",
        "Innovation Pitch 2nd",
      ],
    },
    {
      rank: 2,
      previousRank: 1,
      batch: "E22",
      totalPoints: 4620,
      weeklyGain: 280,
      participationRate: 89,
      eventsWon: 6,
      podiumFinishes: 13,
      members: 48,
      avatar: "🥈",
      color: "from-gray-300 via-gray-400 to-gray-500",
      glowColor: "rgba(156, 163, 175, 0.4)",
      trend: "down",
      weeklyChange: -4.8,
      highlights: [
        "AI Workshop 1st",
        "Circuit Design 2nd",
        "Gaming Tournament 1st",
      ],
    },
    {
      rank: 3,
      previousRank: 3,
      batch: "E20",
      totalPoints: 4380,
      weeklyGain: 250,
      participationRate: 87,
      eventsWon: 5,
      podiumFinishes: 11,
      members: 42,
      avatar: "🥉",
      color: "from-orange-400 via-orange-500 to-orange-600",
      glowColor: "rgba(251, 146, 60, 0.4)",
      trend: "stable",
      weeklyChange: 0.2,
      highlights: [
        "Startup Pitch 1st",
        "Hardware Design 3rd",
        "Code Review 2nd",
      ],
    },
    {
      rank: 4,
      previousRank: 5,
      batch: "E23",
      totalPoints: 3950,
      weeklyGain: 310,
      participationRate: 82,
      eventsWon: 4,
      podiumFinishes: 8,
      members: 50,
      avatar: "⭐",
      color: "from-blue-400 via-blue-500 to-blue-600",
      glowColor: "rgba(59, 130, 246, 0.4)",
      trend: "up",
      weeklyChange: 8.9,
      highlights: [
        "Web Dev Challenge 2nd",
        "Data Science 1st",
        "IoT Project 3rd",
      ],
    },
    {
      rank: 5,
      previousRank: 4,
      batch: "E24",
      totalPoints: 3720,
      weeklyGain: 290,
      participationRate: 78,
      eventsWon: 3,
      podiumFinishes: 7,
      members: 47,
      avatar: "🌟",
      color: "from-purple-400 via-purple-500 to-purple-600",
      glowColor: "rgba(168, 85, 247, 0.4)",
      trend: "down",
      weeklyChange: -2.1,
      highlights: [
        "Mobile App Dev 1st",
        "Cybersecurity 3rd",
        "ML Workshop 2nd",
      ],
    },
  ];

  // Past events with detailed scores
  const pastEvents = [
    {
      id: 1,
      name: "AI & Machine Learning Hackathon",
      date: "2024-12-15",
      category: "Technical",
      status: "completed",
      participants: 180,
      icon: "🤖",
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
      name: "Robotics Championship",
      date: "2024-12-08",
      category: "Engineering",
      status: "completed",
      participants: 120,
      icon: "🤖",
      scores: [
        { batch: "E22", score: 920, rank: 1, team: "Robo Rangers" },
        { batch: "E21", score: 880, rank: 2, team: "Mech Masters" },
        { batch: "E20", score: 840, rank: 3, team: "Bot Builders" },
        { batch: "E24", score: 800, rank: 4, team: "Circuit Squad" },
        { batch: "E23", score: 760, rank: 5, team: "Tech Titans" },
      ],
    },
    {
      id: 3,
      name: "Startup Pitch Battle",
      date: "2024-12-01",
      category: "Innovation",
      status: "completed",
      participants: 95,
      icon: "💡",
      scores: [
        { batch: "E20", score: 880, rank: 1, team: "Innovation Inc" },
        { batch: "E21", score: 860, rank: 2, team: "Future Founders" },
        { batch: "E23", score: 820, rank: 3, team: "Venture Visionaries" },
        { batch: "E22", score: 800, rank: 4, team: "Startup Stars" },
        { batch: "E24", score: 770, rank: 5, team: "Pitch Perfect" },
      ],
    },
    {
      id: 4,
      name: "Web Development Sprint",
      date: "2024-11-24",
      category: "Technical",
      status: "completed",
      participants: 160,
      icon: "💻",
      scores: [
        { batch: "E23", score: 910, rank: 1, team: "Web Warriors" },
        { batch: "E22", score: 870, rank: 2, team: "Frontend Force" },
        { batch: "E21", score: 850, rank: 3, team: "Full Stack Fighters" },
        { batch: "E24", score: 810, rank: 4, team: "Code Crafters" },
        { batch: "E20", score: 790, rank: 5, team: "Digital Designers" },
      ],
    },
    {
      id: 5,
      name: "Cybersecurity Challenge",
      date: "2024-11-17",
      category: "Security",
      status: "completed",
      participants: 140,
      icon: "🔒",
      scores: [
        { batch: "E22", score: 930, rank: 1, team: "Cyber Sentinels" },
        { batch: "E21", score: 890, rank: 2, team: "Security Squad" },
        { batch: "E24", score: 850, rank: 3, team: "Defense Dynasty" },
        { batch: "E20", score: 820, rank: 4, team: "Shield Specialists" },
        { batch: "E23", score: 800, rank: 5, team: "Firewall Force" },
      ],
    },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "down":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-orange-400" />;
      default:
        return <Star className="w-8 h-8 text-blue-400" />;
    }
  };

  const getRankChange = (current, previous) => {
    if (current < previous) {
      return { type: "up", value: previous - current };
    } else if (current > previous) {
      return { type: "down", value: current - previous };
    }
    return { type: "stable", value: 0 };
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technical: "from-blue-500 to-cyan-500",
      Engineering: "from-green-500 to-teal-500",
      Innovation: "from-purple-500 to-pink-500",
      Security: "from-red-500 to-orange-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <Layout>
      <div className="leaderboard-page">
        {/* Hero Section */}
        <section className="leaderboard-hero">
          <div className="hero-background-pattern"></div>
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Live Leaderboard
                <BarChart3 className="title-icon" size={48} />
              </h1>
              <p className="hero-subtitle">
                Real-time rankings and performance analytics for E-Week 2025
                competitions
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Active Batches</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Completed Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1,200+</span>
                  <span className="stat-label">Participants</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Batch Rankings */}
        <section className="batch-rankings-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Batch Rankings
                <Trophy className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle">
                Live standings based on total earned points across all events
              </p>
            </div>

            <div className="rankings-grid">
              {batchRankings.map((batch, index) => {
                const rankChange = getRankChange(
                  batch.rank,
                  batch.previousRank,
                );
                return (
                  <div
                    key={batch.batch}
                    className={`ranking-card ${batch.rank <= 3 ? "podium" : ""}`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      boxShadow: `0 0 40px ${batch.glowColor}`,
                    }}
                  >
                    <div
                      className={`card-gradient bg-gradient-to-br ${batch.color}`}
                    >
                      {/* Rank Badge */}
                      <div className="rank-badge">
                        <span className="rank-number">#{batch.rank}</span>
                        <div className="rank-change">
                          {rankChange.type !== "stable" && (
                            <>
                              {rankChange.type === "up" ? (
                                <ChevronUp className="w-4 h-4 text-green-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-red-400" />
                              )}
                              <span
                                className={`change-value ${rankChange.type === "up" ? "text-green-400" : "text-red-400"}`}
                              >
                                {rankChange.value}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Avatar and Batch */}
                      <div className="batch-info">
                        <div className="batch-avatar">{batch.avatar}</div>
                        <h3 className="batch-name">{batch.batch}</h3>
                        <div className="batch-members">
                          <Users className="w-4 h-4" />
                          <span>{batch.members} members</span>
                        </div>
                      </div>

                      {/* Main Stats */}
                      <div className="main-stats">
                        <div className="primary-stat">
                          <span className="stat-value">
                            {batch.totalPoints.toLocaleString()}
                          </span>
                          <span className="stat-label">Total Points</span>
                        </div>

                        <div className="weekly-gain">
                          <div className="gain-indicator">
                            {getTrendIcon(batch.trend)}
                            <span
                              className={`gain-value ${
                                batch.weeklyChange > 0
                                  ? "text-green-400"
                                  : batch.weeklyChange < 0
                                    ? "text-red-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {batch.weeklyChange > 0 ? "+" : ""}
                              {batch.weeklyChange}%
                            </span>
                          </div>
                          <span className="gain-label">This Week</span>
                        </div>
                      </div>

                      {/* Performance Grid */}
                      <div className="performance-grid">
                        <div className="perf-item">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="perf-value">{batch.eventsWon}</span>
                          <span className="perf-label">Wins</span>
                        </div>
                        <div className="perf-item">
                          <Medal className="w-4 h-4 text-orange-400" />
                          <span className="perf-value">
                            {batch.podiumFinishes}
                          </span>
                          <span className="perf-label">Podiums</span>
                        </div>
                        <div className="perf-item">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <span className="perf-value">
                            {batch.participationRate}%
                          </span>
                          <span className="perf-label">Participation</span>
                        </div>
                        <div className="perf-item">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className="perf-value">
                            +{batch.weeklyGain}
                          </span>
                          <span className="perf-label">Weekly</span>
                        </div>
                      </div>

                      {/* Recent Highlights */}
                      <div className="highlights-section">
                        <h4 className="highlights-title">Recent Highlights</h4>
                        <div className="highlights-list">
                          {batch.highlights.map((highlight, idx) => (
                            <div key={idx} className="highlight-item">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="progress-section">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${(batch.totalPoints / 5000) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="progress-label">
                          <span>Progress to 5,000 points</span>
                          <span>
                            {Math.round((batch.totalPoints / 5000) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 02: Past Events Scorecards */}
        <section className="past-events-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Past Events Scorecards
                <Target className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle">
                Detailed results and performance analysis from completed events
              </p>
            </div>

            <div className="events-timeline">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="event-scorecard"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="event-header">
                    <div className="event-info">
                      <div className="event-icon">{event.icon}</div>
                      <div className="event-details">
                        <h3 className="event-name">{event.name}</h3>
                        <div className="event-meta">
                          <div className="meta-item">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="meta-item">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`category-badge bg-gradient-to-r ${getCategoryColor(event.category)}`}
                    >
                      {event.category}
                    </div>
                  </div>

                  <div className="scores-grid">
                    {event.scores.map((score, idx) => (
                      <div
                        key={score.batch}
                        className={`score-item ${idx < 3 ? "podium-finish" : ""}`}
                      >
                        <div className="score-rank">
                          <div className="rank-circle">
                            {getRankIcon(score.rank)}
                            <span className="rank-text">#{score.rank}</span>
                          </div>
                        </div>

                        <div className="score-info">
                          <div className="batch-score">
                            <span className="batch-name">{score.batch}</span>
                            <span className="team-name">{score.team}</span>
                          </div>
                          <div className="score-value">
                            <span className="points">{score.score}</span>
                            <span className="points-label">points</span>
                          </div>
                        </div>

                        <div className="score-bar">
                          <div
                            className="score-fill"
                            style={{
                              width: `${(score.score / Math.max(...event.scores.map((s) => s.score))) * 100}%`,
                              background:
                                idx < 3
                                  ? `linear-gradient(90deg, ${["#fbbf24", "#9ca3af", "#fb923c"][idx]}, ${["#f59e0b", "#6b7280", "#ea580c"][idx]})`
                                  : "linear-gradient(90deg, #60a5fa, #3b82f6)",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
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

export default Leaderboard;
