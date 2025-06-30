import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";
import { Calendar, Eye, Heart } from "lucide-react";

const Gallery = () => {
  const { galleryItems, loading, selectedYear, setSelectedYear } = useApp();

  const years = ["All", "2024", "2023", "2022", "2021"];

  const stats = {
    photos: galleryItems.length * 5,
    videos: Math.floor(galleryItems.length / 2),
    years: new Set(galleryItems.map((item) => item.year)).size,
  };

  return (
    <Layout>
      <div className="pt-16 py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Gallery
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Relive the memorable moments from previous E-Week celebrations
            </p>
          </div>

          {/* Year Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`btn ${
                  selectedYear === year ? "btn-primary" : "btn-secondary"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.photos}+
              </div>
              <div className="text-white opacity-80">Photos</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.videos}+
              </div>
              <div className="text-white opacity-80">Videos</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-red mb-2">
                {stats.years}
              </div>
              <div className="text-white opacity-80">Years</div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="loading"></div>
              <p className="mt-4">Loading gallery...</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="card overflow-hidden group">
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-navy to-red flex items-center justify-center mb-4 rounded-lg overflow-hidden">
                    {item.image.includes("placeholder") ? (
                      <div className="text-white opacity-60 text-6xl group-hover:scale-110 transition-transform duration-300">
                        📷
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-red text-white px-2 py-1 rounded text-xs font-medium">
                      {item.year}
                    </span>
                    <Calendar className="w-4 h-4 text-red" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-red transition-colors duration-300">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-white opacity-70 text-sm">
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
              ))}
            </div>
          )}

          {/* No Items Message */}
          {!loading && galleryItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl opacity-80">
                No gallery items found for the selected year.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {!loading && galleryItems.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn btn-primary">Load More Photos</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
