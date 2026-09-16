"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  contactChannels,
  contactFaqs,
  departmentContacts,
  interestOptions,
  officeLocations,
} from "@/data/contact";
import { SITE } from "@/lib/constants";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  guests: string;
  dates: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: interestOptions[0],
  guests: "2",
  dates: "",
  message: "",
};

/** Contact page with validated form, department directory, map and FAQ. */
export function ContactPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
        description="Tim reservasi, event, dan kemitraan kami siap membantu. Pilih kanal yang paling nyaman atau isi formulir di bawah ini."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kontak" }]}
      >
        <StaggerContainer className="grid gap-4 sm:grid-cols-2">
          {contactChannels.map((channel) => (
            <motion.a
              key={channel.label}
              variants={staggerItem}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="group flex items-start gap-4 rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_25px_60px_-45px_rgba(19,25,34,0.5)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lagoon-50 text-lagoon-700">
                <Icon name={channel.icon} className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs tracking-[0.16em] text-ink-500 uppercase">
                  {channel.label}
                </span>
                <span className="mt-1 truncate text-sm font-semibold text-ink-900 transition-colors group-hover:text-lagoon-700">
                  {channel.value}
                </span>
                <span className="mt-1 text-xs text-ink-500">{channel.description}</span>
              </span>
            </motion.a>
          ))}
        </StaggerContainer>
      </PageHero>

      {/* ---------------- Form + info ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.contactForm} />

        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionTitle
              eyebrow="Formulir"
              title="Kirim kebutuhan Anda"
              description="Kami membalas setiap permintaan dalam 1 hari kerja. Untuk kebutuhan mendesak, silakan hubungi WhatsApp concierge."
            />

            <FadeIn delay={0.1} className="mt-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-3xl border border-leaf-200 bg-leaf-50/90 p-8"
                    role="status"
                  >
                    <CheckCircle2 className="h-8 w-8 text-leaf-600" aria-hidden />
                    <h3 className="mt-4 text-xl">Permintaan Anda tercatat</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-700">
                      Terima kasih! Ini adalah demo tanpa backend: pada implementasi produksi,
                      data formulir akan dikirim ke CRM/email tim reservasi. Silakan hubungi{" "}
                      <a
                        href={`mailto:${SITE.contact.reservationEmail}`}
                        className="font-semibold text-leaf-800 underline"
                      >
                        {SITE.contact.reservationEmail}
                      </a>{" "}
                      untuk respons langsung.
                    </p>
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                    >
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
                    className="rounded-3xl border border-white/70 bg-white/90 p-6 backdrop-blur-sm sm:p-8"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
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
                        label="Nomor telepon / WhatsApp"
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(value) => update("phone", value)}
                        error={errors.phone}
                        placeholder="+62 8xx xxxx xxxx"
                        required
                      />
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="interest"
                          className="text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase"
                        >
                          Kebutuhan
                        </label>
                        <select
                          id="interest"
                          value={form.interest}
                          onChange={(event) => update("interest", event.target.value)}
                          className="h-12 rounded-2xl border border-ink-200 bg-white px-4 text-sm text-ink-800 focus:border-lagoon-500 focus:outline-none"
                        >
                          {interestOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Field
                        label="Perkiraan jumlah tamu"
                        id="guests"
                        type="number"
                        min="1"
                        value={form.guests}
                        onChange={(value) => update("guests", value)}
                        placeholder="2"
                      />
                      <Field
                        label="Tanggal rencana"
                        id="dates"
                        type="date"
                        value={form.dates}
                        onChange={(value) => update("dates", value)}
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
                        rows={5}
                        value={form.message}
                        onChange={(event) => update("message", event.target.value)}
                        placeholder="Ceritakan kebutuhan Anda: jumlah kamar, agenda acara, atau permintaan khusus."
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

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Button type="submit" size="lg">
                        Kirim permintaan
                      </Button>
                      <p className="max-w-xs text-xs leading-relaxed text-ink-500">
                        Dengan mengirim formulir ini Anda menyetujui pemrosesan data sesuai
                        kebijakan privasi kami.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>

          {/* ---------------- Info column ---------------- */}
          <div className="flex flex-col gap-6">
            <FadeIn className="rounded-3xl border border-white/70 bg-white/90 p-6 backdrop-blur-sm">
              <h2 className="text-lg">Kantor & properti</h2>
              <ul className="mt-5 flex flex-col gap-5">
                {officeLocations.map((office) => (
                  <li key={office.name} className="flex gap-4">
                    <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={office.image.src}
                        alt={office.image.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-ink-900">{office.name}</span>
                      <span className="mt-1 text-xs leading-relaxed text-ink-500">
                        {office.address}
                      </span>
                      <a
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-lagoon-700"
                      >
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        Buka di Google Maps
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.08} className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 backdrop-blur-sm">
              <div className="relative aspect-[4/3]">
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
              <div className="flex flex-col gap-2 p-5 text-xs text-ink-600">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
                  {SITE.contact.address}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
                  {SITE.hours.sales}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.14} className="rounded-3xl border border-white/70 bg-white/90 p-6 backdrop-blur-sm">
              <h2 className="text-lg">Kontak per departemen</h2>
              <ul className="mt-5 flex flex-col divide-y divide-ink-100">
                {departmentContacts.map((department) => (
                  <li key={department.name} className="flex flex-col gap-1 py-3">
                    <span className="text-sm font-semibold text-ink-900">{department.name}</span>
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
                      <a
                        href={`mailto:${department.email}`}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-lagoon-700"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {department.email}
                      </a>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" aria-hidden />
                        {department.phone}
                      </span>
                    </span>
                    <span className="text-xs text-ink-400">{department.hours}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="bantuan" className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.ctaBand} />

        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle
            eyebrow="Pusat bantuan"
            title="Pertanyaan yang sering diajukan"
            description="Belum menemukan jawabannya? Hubungi WhatsApp concierge kami, tersedia setiap hari 07.00 – 22.00 WITA."
          />

          <div className="flex flex-col gap-4">
            {contactFaqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <FadeIn
                  key={faq.question}
                  delay={index * 0.05}
                  className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 backdrop-blur-sm"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-sm font-semibold text-ink-900 sm:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-lagoon-600 transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-ink-600">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Privacy anchor ---------------- */}
      <section id="privasi" className="relative overflow-hidden py-16">
        <SectionBackground {...sectionBackgrounds.contactIntro} />
        <div className="shell relative z-10">
          <FadeIn className="rounded-3xl border border-white/70 bg-white/90 p-8 backdrop-blur-sm">
            <h2 className="text-xl">Kebijakan privasi singkat</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600">
              Kami hanya mengumpulkan data yang Anda kirim melalui formulir kontak atau pemesanan
              (nama, email, telepon, dan detail permintaan) untuk keperluan reservasi dan layanan
              tamu. Data tidak dijual ke pihak ketiga, disimpan maksimal 24 bulan, dan dapat
              diminta penghapusannya kapan saja melalui {SITE.contact.email}.
            </p>
          </FadeIn>
        </div>
      </section>
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
  min?: string;
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
  min,
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
        min={min}
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
