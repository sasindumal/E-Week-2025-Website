import { Layout } from "@/components/Layout";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Calendar, Eye, Heart } from "lucide-react";
import { useState, useMemo } from "react";

interface GalleryItem {
  id: number;
  year: string;
  title: string;
  image: string;
  views: number;
  likes: number;
}

const galleryItems: GalleryItem[] = [
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

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState("All");

  const filteredItems = useMemo(() => {
    if (selectedYear === "All") return galleryItems;
    return galleryItems.filter((item) => item.year === selectedYear);
  }, [selectedYear]);

  const stats = useMemo(() => {
    return {
      photos: galleryItems.length * 5, // Simulated
      videos: Math.floor(galleryItems.length / 2),
      years: new Set(galleryItems.map((item) => item.year)).size,
    };
  }, []);

  return (
    <Layout className="bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
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
              <EnhancedButton
                key={year}
                variant={selectedYear === year ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </EnhancedButton>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.photos}+
              </div>
              <div className="text-eweek-white/80">Photos</div>
            </EnhancedCard>
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.videos}+
              </div>
              <div className="text-eweek-white/80">Videos</div>
            </EnhancedCard>
            <EnhancedCard variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold text-eweek-red mb-2">
                {stats.years}
              </div>
              <div className="text-eweek-white/80">Years</div>
            </EnhancedCard>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item) => (
              <EnhancedCard
                key={item.id}
                variant="glass"
                hover
                className="group relative overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-eweek-navy/50 to-eweek-red/30 flex items-center justify-center">
                  <div className="text-eweek-white/60 text-6xl group-hover:scale-110 transition-transform duration-300">
                    📷
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-eweek-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <EnhancedButton
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => console.log(`View ${item.title}`)}
                    >
                      View Full Size
                    </EnhancedButton>
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

                  <h3 className="text-lg font-semibold text-eweek-white mb-3 group-hover:text-eweek-red transition-colors duration-300">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-eweek-white/70 text-sm">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <EnhancedButton
              variant="primary"
              size="lg"
              onClick={() => console.log("Load more photos")}
            >
              Load More Photos
            </EnhancedButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}
