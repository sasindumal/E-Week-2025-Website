import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Scorecards from "./pages/Scorecards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient} data-oid="p4x93f-">
    <TooltipProvider data-oid="moj1m-e">
      <Toaster data-oid="7k0rtc4" />
      <Sonner data-oid="8uj-:.4" />
      <BrowserRouter data-oid="e6k32j4">
        <Routes data-oid="ceyftwe">
          <Route
            path="/"
            element={<Index data-oid="_877fm3" />}
            data-oid="d7k02uo"
          />

          <Route
            path="/events"
            element={<Events data-oid="tsa_14e" />}
            data-oid="9vn9h6m"
          />

          <Route
            path="/gallery"
            element={<Gallery data-oid="-p26ppe" />}
            data-oid="wrnwlnb"
          />

          <Route
            path="/scorecards"
            element={<Scorecards data-oid="co:goee" />}
            data-oid="jd:88si"
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={<NotFound data-oid="02w_9a_" />}
            data-oid="jjeeqbu"
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App data-oid="gk.6ulb" />);
