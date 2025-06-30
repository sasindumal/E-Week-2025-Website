import { EnhancedCard } from "@/components/ui/enhanced-card";

interface EventHighlight {
  title: string;
  description: string;
  emoji: string;
}

const eventHighlights: EventHighlight[] = [
  {
    title: "Technical Competitions",
    description:
      "Coding challenges, robotics, and engineering design competitions",
    emoji: "🏆",
  },
  {
    title: "Workshops & Seminars",
    description:
      "Learn from industry experts and enhance your technical skills",
    emoji: "📚",
  },
  {
    title: "Networking Events",
    description: "Connect with peers, alumni, and industry professionals",
    emoji: "🤝",
  },
];

export function EventHighlights() {
  return (
    <section className="py-20 bg-gradient-to-r from-eweek-navy to-eweek-navy/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-eweek-white mb-4">
            Event Highlights
          </h2>
          <p className="text-xl text-eweek-white/80 max-w-2xl mx-auto">
            Get ready for an action-packed week of competitions, workshops, and
            networking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {eventHighlights.map((event, index) => (
            <EnhancedCard
              key={index}
              variant="glass"
              hover
              className="p-6 group"
            >
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                {event.emoji}
              </div>
              <h3 className="text-xl font-semibold text-eweek-white mb-3 text-center">
                {event.title}
              </h3>
              <p className="text-eweek-white/80 text-center leading-relaxed">
                {event.description}
              </p>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
