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
    <section
      className="py-20 bg-gradient-to-r from-eweek-navy to-eweek-navy/90"
      data-oid="nc2-w.y"
    >
      <div className="container mx-auto px-4" data-oid="dhekqz_">
        <div className="text-center mb-16" data-oid="5yzde.t">
          <h2
            className="text-3xl sm:text-4xl font-bold text-eweek-white mb-4"
            data-oid="tu2m_20"
          >
            Event Highlights
          </h2>
          <p
            className="text-xl text-eweek-white/80 max-w-2xl mx-auto"
            data-oid="r7gt0nq"
          >
            Get ready for an action-packed week of competitions, workshops, and
            networking
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          data-oid="_:09tx3"
        >
          {eventHighlights.map((event, index) => (
            <EnhancedCard
              key={index}
              variant="glass"
              hover
              className="p-6 group"
              data-oid="f:2li2w"
            >
              <div
                className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300"
                data-oid="f2d.9-q"
              >
                {event.emoji}
              </div>
              <h3
                className="text-xl font-semibold text-eweek-white mb-3 text-center"
                data-oid="zs_e3as"
              >
                {event.title}
              </h3>
              <p
                className="text-eweek-white/80 text-center leading-relaxed"
                data-oid="znjul-9"
              >
                {event.description}
              </p>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
