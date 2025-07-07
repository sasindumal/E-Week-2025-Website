import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import {
  Download,
  Smartphone,
  Monitor,
  Apple,
  Shield,
  CheckCircle,
} from "lucide-react";

const Downloads = () => {
  const [activeTab, setActiveTab] = useState("android");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [downloadStats] = useState({
    android: { count: 15420, growth: "+23%" },
    macos: { count: 8930, growth: "+18%" },
    windows: { count: 22150, growth: "+31%" },
  });

  const platforms = [
    {
      id: "android",
      name: "Sacred Android Tablet",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      version: "Chronicle II.I.O",
      size: "45.2 Divine Scrolls",
      requirements: "Sacred Android 8.0+",
      features: [
        "🔔 Divine prophecy notifications",
        "⚔️ Offline glory tracking",
        "🏛️ Instant pantheon updates",
        "🤝 Hero collaboration tools",
        "📸 Epic moment sharing",
      ],
      downloadUrl: "#",
      blessing: "Blessed by Hermes for swift communication",
    },
    {
      id: "macos",
      name: "Divine MacOS Shrine",
      icon: <Apple className="w-8 h-8" />,
      color: "from-gray-500 to-gray-600",
      version: "Chronicle II.I.O",
      size: "89.7 Sacred Texts",
      requirements: "macOS Temple 11.0+",
      features: [
        "🏛️ Native temple experience",
        "📊 Advanced oracle dashboard",
        "🪟 Multi-window divine view",
        "⌨️ Sacred key combinations",
        "⚙️ System harmony integration",
      ],
      downloadUrl: "#",
      blessing: "Blessed by Athena for wise organization",
    },
    {
      id: "windows",
      name: "Windows Divine Portal",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      version: "Chronicle II.I.O",
      size: "67.4 Sacred Runes",
      requirements: "Windows Realm 10+",
      features: [
        "⚡ Optimized divine performance",
        "👆 Sacred touch support",
        "🔔 Live divine notifications",
        "🔄 Background sync with Olympus",
        "🌐 Universal divine platform",
      ],
      downloadUrl: "#",
      blessing: "Blessed by Zeus for ultimate power",
    },
  ];

  const activePlatform = platforms.find((p) => p.id === activeTab);

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

  return (
    <Layout>
      <div className="downloads-page animate-slide-up">
        {/* Ancient Sacred Scrolls Section */}
        <section
          className="downloads-hero-odyssey"
          ref={heroRef}
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/8880303/pexels-photo-8880303.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          {/* Divine Overlay */}
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
          <div className="downloads-hero-bg">
            {/* Ancient Scrolls Floating */}
            <div className="floating-shapes">
              <div className="shape shape-1">📜</div>
              <div className="shape shape-2">🏛️</div>
              <div className="shape shape-3">🏺</div>
              <div className="shape shape-4">⚱️</div>
              <div className="shape shape-5">📋</div>
            </div>

            {/* Sacred Particles */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i}`}>
                  ✨
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="downloads-hero-content">
              <div
                className="downloads-hero-icon"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <Download className="w-16 h-16" />
                <div className="divine-glow"></div>
                <div className="scroll-frame">📜</div>
              </div>
              <h1 className="downloads-hero-title hero-title-events">
                🏛️ Sacred Digital Scrolls 🏛️
              </h1>
              <p className="downloads-hero-subtitle hero-subtitle-events">
                Receive the divine chronicles of The Odyssey on your sacred
                viewing tablet! Access the eternal wisdom anywhere, anytime!
              </p>

              <div className="downloads-stats hero-stats-events">
                <div className="download-stat stat-card-events">
                  <span className="stat-number">46K+</span>
                  <span className="stat-label">Sacred Downloads</span>
                </div>
                <div className="download-stat stat-card-events">
                  <span className="stat-number">4.8⭐</span>
                  <span className="stat-label">Divine Rating</span>
                </div>
                <div className="download-stat stat-card-events">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Hero Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Selection */}
        <section className="platform-selection">
          <div className="container">
            <div className="platform-tabs">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  className={`platform-tab ${activeTab === platform.id ? "active" : ""}`}
                  onClick={() => setActiveTab(platform.id)}
                >
                  <div className="platform-tab-icon">{platform.icon}</div>
                  <span className="platform-tab-name">{platform.name}</span>
                  <div className="platform-tab-stats">
                    <span className="download-count">
                      {downloadStats[platform.id].count.toLocaleString()}
                    </span>
                    <span className="growth-indicator">
                      {downloadStats[platform.id].growth}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sacred Scroll Acquisition Section */}
        <section className="odyssey-section sacred-scroll-section">
          <div className="container">
            <div className="sacred-scroll-content">
              <div className="divine-scroll-info">
                <div className="divine-platform-header">
                  <div
                    className={`divine-platform-icon bg-gradient-to-r ${activePlatform.color}`}
                  >
                    {activePlatform.icon}
                  </div>
                  <div className="divine-platform-details">
                    <h2 className="divine-platform-name">
                      {activePlatform.name}
                    </h2>
                    <p className="divine-blessing-text">
                      {activePlatform.blessing}
                    </p>
                    <div className="divine-platform-meta">
                      <span className="divine-version">
                        {activePlatform.version}
                      </span>
                      <span className="divine-size">{activePlatform.size}</span>
                      <span className="divine-requirements">
                        {activePlatform.requirements}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divine-platform-features">
                  <h3 className="divine-features-title">Sacred Abilities</h3>
                  <ul className="features-list">
                    {activePlatform.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <CheckCircle className="w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="security-info">
                  <div className="security-badge">
                    <Shield className="w-6 h-6" />
                    <div className="security-text">
                      <span className="security-title">
                        🛡️ Divine Protection
                      </span>
                      <span className="security-subtitle">
                        Blessed and purified by the gods
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="download-action">
                <div className="download-card">
                  <div className="download-preview">
                    <div className="device-mockup">
                      <div
                        className={`device-screen bg-gradient-to-br ${activePlatform.color}`}
                      >
                        <div className="app-interface">
                          <div className="interface-header"></div>
                          <div className="interface-content">
                            <div className="content-bar"></div>
                            <div className="content-bar short"></div>
                            <div className="content-bar medium"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="download-cta">
                    <button className="download-btn primary">
                      <Download className="w-6 h-6" />
                      Receive Sacred Scroll for{" "}
                      {activePlatform.name.split(" ")[1] || activePlatform.name}
                    </button>
                    <button className="download-btn secondary">
                      📜 Read Divine Chronicles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sacred System Requirements */}
        <section className="system-requirements">
          <div className="container">
            <h2 className="section-title-odyssey">
              🏛️ Sacred System Requirements 🏛️
            </h2>
            <p className="section-subtitle-odyssey">
              Ensure your divine device meets the sacred specifications to
              receive the chronicles
            </p>
            <div className="requirements-grid">
              {platforms.map((platform) => (
                <div key={platform.id} className="requirement-card">
                  <div className="requirement-header">
                    <div
                      className={`requirement-icon bg-gradient-to-r ${platform.color}`}
                    >
                      {platform.icon}
                    </div>
                    <h3>{platform.name}</h3>
                  </div>
                  <div className="requirement-details">
                    <div className="requirement-item">
                      <span className="label">Divine Version:</span>
                      <span className="value">{platform.version}</span>
                    </div>
                    <div className="requirement-item">
                      <span className="label">Sacred Size:</span>
                      <span className="value">{platform.size}</span>
                    </div>
                    <div className="requirement-item">
                      <span className="label">Realm:</span>
                      <span className="value">{platform.requirements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divine Support Section */}
        <section className="support-section">
          <div className="container">
            <div className="support-content">
              <h2 className="support-title">🔮 Need Divine Guidance? 🔮</h2>
              <p className="support-subtitle">
                Our sacred scribes and divine oracles are here to help you
                master The Odyssey's sacred scrolls and unlock their full power
              </p>
              <div className="support-actions">
                <button className="support-btn">Consult the Oracle</button>
                <button className="support-btn outline">
                  Sacred Knowledge Scrolls
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Downloads;
