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

  return (
    <footer className="relative overflow-hidden border-t border-ink-200/70 bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-grid opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-lagoon-100/70 blur-3xl"
      />

      <div className="shell relative py-16 lg:py-20">
        {/* Newsletter band */}
        <FadeIn className="mb-14 overflow-hidden rounded-3xl border border-lagoon-100 bg-gradient-to-r from-lagoon-50 via-white to-sunshine-50 p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl">Dapatkan promo & info event lebih dulu</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Buletin bulanan berisi paket menginap, jadwal event waterpark, dan penawaran
                khusus MICE. Tanpa spam, bisa berhenti kapan saja.
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
                  className="h-12 flex-1 rounded-full border border-ink-200 bg-white px-5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-lagoon-500 focus:outline-none"
                />
                <Button type="submit" size="md" icon={<Send className="h-4 w-4" aria-hidden />}>
                  Berlangganan
                </Button>
              </div>
              {status === "success" ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm font-medium text-leaf-700"
                >
                  Terima kasih! Konfirmasi langganan dikirim ke email Anda.
                </motion.p>
              ) : (
                <p className="mt-3 text-xs text-ink-500">
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

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600">{SITE.description}</p>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-ink-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-600" aria-hidden />
                <span>{SITE.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-lagoon-600" aria-hidden />
                <a
                  href={`tel:${SITE.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-lagoon-700"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-lagoon-600" aria-hidden />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="transition-colors hover:text-lagoon-700"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-lagoon-600" aria-hidden />
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-lagoon-400 hover:text-lagoon-700"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold tracking-[0.16em] text-ink-900 uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.href}`}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-ink-600 transition-colors hover:text-lagoon-700"
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

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-200/70 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Seluruh hak cipta dilindungi.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/contact#privasi" className="transition-colors hover:text-lagoon-700">
              Kebijakan Privasi
            </Link>
            <Link href="/contact#bantuan" className="transition-colors hover:text-lagoon-700">
              Pusat Bantuan
            </Link>
            <span>Placeholder fotografi: Unsplash & Wikimedia Commons</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
