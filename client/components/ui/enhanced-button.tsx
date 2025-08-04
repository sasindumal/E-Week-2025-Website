import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const EnhancedButton = forwardRef<
  HTMLButtonElement,
  EnhancedButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const variants = {
      primary: "bg-eweek-red hover:bg-eweek-red/90 text-eweek-white shadow-lg",
      secondary:
        "bg-eweek-navy hover:bg-eweek-navy/90 text-eweek-white shadow-lg",
      outline:
        "border-2 border-eweek-white text-eweek-white hover:bg-eweek-white hover:text-eweek-navy",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isLoading && "opacity-75 cursor-wait",
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
        data-oid="g0zp-at"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2" data-oid="i9hzjf6">
            <div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              data-oid="k60l_sa"
            />
            <span data-oid="1ljj28h">Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  },
);

EnhancedButton.displayName = "EnhancedButton";
