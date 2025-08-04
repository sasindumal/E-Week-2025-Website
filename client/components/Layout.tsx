import { ReactNode } from "react";
import { Navigation } from "@/components/ui/navigation";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen ${className}`} data-oid="ro.0j60">
      <Navigation data-oid="k-o2i8t" />
      <main data-oid="9cmxs5j">{children}</main>
    </div>
  );
}
