import { Layout } from "@/components/Layout";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { EventHighlights } from "@/components/sections/EventHighlights";
import { Footer } from "@/components/sections/Footer";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Add any page-specific effects or analytics here
    document.title = "E-Week 2025 - University of Jaffna";
  }, []);

  return (
    <Layout className="bg-gradient-to-br from-eweek-navy via-eweek-navy to-eweek-navy/80">
      <Hero />
      <Features />
      <EventHighlights />
      <Footer />
    </Layout>
  );
}
