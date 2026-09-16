"use client";

import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
import type { SocialIconName } from "@/types";

const MAP = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

type SocialIconProps = {
  name: SocialIconName;
  className?: string;
};

/** Resolves a data-layer icon name to a lucide component. */
export function SocialIcon({ name, className }: SocialIconProps) {
  const Icon = MAP[name];
  return <Icon className={className} aria-hidden />;
}
