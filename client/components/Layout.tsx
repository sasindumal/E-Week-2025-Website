import { ReactNode } from "react";
import { Navigation } from "@/components/ui/navigation";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
