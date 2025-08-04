import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/scorecards", label: "Scorecards" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-eweek-navy/95 backdrop-blur-sm border-b border-eweek-red/20"
      data-oid="fywh3bo"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-oid="hisyte0"
      >
        <div
          className="flex justify-between items-center h-16"
          data-oid="tcqd06j"
        >
          <Link
            to="/"
            className="flex items-center space-x-2"
            data-oid="ylbrg4f"
          >
            <img
              src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
              alt="E-Week 2025"
              className="h-10 w-auto"
              data-oid="vkmcnzi"
            />

            <span
              className="text-eweek-white font-bold text-xl"
              data-oid="dkqd2hv"
            >
              E-WEEK 2025
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center space-x-8"
            data-oid="51:gyxm"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-eweek-white hover:text-eweek-red transition-colors duration-200 font-medium",
                  location.pathname === item.href && "text-eweek-red",
                )}
                data-oid="710g9iu"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden" data-oid="w7oo:_-">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-eweek-white hover:text-eweek-red transition-colors"
              data-oid="9msrvml"
            >
              {isOpen ? (
                <X size={24} data-oid="1d_foj6" />
              ) : (
                <Menu size={24} data-oid="y34_g2v" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" data-oid="w3v.2ji">
            <div
              className="px-2 pt-2 pb-3 space-y-1 bg-eweek-navy/95"
              data-oid="63hrdmk"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-eweek-white hover:text-eweek-red transition-colors duration-200 font-medium",
                    location.pathname === item.href && "text-eweek-red",
                  )}
                  data-oid="3quesu4"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
