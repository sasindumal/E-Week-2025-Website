import { Layout } from "@/components/Layout";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState, useMemo } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  description: string;
  category: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Programming Contest",
    date: "August 25, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Computer Lab A",
    participants: "Individual",
    description:
      "Test your coding skills in our challenging programming competition",
    category: "Technical",
  },
  {
    id: 2,
    title: "Robotics Challenge",
    date: "August 26, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Engineering Workshop",
    participants: "Teams of 3-4",
    description: "Design and build robots to complete specific tasks",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Innovation Pitch",
    date: "August 27, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Main Auditorium",
    participants: "Teams of 2-5",
    description: "Present your innovative solutions to real-world problems",
    category: "Innovation",
  },
  {
    id: 4,
    title: "Circuit Design",
    date: "August 28, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Electronics Lab",
    participants: "Individual/Pairs",
    description:
      "Design and simulate electronic circuits for given specifications",
    category: "Technical",
  },
  {
    id: 5,
    title: "Gaming Tournament",
    date: "August 29, 2025",
    time: "11:00 AM - 6:00 PM",
    location: "Gaming Arena",
    participants: "Individual/Teams",
    description: "Compete in various video game tournaments",
    category: "Entertainment",
  },
  {
    id: 6,
    title: "Hackathon Finals",
    date: "August 30, 2025",
    time: "9:00 AM - 8:00 PM",
    location: "Innovation Hub",
    participants: "Teams of 4-6",
    description: "24-hour intensive coding and development challenge",
    category: "Technical",
  },
];

const categories = [
  "All",
  "Technical",
  "Engineering",
  "Innovation",
  "Entertainment",
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return events;
    return events.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Layout className="bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
      <div className="pt-16 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-eweek-white mb-4">
              Event Schedule
            </h1>
            <p className="text-xl text-eweek-white/80 max-w-2xl mx-auto">
              Explore all the exciting events planned for E-Week 2025
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <EnhancedButton
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </EnhancedButton>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredEvents.map((event) => (
              <EnhancedCard
                key={event.id}
                variant="glass"
                hover
                className="p-6 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-eweek-white group-hover:text-eweek-red transition-colors duration-300">
                    {event.title}
                  </h3>
                  <span className="bg-eweek-red px-3 py-1 rounded-full text-xs text-eweek-white font-medium">
                    {event.category}
                  </span>
                </div>

                <p className="text-eweek-white/80 mb-6 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-eweek-white/70">
                    <Calendar className="w-4 h-4 mr-3 text-eweek-red" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-eweek-white/70">
                    <Clock className="w-4 h-4 mr-3 text-eweek-red" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-eweek-white/70">
                    <MapPin className="w-4 h-4 mr-3 text-eweek-red" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-eweek-white/70">
                    <Users className="w-4 h-4 mr-3 text-eweek-red" />
                    <span>{event.participants}</span>
                  </div>
                </div>

                <EnhancedButton
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => console.log(`Register for ${event.title}`)}
                >
                  Register for Event
                </EnhancedButton>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
