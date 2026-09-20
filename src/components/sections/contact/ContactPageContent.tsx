"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleHelp, Clock } from "lucide-react";
import { contactChannels, contactFaqs } from "@/data/contact";
import { SITE } from "@/lib/constants";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import type { ImageAsset, SectionBackgroundConfig } from "@/types";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

/** ImageBand only needs a still, so the shared section background photos are reused. */
function still(bg: SectionBackgroundConfig, alt: string): ImageAsset {
  return { src: bg.src, alt: bg.type === "image-loop" ? bg.alt : alt };
}

/** Contact page: four channels, one short form, the map and a four-question FAQ. */
export function ContactPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Nama minimal 2 karakter.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Format email belum benar.";
    if (form.phone.replace(/[^\d]/g, "").length < 8)
      nextErrors.phone = "Nomor telepon minimal 8 digit.";
    if (form.message.trim().length < 12)
      nextErrors.message = "Ceritakan kebutuhan Anda minimal 12 karakter.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Demo build: no backend is wired up, so we confirm locally.
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <>
      <PageHero
        eyebrow="Kontak"
        title="Mari bicarakan rencana liburan atau acara Anda"
        description="Pilih kanal yang paling nyaman, atau kirim formulir singkat di bawah ini."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kontak" }]}
      >
        <Button href={contactChannels[1].href}>WhatsApp Concierge</Button>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow="Kanal"
          title="Pilih cara menghubungi kami"
          description="Tim reservasi, event, dan kemitraan menjawab setiap hari."
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactChannels.map((channel) => (
            <motion.div key={channel.label} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow={channel.label}
                title={channel.value}
                body={channel.description}
                icon={<Icon name={channel.icon} className="h-5 w-5" />}
                footer={
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="text-sm font-semibold text-lagoon-700 underline-offset-4 hover:underline"
                  >
                    Hubungi
                  </a>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.contactIntro, "Dek kolam kawasan Q")}
        caption="Kawasan Q, Tanjung Benoa"
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Formulir"
          title="Kirim kebutuhan Anda"
          description="Kami membalas setiap permintaan dalam satu hari kerja."
          className="max-w-2xl"
        />
        <FadeIn delay={0.1} className="mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl bg-white/70 p-8 backdrop-blur-sm"
                role="status"
              >
                <CheckCircle2 className="h-8 w-8 text-leaf-600" aria-hidden />
                <AnimatedText as="h3" text="Permintaan Anda tercatat" className="mt-4 text-xl" />
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  Ini demo tanpa backend. Untuk respons langsung, hubungi{" "}
                  <a
                    href={`mailto:${SITE.contact.reservationEmail}`}
                    className="font-semibold text-lagoon-700 underline"
                  >
                    {SITE.contact.reservationEmail}
                  </a>
                  .
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
                  Kirim permintaan lain
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl bg-white/70 p-6 backdrop-blur-sm sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field
                    label="Nama lengkap"
                    id="name"
                    value={form.name}
                    onChange={(value) => update("name", value)}
                    error={errors.name}
                    placeholder="Nama Anda"
                    required
                  />
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(value) => update("email", value)}
                    error={errors.email}
                    placeholder="nama@email.com"
                    required
                  />
                  <Field
                    label="Telepon / WhatsApp"
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(value) => update("phone", value)}
                    error={errors.phone}
                    placeholder="+62 8xx xxxx xxxx"
                    required
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase"
                  >
                    Pesan <span className="text-coral-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    placeholder="Ceritakan kebutuhan Anda secara singkat."
                    aria-invalid={Boolean(errors.message)}
                    className={cn(
                      "rounded-2xl border bg-white px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none",
                      errors.message
                        ? "border-coral-400 focus:border-coral-500"
                        : "border-ink-200 focus:border-lagoon-500",
                    )}
                  />
                  {errors.message ? (
                    <span className="text-xs text-coral-600">{errors.message}</span>
                  ) : null}
                </div>

                <div className="mt-6">
                  <Button type="submit" size="lg">
                    Kirim permintaan
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeIn>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.contactForm, "Lobi utama Hotel Q")}
        caption="Lobi utama Hotel Q"
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Lokasi"
          title="Temukan kami di Tanjung Benoa"
          description={SITE.contact.address}
          className="max-w-2xl"
        />
        <FadeIn
          delay={0.1}
          className="mt-10 overflow-hidden rounded-3xl bg-white/70 p-2 backdrop-blur-sm"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.4rem]">
            {/* Lightweight embedded map (no API key required). */}
            <iframe
              title="Peta lokasi Qubu Resort Tanjung Benoa"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                SITE.contact.mapsQuery,
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </FadeIn>
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-600">
          <Clock className="h-4 w-4 text-lagoon-600" aria-hidden />
          {SITE.hours.sales}
        </p>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.ctaBand, "Lounge dengan pemandangan laut")}
        caption="Ruang tunggu tamu"
      />

      <ContentBand id="bantuan">
        <SectionTitle
          eyebrow="Pusat bantuan"
          title="Pertanyaan yang sering diajukan"
          description="Belum terjawab? WhatsApp concierge kami aktif setiap hari."
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactFaqs.slice(0, 4).map((faq) => (
            <motion.div key={faq.question} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow="FAQ"
                title={faq.question}
                body={faq.answer}
                icon={<CircleHelp className="h-5 w-5" aria-hidden />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
        <p id="privasi" className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-500">
          Data formulir dipakai hanya untuk keperluan reservasi dan tidak dijual ke pihak ketiga.
          Permintaan penghapusan data dapat dikirim ke{" "}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="font-semibold text-lagoon-700 underline"
          >
            {SITE.contact.email}
          </a>
          .
        </p>
      </ContentBand>
    </>
  );
}

type FieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

/** Small labelled input used by the contact form. */
function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase"
      >
        {label} {required ? <span className="text-coral-500">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-12 rounded-2xl border bg-white px-4 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none",
          error ? "border-coral-400 focus:border-coral-500" : "border-ink-200 focus:border-lagoon-500",
        )}
      />
      {error ? (
        <span id={`${id}-error`} className="text-xs text-coral-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}
