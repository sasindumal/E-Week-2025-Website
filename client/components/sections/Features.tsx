import { Calendar, Trophy, Users, Zap, LucideIcon } from "lucide-react";
import { EnhancedCard } from "@/components/ui/enhanced-card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
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

export function Features() {
  return (
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
              <EnhancedCard
                key={index}
                variant="elevated"
                hover
                className="text-center p-6 bg-gradient-to-br from-eweek-navy/5 to-eweek-red/5 hover:from-eweek-navy/10 hover:to-eweek-red/10"
              >
                <div className="bg-eweek-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-eweek-red/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-eweek-red" />
                </div>
                <h3 className="text-xl font-semibold text-eweek-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-eweek-navy/70 leading-relaxed">
                  {feature.description}
                </p>
              </EnhancedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
