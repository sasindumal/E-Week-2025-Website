import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface EnhancedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "glass" | "elevated";
  hover?: boolean;
}

export function EnhancedCard({
  children,
  className,
  variant = "default",
  hover = false,
  ...props
}: EnhancedCardProps) {
  const baseClasses = "rounded-xl transition-all duration-300";

  const variants = {
    default: "bg-eweek-white border border-eweek-navy/10",
    glass: "bg-eweek-white/10 backdrop-blur-sm border border-eweek-red/30",
    elevated: "bg-eweek-white shadow-lg border border-eweek-navy/10",
  };

  const hoverEffect = hover
    ? "hover:scale-105 hover:shadow-xl transform cursor-pointer"
    : "";

  return (
    <div
      className={cn(baseClasses, variants[variant], hoverEffect, className)}
      {...props}
      data-oid="277._1t"
    >
      {children}
    </div>
  );
}
