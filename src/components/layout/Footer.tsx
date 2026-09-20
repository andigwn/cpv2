"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { FOOTER_NAV, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FadeIn } from "@/components/animations/FadeIn";

/**
 * Rich multi-column footer (prd.md section 4 point 7).
 * The footer is the one section allowed to keep a flat background.
 */
export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  // No top border and no background of its own: the footer continues the same
  // broken-white canvas as the bands above it, so the page ends without a seam.
  return (
    <footer className="relative overflow-hidden bg-sand-100">
      <div
        aria-hidden
        className="texture-grid pointer-events-none absolute inset-0 opacity-[0.35]"
      />
      <div
        aria-hidden
        className="bg-lagoon-100/70 pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full blur-3xl"
      />

      <div className="shell relative py-16 lg:py-20">
        {/* Newsletter band */}
        <FadeIn className="border-lagoon-100 from-lagoon-50 to-sunshine-50 mb-14 overflow-hidden rounded-3xl border bg-linear-to-r via-white p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl">Dapatkan promo & info event lebih dulu</h2>
              <p className="text-ink-600 mt-2 text-sm leading-relaxed">
                Buletin bulanan berisi paket menginap, jadwal event waterpark, dan penawaran khusus
                MICE. Tanpa spam, bisa berhenti kapan saja.
              </p>
            </div>

            <form
              className="w-full max-w-md"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email) return;
                setStatus("success");
                setEmail("");
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Alamat email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@email.com"
                  className="border-ink-200 text-ink-800 placeholder:text-ink-400 focus:border-lagoon-500 h-12 flex-1 rounded-full border bg-white px-5 text-sm focus:outline-none"
                />
                <Button type="submit" size="md" icon={<Send className="h-4 w-4" aria-hidden />}>
                  Berlangganan
                </Button>
              </div>
              {status === "success" ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-leaf-700 mt-3 text-sm font-medium"
                >
                  Terima kasih! Konfirmasi langganan dikirim ke email Anda.
                </motion.p>
              ) : (
                <p className="text-ink-500 mt-3 text-xs">
                  Dengan berlangganan Anda menyetujui kebijakan privasi kami.
                </p>
              )}
            </form>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link
              href="/"
              aria-label={SITE.name + " — beranda"}
              className="inline-flex items-center"
            >
              <Image
                src="/images/logo.png"
                alt={SITE.name}
                width={199}
                height={36}
                className="h-9 w-auto sm:h-10"
              />
            </Link>

            <p className="text-ink-600 mt-5 max-w-sm text-sm leading-relaxed">{SITE.description}</p>

            <ul className="text-ink-600 mt-6 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-lagoon-600 mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{SITE.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-lagoon-600 h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={`tel:${SITE.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-lagoon-700 transition-colors"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-lagoon-600 h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-lagoon-700 transition-colors"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-lagoon-600 h-4 w-4 shrink-0" aria-hidden />
                <span>{SITE.hours.waterpark}</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="border-ink-200 text-ink-600 hover:border-lagoon-400 hover:text-lagoon-700 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="text-ink-900 text-sm font-semibold tracking-[0.16em] uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.href}`}>
                      <Link
                        href={item.href}
                        className="group text-ink-600 hover:text-lagoon-700 inline-flex items-center gap-1.5 text-sm transition-colors"
                      >
                        {item.label}
                        <ArrowRight
                          className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-ink-200/70 text-ink-500 mt-14 flex flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Seluruh hak cipta dilindungi.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/contact#privasi" className="hover:text-lagoon-700 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/contact#bantuan" className="hover:text-lagoon-700 transition-colors">
              Pusat Bantuan
            </Link>
            <span>Placeholder fotografi: Unsplash & Wikimedia Commons</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
