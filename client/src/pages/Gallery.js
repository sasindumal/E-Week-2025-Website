import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";
import {
  Camera,
  Video,
  Calendar,
  Eye,
  Heart,
  Download,
  Share2,
  Grid,
  Layers,
  Play,
  X,
  ZoomIn,
  Clock,
  Users,
  Award,
  Search,
} from "lucide-react";

const Gallery = () => {
  const { galleryItems, loading, selectedYear, setSelectedYear } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const categories = [
    {
      id: "all",
      label: "🏛️ All Sacred Archives",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "photos",
      label: "📸 Divine Images",
      icon: <Camera className="w-4 h-4" />,
    },
    {
      id: "videos",
      label: "🎬 Epic Chronicles",
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: "highlights",
      label: "⭐ Legendary Moments",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const years = ["All", "2024", "2023", "2022", "2021"];

  // Enhanced gallery items with more data
  const enhancedGalleryItems = galleryItems.map((item, index) => ({
    ...item,
    type: index % 3 === 0 ? "video" : "photo",
    category:
      index % 4 === 0 ? "highlights" : index % 2 === 0 ? "photos" : "videos",
    duration: index % 3 === 0 ? "2:34" : null,
    photographer: `Team E${20 + (index % 5)}`,
    tags: ["competition", "teamwork", "celebration", "awards"][
      Math.floor(Math.random() * 4)
    ],
    resolution: "4K",
    size: `${Math.floor(Math.random() * 5 + 2)}.${Math.floor(Math.random() * 9)}MB`,
  }));

  const filteredItems = enhancedGalleryItems.filter((item) => {
    const matchesCategory =
      activeFilter === "all" || item.category === activeFilter;
    const matchesYear =
      selectedYear === "All" || item.year.toString() === selectedYear;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const stats = {
    photos:
      enhancedGalleryItems.filter((item) => item.type === "photo").length * 12,
    videos:
      enhancedGalleryItems.filter((item) => item.type === "video").length * 8,
    highlights:
      enhancedGalleryItems.filter((item) => item.category === "highlights")
        .length * 3,
    totalViews: enhancedGalleryItems.reduce((sum, item) => sum + item.views, 0),
  };

  const openLightbox = (item) => {
    setSelectedMedia(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedMedia(null);
  };

  return (
    <Layout>
      <div className="gallery-page animate-slide-up">
        {/* Hall of Eternal Legends Section */}
        <section
          className="gallery-hero-odyssey"
          ref={heroRef}
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/951536/pexels-photo-951536.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          {/* Divine Temple Overlay */}
          <div
            className="hero-background-events"
            style={{
              zIndex: 0,
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(220,20,60,0.9) 0%, rgba(0,0,139,0.9) 50%, rgba(25,25,112,0.95) 100%)",
            }}
          />
          <div className="gallery-hero-bg">
            {/* Floating Art & Memories */}
            <div className="floating-shapes">
              <div className="shape shape-1">🖼️</div>
              <div className="shape shape-2">🏺</div>
              <div className="shape shape-3">📸</div>
              <div className="shape shape-4">🎭</div>
              <div className="shape shape-5">🏛️</div>
            </div>

            {/* Sacred Memory Particles */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i}`}>
                  ✨
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="gallery-hero-content">
              <div
                className="gallery-hero-icon"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <Camera className="w-16 h-16" />
                <div className="divine-glow"></div>
                <div className="art-frame">🏛️</div>
              </div>
              <h1 className="gallery-hero-title hero-title-events">
                🏺 Hall of Eternal Legends 🏺
              </h1>
              <p className="gallery-hero-subtitle hero-subtitle-events">
                Behold the sacred gallery where heroes' greatest moments are
                immortalized! Witness the epic chronicles captured for eternity!
              </p>

              <div className="gallery-stats-hero hero-stats-events">
                <div className="hero-stat stat-card-events">
                  <span className="stat-value">{stats.photos}+</span>
                  <span className="stat-label">Sacred Images</span>
                </div>
                <div className="hero-stat stat-card-events">
                  <span className="stat-value">{stats.videos}+</span>
                  <span className="stat-label">Epic Chronicles</span>
                </div>
                <div className="hero-stat stat-card-events">
                  <span className="stat-value">
                    {(stats.totalViews / 1000).toFixed(1)}K
                  </span>
                  <span className="stat-label">Divine Views</span>
                </div>
                <div className="hero-stat stat-card-events">
                  <span className="stat-value">{stats.highlights}</span>
                  <span className="stat-label">Legendary Moments</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divine Archive Filters Section */}
        <section className="odyssey-section divine-archive-filters">
          <div className="container">
            <div className="section-header-odyssey">
              <h2 className="section-title-odyssey">
                🔍 Divine Archive Navigator 🔍
                <Search className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-odyssey">
                Navigate through the sacred archives using divine filters and
                mystical search
              </p>
            </div>

            <div
              className="divine-filters-structure"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                padding: "2rem",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                marginBottom: "2rem",
              }}
            >
              <div
                className="divine-search-row"
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="search-container"
                  style={{
                    flex: "1",
                    minWidth: "300px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Search
                    className="w-5 h-5"
                    style={{ marginRight: "0.75rem", opacity: 0.7 }}
                  />
                  <input
                    type="text"
                    placeholder="Search sacred memories and legendary deeds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "white",
                      width: "100%",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div
                  className="view-controls"
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    padding: "0.25rem",
                  }}
                >
                  <button
                    className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      background:
                        viewMode === "grid"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    className={`view-btn ${viewMode === "masonry" ? "active" : ""}`}
                    onClick={() => setViewMode("masonry")}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      background:
                        viewMode === "masonry"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <Layers className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div
                className="filter-tabs"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`filter-tab ${activeFilter === category.id ? "active" : ""}`}
                    onClick={() => setActiveFilter(category.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      background:
                        activeFilter === category.id
                          ? "linear-gradient(135deg, rgba(167, 28, 32, 0.8), rgba(220, 20, 60, 0.8))"
                          : "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                    <span
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "1rem",
                        padding: "0.125rem 0.5rem",
                        fontSize: "0.75rem",
                        marginLeft: "0.25rem",
                      }}
                    >
                      {category.id === "all"
                        ? enhancedGalleryItems.length
                        : enhancedGalleryItems.filter(
                            (item) => item.category === category.id,
                          ).length}
                    </span>
                  </button>
                ))}
              </div>

              <div
                className="divine-year-filters"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {years.map((year) => (
                  <button
                    key={year}
                    className={`divine-year-filter ${selectedYear === year ? "active" : ""}`}
                    onClick={() => setSelectedYear(year)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      background:
                        selectedYear === year
                          ? "rgba(255, 215, 0, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divine Hall Gallery Grid */}
        <section className="odyssey-section divine-hall-gallery">
          <div className="container">
            {loading && (
              <div className="gallery-loading divine-loading">
                <div className="loading-spinner divine-spinner"></div>
                <p>
                  ⏳ Unveiling sacred memories from the divine archives... ⏳
                </p>
              </div>
            )}

            {!loading && filteredItems.length > 0 && (
              <div className={`gallery-grid divine-gallery-grid ${viewMode}`}>
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`gallery-item divine-gallery-item ${item.type} ${viewMode === "masonry" && index % 3 === 1 ? "tall" : ""}`}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="gallery-item-media">
                      <div className="media-container">
                        {item.image.includes("placeholder") ? (
                          <div className="placeholder-media">
                            {item.type === "video" ? (
                              <Video className="w-12 h-12" />
                            ) : (
                              <Camera className="w-12 h-12" />
                            )}
                          </div>
                        ) : (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="media-image"
                          />
                        )}

                        {item.type === "video" && (
                          <div className="video-overlay">
                            <Play className="w-8 h-8" />
                            <span className="video-duration">
                              {item.duration}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="gallery-item-overlay">
                        <div className="overlay-content">
                          <h3 className="item-title">{item.title}</h3>
                          <p className="item-meta">
                            <span className="item-year">{item.year}</span>
                            <span className="item-photographer">
                              {item.photographer}
                            </span>
                          </p>

                          <div className="item-stats">
                            <div className="stat-item">
                              <Eye className="w-4 h-4" />
                              <span>{item.views.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                              <Heart className="w-4 h-4" />
                              <span>{item.likes}</span>
                            </div>
                          </div>

                          <div className="item-actions">
                            <button className="action-btn">
                              <ZoomIn className="w-4 h-4" />
                            </button>
                            <button className="action-btn">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="action-btn">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="item-badges">
                          <span className="type-badge">{item.type}</span>
                          {item.category === "highlights" && (
                            <span className="highlight-badge">
                              <Award className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="gallery-empty divine-empty">
                <Camera className="w-16 h-16" />
                <h3>🏺 No Sacred Memories Found 🏺</h3>
                <p>
                  Adjust your divine filters to unveil more legendary moments
                  from the archives
                </p>
              </div>
            )}

            {!loading && filteredItems.length > 0 && (
              <div className="gallery-load-more divine-load-more">
                <button className="load-more-btn divine-load-btn">
                  <Layers className="w-5 h-5" />
                  Unveil More Sacred Memories
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Ultra-Modern Lightbox */}
        {isLightboxOpen && selectedMedia && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div
              className="lightbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <X className="w-6 h-6" />
              </button>

              <div className="lightbox-media">
                {selectedMedia.type === "video" ? (
                  <div className="lightbox-video">
                    <Video className="w-20 h-20" />
                    <p>Video Player Placeholder</p>
                  </div>
                ) : (
                  <img
                    src={selectedMedia.image}
                    alt={selectedMedia.title}
                    className="lightbox-image"
                  />
                )}
              </div>

              <div className="lightbox-info">
                <div className="lightbox-header">
                  <h2>{selectedMedia.title}</h2>
                  <div className="lightbox-badges">
                    <span className="lightbox-type">{selectedMedia.type}</span>
                    <span className="lightbox-year">{selectedMedia.year}</span>
                  </div>
                </div>

                <div className="lightbox-meta">
                  <div className="meta-item">
                    <Users className="w-4 h-4" />
                    <span>{selectedMedia.photographer}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar className="w-4 h-4" />
                    <span>E-Week {selectedMedia.year}</span>
                  </div>
                  <div className="meta-item">
                    <Clock className="w-4 h-4" />
                    <span>{selectedMedia.resolution}</span>
                  </div>
                </div>

                <div className="lightbox-stats">
                  <div className="lightbox-stat">
                    <Eye className="w-5 h-5" />
                    <span>{selectedMedia.views.toLocaleString()} views</span>
                  </div>
                  <div className="lightbox-stat">
                    <Heart className="w-5 h-5" />
                    <span>{selectedMedia.likes} likes</span>
                  </div>
                  <div className="lightbox-stat">
                    <Download className="w-5 h-5" />
                    <span>{selectedMedia.size}</span>
                  </div>
                </div>

                <div className="lightbox-actions">
                  <button className="lightbox-btn primary">
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button className="lightbox-btn secondary">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  <button className="lightbox-btn secondary">
                    <Heart className="w-5 h-5" />
                    Like
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
