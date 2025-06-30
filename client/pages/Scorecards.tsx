import { Layout } from "@/components/Layout";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { useMemo } from "react";

interface TeamPoints {
  programming: number;
  robotics: number;
  innovation: number;
  engineering: number;
}

interface LeaderboardTeam {
  rank: number;
  team: string;
  score: number;
  events: string[];
  points: TeamPoints;
}

const leaderboard: LeaderboardTeam[] = [
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
  {
    name: "Programming",
    color: "bg-blue-500",
    key: "programming" as keyof TeamPoints,
  },
  {
    name: "Robotics",
    color: "bg-green-500",
    key: "robotics" as keyof TeamPoints,
  },
  {
    name: "Innovation",
    color: "bg-purple-500",
    key: "innovation" as keyof TeamPoints,
  },
  {
    name: "Engineering",
    color: "bg-orange-500",
    key: "engineering" as keyof TeamPoints,
  },
];

export default function Scorecards() {
  const getRankIcon = (rank: number) => {
    const iconClass = "w-6 h-6";
    if (rank === 1)
      return <Trophy className={`${iconClass} text-yellow-400`} />;
    if (rank === 2) return <Medal className={`${iconClass} text-gray-400`} />;
    if (rank === 3) return <Award className={`${iconClass} text-amber-600`} />;
    return <Star className={`${iconClass} text-eweek-red`} />;
  };

  const stats = useMemo(() => {
    return {
      teams: leaderboard.length * 5, // Simulated
      events: 6,
      participants: leaderboard.length * 30, // Simulated
      prizePool: "$10K",
    };
  }, []);

  return (
    <Layout className="bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
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
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.teams}
              </div>
              <div className="text-eweek-white/80">Teams</div>
            </EnhancedCard>
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.events}
              </div>
              <div className="text-eweek-white/80">Events</div>
            </EnhancedCard>
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.participants}
              </div>
              <div className="text-eweek-white/80">Participants</div>
            </EnhancedCard>
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.prizePool}
              </div>
              <div className="text-eweek-white/80">Prize Pool</div>
            </EnhancedCard>
          </div>

          {/* Leaderboard */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-eweek-white mb-8 text-center">
              Team Leaderboard
            </h2>

            <div className="space-y-4">
              {leaderboard.map((team) => (
                <EnhancedCard
                  key={team.rank}
                  variant="glass"
                  hover
                  className={`p-6 group ${
                    team.rank <= 3 ? "ring-2 ring-eweek-red/40" : ""
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    {/* Team Info */}
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          team.rank <= 3 ? "bg-eweek-red/30" : "bg-eweek-red/20"
                        } group-hover:bg-eweek-red/40 transition-colors duration-300`}
                      >
                        <span className="text-2xl font-bold text-eweek-white">
                          {team.rank}
                        </span>
                      </div>
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {getRankIcon(team.rank)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-eweek-white group-hover:text-eweek-red transition-colors duration-300">
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
                        {team.score.toLocaleString()} pts
                      </div>
                      <div className="text-eweek-white/70 text-sm">
                        Total Score
                      </div>
                    </div>
                  </div>

                  {/* Points Breakdown */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {eventCategories.map((category) => (
                      <EnhancedCard
                        key={category.key}
                        variant="glass"
                        className="p-3 text-center bg-eweek-white/5"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${category.color} mx-auto mb-2`}
                        ></div>
                        <div className="text-lg font-semibold text-eweek-white">
                          {team.points[category.key].toLocaleString()}
                        </div>
                        <div className="text-xs text-eweek-white/70">
                          {category.name}
                        </div>
                      </EnhancedCard>
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
                          className="bg-eweek-red/20 text-eweek-white px-3 py-1 rounded-full text-xs hover:bg-eweek-red/30 transition-colors duration-300"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </EnhancedCard>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <EnhancedButton
                variant="primary"
                size="lg"
                onClick={() => console.log("View full rankings")}
              >
                View Full Rankings
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
