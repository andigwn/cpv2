import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MAIN_NAV } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Halaman tidak ditemukan"
        description="Tautan yang Anda buka mungkin sudah dipindahkan atau tidak pernah ada. Mari kembali ke jalur utama."
        background={sectionBackgrounds.detailPage}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "404" }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/" icon={<Home className="h-4 w-4" aria-hidden />} iconPosition="left">
            Kembali ke Home
          </Button>
          <Button
            href="/services"
            variant="outline"
            icon={<Compass className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            Jelajahi layanan
          </Button>
        </div>
      </PageHero>

      <section className="shell relative z-10 py-16">
        <h2 className="text-lg">Halaman yang tersedia</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-ink-200 bg-white/85 px-5 py-4 text-sm font-medium text-ink-800 transition-colors hover:border-lagoon-400 hover:text-lagoon-700"
              >
                {item.label}
                <span aria-hidden className="text-ink-300">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
