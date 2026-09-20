"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Presentational button. Receives everything through props and never touches a store
 * (prd.md section 6: components/ui stay dumb).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition = "right",
  fullWidth = false,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-[transform,box-shadow,background-color,color] duration-300 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon-600",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover/btn:opacity-100",
          variant === "primary"
            ? "bg-linear-to-r from-[#FFE52C] to-[#EF723D]"
            : "bg-white/25",
        )}
      />
      {icon && iconPosition === "left" ? (
        <span
          className={cn(
            "relative z-10 shrink-0 transition-colors duration-300",
            variant === "primary" && "group-hover/btn:text-ink-900",
          )}
        >
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          variant === "primary" && "group-hover/btn:text-ink-900",
        )}
      >
        {children}
      </span>
      {icon && iconPosition === "right" ? (
        <span
          className={cn(
            "relative z-10 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1",
            variant === "primary" && "group-hover/btn:text-ink-900 transition-colors",
          )}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    const isExternal = /^https?:|^mailto:|^tel:/.test(href);

    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-lagoon-600 text-white shadow-[0_14px_34px_-16px_rgba(11,108,60,0.9)] hover:shadow-[0_20px_44px_-18px_rgba(11,108,60,0.95)]",
  secondary:
    "bg-sunshine-400 text-ink-900 shadow-[0_14px_34px_-18px_rgba(255,229,44,0.9)] hover:bg-sunshine-300",
  outline: "border border-ink-300 bg-white/70 text-ink-800 hover:border-lagoon-500 hover:text-lagoon-700",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  light:
    "bg-white/85 text-ink-800 backdrop-blur-md shadow-[0_12px_30px_-20px_rgba(19,25,34,0.5)] hover:bg-white",
};
