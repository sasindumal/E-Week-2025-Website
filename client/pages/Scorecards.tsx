import { Navigation } from "@/components/ui/navigation";
import { Trophy, Medal, Award, Star } from "lucide-react";

export default function Scorecards() {
  const leaderboard = [
    {
      rank: 1,
      team: "CodeCrafters",
      score: 2850,
      events: ["Programming Contest", "Hackathon", "Circuit Design"],
      points: {
        programming: 950,
        robotics: 0,
        innovation: 900,
        engineering: 1000,
      },
    },
    {
      rank: 2,
      team: "TechTitans",
      score: 2650,
      events: ["Robotics Challenge", "Innovation Pitch", "Programming Contest"],
      points: {
        programming: 800,
        robotics: 950,
        innovation: 900,
        engineering: 0,
      },
    },
    {
      rank: 3,
      team: "InnovateX",
      score: 2450,
      events: ["Innovation Pitch", "Circuit Design", "Gaming Tournament"],
      points: {
        programming: 0,
        robotics: 0,
        innovation: 1000,
        engineering: 1450,
      },
    },
    {
      rank: 4,
      team: "ByteForce",
      score: 2300,
      events: ["Programming Contest", "Hackathon"],
      points: {
        programming: 1200,
        robotics: 0,
        innovation: 0,
        engineering: 1100,
      },
    },
    {
      rank: 5,
      team: "RoboRebels",
      score: 2150,
      events: ["Robotics Challenge", "Circuit Design"],
      points: {
        programming: 0,
        robotics: 1200,
        innovation: 0,
        engineering: 950,
      },
    },
  ];

  const eventCategories = [
    { name: "Programming", color: "bg-blue-500", key: "programming" },
    { name: "Robotics", color: "bg-green-500", key: "robotics" },
    { name: "Innovation", color: "bg-purple-500", key: "innovation" },
    { name: "Engineering", color: "bg-orange-500", key: "engineering" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <Star className="w-6 h-6 text-eweek-red" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
      <Navigation />

      <div className="pt-16 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-eweek-white mb-4">
              Scorecards & Rankings
            </h1>
            <p className="text-xl text-eweek-white/80 max-w-2xl mx-auto">
              Track the performance and rankings of all participating teams
            </p>
          </div>

          {/* Category Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {eventCategories.map((category) => (
              <div
                key={category.key}
                className="flex items-center space-x-2 bg-eweek-white/10 px-4 py-2 rounded-full border border-eweek-white/20"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-eweek-white text-sm">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">25</div>
              <div className="text-eweek-white/80">Teams</div>
            </div>
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">6</div>
              <div className="text-eweek-white/80">Events</div>
            </div>
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">150</div>
              <div className="text-eweek-white/80">Participants</div>
            </div>
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">$10K</div>
              <div className="text-eweek-white/80">Prize Pool</div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-eweek-white mb-8 text-center">
              Team Leaderboard
            </h2>

            <div className="space-y-4">
              {leaderboard.map((team) => (
                <div
                  key={team.rank}
                  className={`bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:bg-eweek-white/15 ${
                    team.rank <= 3
                      ? "border-eweek-red/60"
                      : "border-eweek-red/30"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    {/* Team Info */}
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-eweek-red/20 rounded-full">
                        <span className="text-2xl font-bold text-eweek-white">
                          {team.rank}
                        </span>
                      </div>
                      {getRankIcon(team.rank)}
                      <div>
                        <h3 className="text-xl font-semibold text-eweek-white">
                          {team.team}
                        </h3>
                        <p className="text-eweek-white/70">
                          {team.events.length} events participated
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-center lg:text-right">
                      <div className="text-2xl font-bold text-eweek-red">
                        {team.score} pts
                      </div>
                      <div className="text-eweek-white/70 text-sm">
                        Total Score
                      </div>
                    </div>
                  </div>

                  {/* Points Breakdown */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {eventCategories.map((category) => (
                      <div
                        key={category.key}
                        className="bg-eweek-white/5 rounded-lg p-3 text-center"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${category.color} mx-auto mb-2`}
                        ></div>
                        <div className="text-lg font-semibold text-eweek-white">
                          {
                            team.points[
                              category.key as keyof typeof team.points
                            ]
                          }
                        </div>
                        <div className="text-xs text-eweek-white/70">
                          {category.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Participated Events */}
                  <div className="mt-4">
                    <div className="text-sm text-eweek-white/70 mb-2">
                      Participated Events:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.events.map((event, index) => (
                        <span
                          key={index}
                          className="bg-eweek-red/20 text-eweek-white px-3 py-1 rounded-full text-xs"
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
              <button className="bg-eweek-red hover:bg-eweek-red/90 text-eweek-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Full Rankings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
