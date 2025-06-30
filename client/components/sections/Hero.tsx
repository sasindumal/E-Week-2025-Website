import { CountdownTimer } from "@/components/countdown-timer";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { useCallback } from "react";

export function Hero() {
  const handleRegister = useCallback(() => {
    // Handle registration logic
    console.log("Register button clicked");
  }, []);

  const handleLearnMore = useCallback(() => {
    // Handle learn more logic
    console.log("Learn more button clicked");
  }, []);

  return (
    <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-eweek-red rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-eweek-red rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img
              src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
              alt="E-Week 2025"
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto mb-6 hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-eweek-white mb-6 animate-slide-up">
            E-WEEK
            <span className="block text-eweek-red animate-slide-up delay-200">
              2025
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-eweek-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-300">
            The ultimate engineering competition at University of Jaffna Faculty
            of Engineering. Join us for an unforgettable week of innovation,
            competition, and excellence.
          </p>

          {/* Countdown */}
          <div className="mb-12 animate-slide-up delay-500">
            <CountdownTimer targetDate="2025-08-25T00:00:00" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-700">
            <EnhancedButton
              variant="primary"
              size="lg"
              onClick={handleRegister}
            >
              Register Now
            </EnhancedButton>
            <EnhancedButton
              variant="outline"
              size="lg"
              onClick={handleLearnMore}
            >
              Learn More
            </EnhancedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
