"use client";

import {
  Baby,
  CalendarCheck,
  Flower2,
  GraduationCap,
  HeartPulse,
  Home,
  Leaf,
  Mail,
  MessageCircle,
  Phone,
  Presentation,
  ShieldCheck,
  Sun,
  Umbrella,
  Users,
  UtensilsCrossed,
  Waves,
} from "lucide-react";

const ICONS = {
  waves: Waves,
  umbrella: Umbrella,
  flower: Flower2,
  utensils: UtensilsCrossed,
  presentation: Presentation,
  baby: Baby,
  Sun,
  ShieldCheck,
  Users,
  Leaf,
  HeartPulse,
  GraduationCap,
  Home,
  Phone,
  MessageCircle,
  Mail,
  CalendarCheck,
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName | string;
  className?: string;
  strokeWidth?: number;
};

/** Maps serializable icon names from `src/data` to lucide components. */
export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Component = ICONS[name as IconName] ?? Sun;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export { ICONS };
