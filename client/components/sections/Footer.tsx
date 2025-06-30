export function Footer() {
  return (
    <footer className="bg-eweek-navy border-t border-eweek-red/20 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
            alt="E-Week 2025"
            className="h-16 w-auto hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <p className="text-eweek-white/80 mb-4">
          University of Jaffna • Faculty of Engineering
        </p>
        <p className="text-eweek-white/60 text-sm">
          © 2025 E-Week. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
