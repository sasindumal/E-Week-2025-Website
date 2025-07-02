import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import {
  Lightbulb,
  Users,
  Target,
  Rocket,
  Zap,
  Award,
  Globe,
  Heart,
  Brain,
  Cpu,
  Code,
  Wrench,
  Star,
  TrendingUp,
  Clock,
  Calendar,
  ArrowRight,
  ChevronDown,
  Play,
  Sparkles,
  Shield,
  Trophy,
} from "lucide-react";

const About = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [expandedValue, setExpandedValue] = useState(null);
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

  // E-Week Timeline Data
  const timeline = [
    {
      year: "2020",
      title: "The Genesis",
      description: "Born from a Vision",
      details:
        "E-Week was conceived by passionate engineering students who envisioned a platform where innovation meets competition. The inaugural event brought together 920 participants across multiple engineering disciplines.",
      icon: <Lightbulb className="w-8 h-8" />,
      milestone: "First E-Week Event",
      achievements: ["920 Participants", "5 Engineering Tracks", "€30K Prizes"],
    },
    {
      year: "2021",
      title: "Innovation Unleashed",
      description: "Digital Transformation Era",
      details:
        "The pandemic couldn't stop innovation. E-Week 2021 pioneered the hybrid model, combining virtual and physical competitions, setting new standards for global engineering collaboration.",
      icon: <Globe className="w-8 h-8" />,
      milestone: "Global Virtual Participation",
      achievements: [
        "980 Participants",
        "Hybrid Format Launch",
        "International Reach",
      ],
    },
    {
      year: "2022",
      title: "Future Engineering",
      description: "Technology Integration",
      details:
        "Introducing cutting-edge technologies like AI, Machine Learning, and Data Science. E-Week 2022 established itself as the premier platform for emerging tech innovation.",
      icon: <Brain className="w-8 h-8" />,
      milestone: "AI & ML Track Introduction",
      achievements: [
        "1,050 Participants",
        "Data Science Olympics",
        "Industry Partnerships",
      ],
    },
    {
      year: "2023",
      title: "Tech for Tomorrow",
      description: "Sustainability Focus",
      details:
        "E-Week embraced sustainable technology solutions, blockchain innovations, and green engineering practices, positioning itself at the forefront of responsible innovation.",
      icon: <Shield className="w-8 h-8" />,
      milestone: "Sustainability & Blockchain",
      achievements: [
        "1,180 Participants",
        "Web3 Development",
        "Green Tech Solutions",
      ],
    },
    {
      year: "2024",
      title: "Digital Revolution",
      description: "Breaking All Records",
      details:
        "The most ambitious E-Week yet, featuring quantum computing, advanced AI, and international collaborations. Setting new benchmarks for engineering excellence and innovation.",
      icon: <Rocket className="w-8 h-8" />,
      milestone: "Quantum Computing Workshop",
      achievements: [
        "1,250 Participants",
        "Quantum Innovation",
        "€50K Prize Pool",
      ],
    },
    {
      year: "2025",
      title: "The Future Begins",
      description: "Next Generation Engineering",
      details:
        "E-Week 2025 represents the pinnacle of engineering innovation, featuring cutting-edge technologies, global partnerships, and the most comprehensive competition format ever designed.",
      icon: <Star className="w-8 h-8" />,
      milestone: "Global Engineering Summit",
      achievements: [
        "1,500+ Expected",
        "Revolutionary Format",
        "Unlimited Possibilities",
      ],
    },
  ];

  // Core Values
  const coreValues = [
    {
      title: "Innovation Excellence",
      description:
        "We believe in pushing the boundaries of what's possible, encouraging creative solutions to complex engineering challenges.",
      icon: <Lightbulb className="w-8 h-8" />,
      details: [
        "Cutting-edge technology integration",
        "Creative problem-solving approaches",
        "Future-focused engineering solutions",
        "Breakthrough innovation recognition",
      ],
    },
    {
      title: "Collaborative Spirit",
      description:
        "Engineering is a team sport. We foster collaboration across disciplines, batches, and institutions to create stronger solutions.",
      icon: <Users className="w-8 h-8" />,
      details: [
        "Cross-batch collaboration",
        "Multidisciplinary teamwork",
        "Global engineering community",
        "Knowledge sharing platforms",
      ],
    },
    {
      title: "Excellence in Education",
      description:
        "We're committed to advancing engineering education through hands-on experiences, mentorship, and real-world applications.",
      icon: <Target className="w-8 h-8" />,
      details: [
        "Practical learning experiences",
        "Industry mentor guidance",
        "Skill development workshops",
        "Career advancement support",
      ],
    },
    {
      title: "Technological Leadership",
      description:
        "We embrace emerging technologies and prepare future engineers to lead in an ever-evolving technological landscape.",
      icon: <Cpu className="w-8 h-8" />,
      details: [
        "AI and Machine Learning focus",
        "Quantum computing exploration",
        "Sustainable technology solutions",
        "Digital transformation leadership",
      ],
    },
  ];

  // Impact Statistics
  const impactStats = [
    {
      number: "5,400+",
      label: "Total Participants",
      description: "Engineering minds from around the world",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "125+",
      label: "Events Conducted",
      description: "Competitions, workshops, and conferences",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      number: "€270K+",
      label: "Total Prizes",
      description: "Investment in engineering talent",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Industry Partners",
      description: "Leading technology companies",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      number: "15+",
      label: "Universities",
      description: "Global educational partnerships",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      number: "100%",
      label: "Success Rate",
      description: "Participant skill enhancement",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  // What Makes E-Week Special
  const specialFeatures = [
    {
      title: "Multi-Disciplinary Approach",
      description:
        "From software engineering to mechanical design, from AI innovation to sustainable solutions - E-Week covers the entire spectrum of modern engineering.",
      icon: <Wrench className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Industry Integration",
      description:
        "Real-world challenges, industry mentors, and career opportunities. E-Week bridges the gap between academic learning and professional excellence.",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Innovation Ecosystem",
      description:
        "A thriving ecosystem where ideas flourish, collaborations form, and breakthrough innovations emerge from passionate engineering minds.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Global Community",
      description:
        "Connect with engineering talent worldwide, share knowledge, and build lasting professional relationships that span continents.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <Layout>
      <div className="about-page animate-slide-up">
        {/* Hero Section */}
        <section className="about-hero" ref={heroRef}>
          {/* Animated Background like Events page */}
          <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />
          <div className="about-hero-bg">
            {/* Enhanced Floating Shapes */}
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
            </div>

            {/* Enhanced Particle Effect */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i}`}></div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="about-hero-content">
              <div
                className="about-hero-icon"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <Rocket className="w-20 h-20" />
                <div className="logo-glow"></div>
              </div>
              <h1 className="about-hero-title hero-title-events">About E-Week</h1>
              <p className="about-hero-subtitle hero-subtitle-events">
                The premier engineering innovation platform where brilliant
                minds converge to shape the future of technology
              </p>

              <div className="hero-mission-statement hero-stats-events">
                <div className="mission-card stat-card-events">
                  <Heart className="w-8 h-8" />
                  <div className="mission-content">
                    <h3>Our Mission</h3>
                    <p>
                      To inspire, challenge, and empower the next generation of
                      engineers through innovative competitions, collaborative
                      learning, and cutting-edge technology exploration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is E-Week Section */}
        <section className="what-is-eweek">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                What is E-Week?
                <Zap className="title-icon" />
              </h2>
              <p className="section-subtitle">
                Engineering Week - A comprehensive celebration of innovation,
                creativity, and engineering excellence
              </p>
            </div>

            <div className="eweek-definition">
              <div className="definition-content">
                <div className="definition-main">
                  <h3>Engineering Week (E-Week)</h3>
                  <p>
                    E-Week is an intensive, week-long festival of engineering
                    innovation that brings together students, professionals, and
                    industry leaders from around the world. It's more than just
                    a competition - it's a transformative experience that
                    challenges participants to push the boundaries of what's
                    possible in engineering and technology.
                  </p>
                </div>

                <div className="definition-features">
                  <div className="feature-grid">
                    <div className="feature-card">
                      <Code className="w-6 h-6" />
                      <h4>Technical Challenges</h4>
                      <p>
                        Cutting-edge programming contests, AI challenges, and
                        software development competitions
                      </p>
                    </div>
                    <div className="feature-card">
                      <Wrench className="w-6 h-6" />
                      <h4>Engineering Design</h4>
                      <p>
                        Mechanical design, robotics, CAD competitions, and
                        innovative engineering solutions
                      </p>
                    </div>
                    <div className="feature-card">
                      <Lightbulb className="w-6 h-6" />
                      <h4>Innovation Labs</h4>
                      <p>
                        Startup pitches, creative problem-solving, and
                        breakthrough innovation showcases
                      </p>
                    </div>
                    <div className="feature-card">
                      <Users className="w-6 h-6" />
                      <h4>Collaborative Learning</h4>
                      <p>
                        Workshops, mentorship sessions, and knowledge sharing
                        across engineering disciplines
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="eweek-timeline">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                The E-Week Journey
                <Clock className="title-icon" />
              </h2>
              <p className="section-subtitle">
                From humble beginnings to global engineering phenomenon
              </p>
            </div>

            <div className="timeline-container">
              <div className="timeline-nav">
                {timeline.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTimeline(index)}
                    className={`timeline-nav-item ${
                      activeTimeline === index ? "active" : ""
                    }`}
                  >
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-title">{item.title}</span>
                  </button>
                ))}
              </div>

              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="timeline-icon">
                    {timeline[activeTimeline].icon}
                  </div>
                  <div className="timeline-details">
                    <h3 className="timeline-card-title">
                      {timeline[activeTimeline].title}
                    </h3>
                    <p className="timeline-description">
                      {timeline[activeTimeline].description}
                    </p>
                    <p className="timeline-details-text">
                      {timeline[activeTimeline].details}
                    </p>
                    <div className="timeline-milestone">
                      <Star className="w-5 h-5" />
                      <span>{timeline[activeTimeline].milestone}</span>
                    </div>
                    <div className="timeline-achievements">
                      {timeline[activeTimeline].achievements.map(
                        (achievement, idx) => (
                          <div key={idx} className="achievement-item">
                            <ArrowRight className="w-4 h-4" />
                            <span>{achievement}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="core-values">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Our Core Values
                <Heart className="title-icon" />
              </h2>
              <p className="section-subtitle">
                The fundamental principles that drive E-Week's mission and
                vision
              </p>
            </div>

            <div className="values-grid">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className={`value-card ${
                    expandedValue === index ? "expanded" : ""
                  }`}
                  onClick={() =>
                    setExpandedValue(expandedValue === index ? null : index)
                  }
                >
                  <div className="value-header">
                    <div className="value-icon">{value.icon}</div>
                    <div className="value-content">
                      <h3 className="value-title">{value.title}</h3>
                      <p className="value-description">{value.description}</p>
                    </div>
                    <ChevronDown
                      className={`value-toggle ${
                        expandedValue === index ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {expandedValue === index && (
                    <div className="value-details">
                      <ul className="value-details-list">
                        {value.details.map((detail, idx) => (
                          <li key={idx} className="value-detail-item">
                            <Play className="w-4 h-4" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="impact-stats">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Our Global Impact
                <TrendingUp className="title-icon" />
              </h2>
              <p className="section-subtitle">
                Measuring success through meaningful engineering advancement
              </p>
            </div>

            <div className="stats-grid">
              {impactStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <h3 className="stat-number">{stat.number}</h3>
                    <h4 className="stat-label">{stat.label}</h4>
                    <p className="stat-description">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes E-Week Special */}
        <section className="special-features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                What Makes E-Week Special
                <Sparkles className="title-icon" />
              </h2>
              <p className="section-subtitle">
                Unique features that set E-Week apart from traditional
                engineering competitions
              </p>
            </div>

            <div className="features-grid">
              {specialFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`special-feature-card bg-gradient-to-br ${feature.color}`}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-overlay"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision for the Future */}
        <section className="future-vision">
          <div className="container">
            <div className="vision-content">
              <div className="vision-header">
                <h2 className="vision-title">
                  Engineering the Future, Today
                  <Rocket className="title-icon" />
                </h2>
                <p className="vision-subtitle">
                  E-Week continues to evolve, embracing new technologies and
                  expanding opportunities for engineering innovation worldwide.
                </p>
              </div>

              <div className="vision-goals">
                <div className="goal-card">
                  <div className="goal-icon">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3>Global Expansion</h3>
                  <p>
                    Reaching engineering communities worldwide, fostering
                    international collaboration and knowledge exchange.
                  </p>
                </div>
                <div className="goal-card">
                  <div className="goal-icon">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3>Technology Integration</h3>
                  <p>
                    Embracing emerging technologies like quantum computing,
                    advanced AI, and sustainable engineering solutions.
                  </p>
                </div>
                <div className="goal-card">
                  <div className="goal-icon">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3>Community Building</h3>
                  <p>
                    Creating lasting connections that transform individual
                    engineers into a powerful global innovation network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
