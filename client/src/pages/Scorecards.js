import React from "react";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";
import { Trophy, Medal, Award, Star } from "lucide-react";

const Scorecards = () => {
  const { leaderboard, loading } = useApp();

  const eventCategories = [
    { name: "Programming", color: "bg-blue-500", key: "programming" },
    { name: "Robotics", color: "bg-green-500", key: "robotics" },
    { name: "Innovation", color: "bg-purple-500", key: "innovation" },
    { name: "Engineering", color: "bg-orange-500", key: "engineering" },
  ];

  const getRankIcon = (rank) => {
    const iconProps = { size: 24 };
    if (rank === 1)
      return <Trophy {...iconProps} className="text-yellow-400" />;
    if (rank === 2) return <Medal {...iconProps} className="text-gray-400" />;
    if (rank === 3) return <Award {...iconProps} className="text-amber-600" />;
    return <Star {...iconProps} className="text-red" />;
  };

  const stats = {
    teams: leaderboard.length * 5,
    events: 6,
    participants: leaderboard.length * 30,
    prizePool: "$10K",
  };

  return (
    <Layout>
      <div className="pt-16 py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Scorecards & Rankings
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Track the performance and rankings of all participating teams
            </p>
          </div>

          {/* Category Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {eventCategories.map((category) => (
              <div
                key={category.key}
                className="flex items-center space-x-2 glass px-4 py-2 rounded-full"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-white text-sm">{category.name}</span>
              </div>
            ))}
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.teams}
              </div>
              <div className="text-white opacity-80">Teams</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.events}
              </div>
              <div className="text-white opacity-80">Events</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.participants}
              </div>
              <div className="text-white opacity-80">Participants</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.prizePool}
              </div>
              <div className="text-white opacity-80">Prize Pool</div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="loading"></div>
              <p className="mt-4">Loading leaderboard...</p>
            </div>
          )}

          {/* Leaderboard */}
          {!loading && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Team Leaderboard
              </h2>

              <div className="space-y-4">
                {leaderboard.map((team) => (
                  <div
                    key={team.id}
                    className={`card ${
                      team.rank <= 3 ? "ring-2 ring-red ring-opacity-40" : ""
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                      {/* Team Info */}
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-full ${
                            team.rank <= 3
                              ? "bg-red bg-opacity-30"
                              : "bg-red bg-opacity-20"
                          } transition-colors duration-300`}
                        >
                          <span className="text-2xl font-bold text-white">
                            {team.rank}
                          </span>
                        </div>
                        <div className="transition-transform duration-300 hover:scale-110">
                          {getRankIcon(team.rank)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-red transition-colors duration-300">
                            {team.team}
                          </h3>
                          <p className="text-white opacity-70">
                            {team.events.length} events participated
                          </p>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-center lg:text-right">
                        <div className="text-2xl font-bold text-red">
                          {team.score.toLocaleString()} pts
                        </div>
                        <div className="text-white opacity-70 text-sm">
                          Total Score
                        </div>
                      </div>
                    </div>

                    {/* Points Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {eventCategories.map((category) => (
                        <div
                          key={category.key}
                          className="glass p-3 text-center rounded-lg"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${category.color} mx-auto mb-2`}
                          ></div>
                          <div className="text-lg font-semibold text-white">
                            {team.points[category.key].toLocaleString()}
                          </div>
                          <div className="text-xs text-white opacity-70">
                            {category.name}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Participated Events */}
                    <div>
                      <div className="text-sm text-white opacity-70 mb-2">
                        Participated Events:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.events.map((event, index) => (
                          <span
                            key={index}
                            className="bg-red bg-opacity-20 text-white px-3 py-1 rounded-full text-xs hover:bg-red hover:bg-opacity-30 transition-colors duration-300"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <div className="text-center mt-12">
                <button className="btn btn-primary">View Full Rankings</button>
              </div>
            </div>
          )}

          {/* No Data Message */}
          {!loading && leaderboard.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl opacity-80">
                No leaderboard data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Scorecards;
