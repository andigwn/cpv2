"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleHelp, Clock } from "lucide-react";
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
import { useContactChannels, useContactFaqs } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

/** ImageBand only needs a still, so the shared section background photos are reused. */
function still(bg: SectionBackgroundConfig, alt: string): ImageAsset {
  return { src: bg.src, alt: bg.alt || alt };
}

/** Contact page: four channels, one short form, the map and a four-question FAQ. */
export function ContactPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const t = useT();
  const contactChannels = useContactChannels();
  const contactFaqs = useContactFaqs();
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
    if (form.name.trim().length < 2) nextErrors.name = t("contact.errorName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = t("contact.errorEmail");
    if (form.phone.replace(/[^\d]/g, "").length < 8) nextErrors.phone = t("contact.errorPhone");
    if (form.message.trim().length < 12) nextErrors.message = t("contact.errorMessage");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Demo build: no backend is wired up, so we confirm locally.
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <>
      <PageHero
        eyebrow={t("contact.heroEyebrow")}
        title={t("contact.heroTitle")}
        description={t("contact.heroDescription")}
        background={heroBackground}
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.contact") }]}
      >
        <Button href={contactChannels[1].href}>{t("contact.heroCta")}</Button>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow={t("contact.channelsEyebrow")}
          title={t("contact.channelsTitle")}
          description={t("contact.channelsDescription")}
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
                    className="text-lagoon-700 text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    {t("contact.channelCta")}
                  </a>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.contactIntro, t("contact.bandCaption"))}
        caption={t("contact.bandCaption")}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("contact.formEyebrow")}
          title={t("contact.formTitle")}
          description={t("contact.formDescription")}
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
                <CheckCircle2 className="text-leaf-600 h-8 w-8" aria-hidden />
                <AnimatedText as="h3" text={t("contact.successTitle")} className="mt-4 text-xl" />
                <p className="text-ink-700 mt-3 text-sm leading-relaxed">
                  {t("contact.successBodyPrefix")}
                  <a
                    href={`mailto:${SITE.contact.reservationEmail}`}
                    className="text-lagoon-700 font-semibold underline"
                  >
                    {SITE.contact.reservationEmail}
                  </a>
                  {t("contact.successBodySuffix")}
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
                  {t("contact.successCta")}
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
                    label={t("contact.formName")}
                    id="name"
                    value={form.name}
                    onChange={(value) => update("name", value)}
                    error={errors.name}
                    placeholder={t("contact.formNamePlaceholder")}
                    required
                  />
                  <Field
                    label={t("contact.formEmail")}
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(value) => update("email", value)}
                    error={errors.email}
                    placeholder={t("footer.emailPlaceholder")}
                    required
                  />
                  <Field
                    label={t("contact.formPhone")}
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(value) => update("phone", value)}
                    error={errors.phone}
                    placeholder={t("contact.formPhonePlaceholder")}
                    required
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-ink-600 text-xs font-semibold tracking-[0.14em] uppercase"
                  >
                    {t("contact.formMessage")} <span className="text-coral-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    placeholder={t("contact.formMessagePlaceholder")}
                    aria-invalid={Boolean(errors.message)}
                    className={cn(
                      "text-ink-800 placeholder:text-ink-400 rounded-2xl border bg-white px-4 py-3 text-sm focus:outline-none",
                      errors.message
                        ? "border-coral-400 focus:border-coral-500"
                        : "border-ink-200 focus:border-lagoon-500",
                    )}
                  />
                  {errors.message ? (
                    <span className="text-coral-600 text-xs">{errors.message}</span>
                  ) : null}
                </div>

                <div className="mt-6">
                  <Button type="submit" size="lg">
                    {t("contact.formSubmit")}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeIn>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.contactForm, t("contact.formBandCaption"))}
        caption={t("contact.formBandCaption")}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("contact.locationEyebrow")}
          title={t("contact.locationTitle")}
          description={SITE.contact.address}
          className="max-w-2xl"
        />
        <FadeIn
          delay={0.1}
          className="mt-10 overflow-hidden rounded-3xl bg-white/70 p-2 backdrop-blur-sm"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[1.4rem]">
            {/* Lightweight embedded map (no API key required). */}
            <iframe
              title={t("contact.mapTitle")}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                SITE.contact.mapsQuery,
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </FadeIn>
        <p className="text-ink-600 mt-5 inline-flex items-center gap-2 text-sm">
          <Clock className="text-lagoon-600 h-4 w-4" aria-hidden />
          {t("contact.salesHours")}
        </p>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.ctaBand, t("contact.faqBandCaption"))}
        caption={t("contact.faqBandCaption")}
      />

      <ContentBand id="bantuan">
        <SectionTitle
          eyebrow={t("contact.faqEyebrow")}
          title={t("contact.faqTitle")}
          description={t("contact.faqDescription")}
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactFaqs.slice(0, 4).map((faq) => (
            <motion.div key={faq.question} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow={t("contact.faqLabel")}
                title={faq.question}
                body={faq.answer}
                icon={<CircleHelp className="h-5 w-5" aria-hidden />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
        <p id="privasi" className="text-ink-500 mt-10 max-w-2xl text-xs leading-relaxed">
          {t("contact.privacyPrefix")}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="text-lagoon-700 font-semibold underline"
          >
            {SITE.contact.email}
          </a>
          {t("contact.privacySuffix")}
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
        className="text-ink-600 text-xs font-semibold tracking-[0.14em] uppercase"
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
          "text-ink-800 placeholder:text-ink-400 h-12 rounded-2xl border bg-white px-4 text-sm focus:outline-none",
          error
            ? "border-coral-400 focus:border-coral-500"
            : "border-ink-200 focus:border-lagoon-500",
        )}
      />
      {error ? (
        <span id={`${id}-error`} className="text-coral-600 text-xs">
          {error}
        </span>
      ) : null}
    </div>
  );
}
