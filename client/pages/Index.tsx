import { Navigation } from "@/components/ui/navigation";
import { CountdownTimer } from "@/components/countdown-timer";
import { Calendar, Trophy, Users, Zap } from "lucide-react";

export default function Index() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-eweek-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-eweek-red rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
                alt="E-Week 2025"
                className="h-32 sm:h-40 md:h-48 w-auto mx-auto mb-6"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-eweek-white mb-6">
              E-WEEK
              <span className="block text-eweek-red">2025</span>
            </h1>

            <p className="text-xl sm:text-2xl text-eweek-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              The ultimate engineering competition at University of Jaffna
              Faculty of Engineering. Join us for an unforgettable week of
              innovation, competition, and excellence.
            </p>

            {/* Countdown */}
            <div className="mb-12">
              <CountdownTimer targetDate="2025-08-25T00:00:00" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-eweek-red hover:bg-eweek-red/90 text-eweek-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Register Now
              </button>
              <button className="border-2 border-eweek-white text-eweek-white hover:bg-eweek-white hover:text-eweek-navy px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-eweek-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-eweek-navy mb-4">
              Why Join E-Week 2025?
            </h2>
            <p className="text-xl text-eweek-navy/70 max-w-2xl mx-auto">
              Experience the thrill of engineering excellence through our
              carefully curated events and competitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-eweek-navy/5 to-eweek-red/5 hover:from-eweek-navy/10 hover:to-eweek-red/10 transition-all duration-300 border border-eweek-navy/10"
                >
                  <div className="bg-eweek-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-eweek-red" />
                  </div>
                  <h3 className="text-xl font-semibold text-eweek-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-eweek-navy/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-20 bg-gradient-to-r from-eweek-navy to-eweek-navy/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-eweek-white mb-4">
              Event Highlights
            </h2>
            <p className="text-xl text-eweek-white/80 max-w-2xl mx-auto">
              Get ready for an action-packed week of competitions, workshops,
              and networking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Technical Competitions",
                description:
                  "Coding challenges, robotics, and engineering design competitions",
                image: "🏆",
              },
              {
                title: "Workshops & Seminars",
                description:
                  "Learn from industry experts and enhance your technical skills",
                image: "📚",
              },
              {
                title: "Networking Events",
                description:
                  "Connect with peers, alumni, and industry professionals",
                image: "🤝",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 border border-eweek-red/30 hover:bg-eweek-white/15 transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{event.image}</div>
                <h3 className="text-xl font-semibold text-eweek-white mb-3 text-center">
                  {event.title}
                </h3>
                <p className="text-eweek-white/80 text-center leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-eweek-navy border-t border-eweek-red/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
              alt="E-Week 2025"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-eweek-white/80 mb-4">
            University of Jaffna • Faculty of Engineering
          </p>
          <p className="text-eweek-white/60 text-sm">
            © 2025 E-Week. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
