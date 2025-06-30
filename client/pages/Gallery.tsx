import { Navigation } from "@/components/ui/navigation";
import { Calendar, Eye, Heart } from "lucide-react";

export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      year: "2024",
      title: "Programming Contest Winners",
      image: "/placeholder.svg",
      views: 1250,
      likes: 89,
    },
    {
      id: 2,
      year: "2024",
      title: "Robotics Challenge",
      image: "/placeholder.svg",
      views: 950,
      likes: 67,
    },
    {
      id: 3,
      year: "2024",
      title: "Innovation Showcase",
      image: "/placeholder.svg",
      views: 1100,
      likes: 78,
    },
    {
      id: 4,
      year: "2023",
      title: "Opening Ceremony",
      image: "/placeholder.svg",
      views: 2100,
      likes: 145,
    },
    {
      id: 5,
      year: "2023",
      title: "Team Building Activities",
      image: "/placeholder.svg",
      views: 850,
      likes: 52,
    },
    {
      id: 6,
      year: "2023",
      title: "Awards Night",
      image: "/placeholder.svg",
      views: 1650,
      likes: 112,
    },
    {
      id: 7,
      year: "2022",
      title: "Hackathon Marathon",
      image: "/placeholder.svg",
      views: 1350,
      likes: 95,
    },
    {
      id: 8,
      year: "2022",
      title: "Engineering Design Challenge",
      image: "/placeholder.svg",
      views: 720,
      likes: 41,
    },
    {
      id: 9,
      year: "2022",
      title: "Closing Ceremony",
      image: "/placeholder.svg",
      views: 980,
      likes: 73,
    },
  ];

  const years = ["All", "2024", "2023", "2022", "2021"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
      <Navigation />

      <div className="pt-16 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-eweek-white mb-4">
              Gallery
            </h1>
            <p className="text-xl text-eweek-white/80 max-w-2xl mx-auto">
              Relive the memorable moments from previous E-Week celebrations
            </p>
          </div>

          {/* Year Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {years.map((year) => (
              <button
                key={year}
                className="px-6 py-2 rounded-full bg-eweek-white/10 text-eweek-white hover:bg-eweek-red hover:text-eweek-white transition-all duration-300 border border-eweek-white/20"
              >
                {year}
              </button>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">500+</div>
              <div className="text-eweek-white/80">Photos</div>
            </div>
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">50+</div>
              <div className="text-eweek-white/80">Videos</div>
            </div>
            <div className="bg-eweek-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-eweek-red/30">
              <div className="text-3xl font-bold text-eweek-red mb-2">4</div>
              <div className="text-eweek-white/80">Years</div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-eweek-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-eweek-red/30 hover:border-eweek-red/60 transition-all duration-300 transform hover:scale-105"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-eweek-navy/50 to-eweek-red/30 flex items-center justify-center">
                  <div className="text-eweek-white/60 text-6xl">📷</div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-eweek-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <button className="w-full bg-eweek-red hover:bg-eweek-red/90 text-eweek-white py-2 rounded-lg font-medium transition-all duration-300">
                      View Full Size
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-eweek-red px-2 py-1 rounded text-xs text-eweek-white font-medium">
                      {item.year}
                    </span>
                    <Calendar className="w-4 h-4 text-eweek-red" />
                  </div>

                  <h3 className="text-lg font-semibold text-eweek-white mb-3">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-eweek-white/70 text-sm">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-eweek-red hover:bg-eweek-red/90 text-eweek-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Load More Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
