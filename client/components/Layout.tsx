import { ReactNode } from "react";
import { Navigation } from "@/components/ui/navigation";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen ${className}`} data-oid="k4.mrrv">
      <Navigation data-oid="2nyu0r7" />
      <main data-oid="e8iiasp">{children}</main>
    </div>
  );
}
