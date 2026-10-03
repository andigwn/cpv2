"use client";

import type {
  BusinessUnit,
  DiningVenue,
  NewsPost,
  Service,
  ServiceCategory,
} from "@/types";
import { businessUnits } from "@/data/units";
import { businessUnitsEn } from "@/data/en/units";
import { services, serviceCategories, stayPackages } from "@/data/services";
import { servicesEn, serviceCategoriesEn, stayPackagesEn } from "@/data/en/services";
import { newsPosts } from "@/data/news";
import { newsPostsEn } from "@/data/en/news";
import { jobOpenings, careerBenefits, hiringSteps } from "@/data/careers";
import { jobOpeningsEn, careerBenefitsEn, hiringStepsEn } from "@/data/en/careers";
import {
  aboutStory,
  companyValues,
} from "@/data/about";
import { aboutStoryEn, companyValuesEn } from "@/data/en/about";
import { companyStats, heroBackgrounds } from "@/data/meta";
import {
  companyStatsEn,
  heroBackgroundsEn,
} from "@/data/en/meta";
import { contactChannels, contactFaqs } from "@/data/contact";
import { contactChannelsEn, contactFaqsEn } from "@/data/en/contact";
import { diningVenues } from "@/data/dining";
import { diningVenuesEn } from "@/data/en/dining";
import { useLanguage } from "./useLanguage";

/**
 * Localized content selectors.
 *
 * The Indonesian data files stay the source of truth and every English mirror lives in
 * `src/data/en/`. Components read through these hooks so switching the language swaps
 * the copy instantly without a page reload.
 */
export function useBusinessUnits(): BusinessUnit[] {
  const language = useLanguage();
  return language === "en" ? businessUnitsEn : businessUnits;
}

/** Finds the English twin of a server-provided (Indonesian) unit payload. */
export function useLocalizedUnit(unit: BusinessUnit): BusinessUnit {
  const units = useBusinessUnits();
  return units.find((item) => item.slug === unit.slug) ?? unit;
}

export function useServices(): Service[] {
  const language = useLanguage();
  return language === "en" ? servicesEn : services;
}

export function useLocalizedService(service: Service): Service {
  const items = useServices();
  return items.find((item) => item.slug === service.slug) ?? service;
}

export function useServiceCategories(): { value: ServiceCategory | "all"; label: string }[] {
  const language = useLanguage();
  return language === "en" ? serviceCategoriesEn : serviceCategories;
}

export function useStayPackages(): typeof stayPackages {
  const language = useLanguage();
  return language === "en" ? stayPackagesEn : stayPackages;
}

export function useNewsPosts(): NewsPost[] {
  const language = useLanguage();
  return language === "en" ? newsPostsEn : newsPosts;
}

export function useLocalizedNewsPost(post: NewsPost): NewsPost {
  const posts = useNewsPosts();
  return posts.find((item) => item.slug === post.slug) ?? post;
}

export function useJobOpenings(): typeof jobOpenings {
  const language = useLanguage();
  return language === "en" ? jobOpeningsEn : jobOpenings;
}

export function useCareerBenefits(): typeof careerBenefits {
  const language = useLanguage();
  return language === "en" ? careerBenefitsEn : careerBenefits;
}

export function useHiringSteps(): typeof hiringSteps {
  const language = useLanguage();
  return language === "en" ? hiringStepsEn : hiringSteps;
}

export function useAboutStory(): typeof aboutStory {
  const language = useLanguage();
  return language === "en" ? aboutStoryEn : aboutStory;
}

export function useCompanyValues(): typeof companyValues {
  const language = useLanguage();
  return language === "en" ? companyValuesEn : companyValues;
}

export function useCompanyStats() {
  const language = useLanguage();
  return language === "en" ? companyStatsEn : companyStats;
}

export function useHeroBackgrounds() {
  const language = useLanguage();
  return language === "en" ? heroBackgroundsEn : heroBackgrounds;
}

export function useContactChannels(): typeof contactChannels {
  const language = useLanguage();
  return language === "en" ? contactChannelsEn : contactChannels;
}

export function useContactFaqs(): typeof contactFaqs {
  const language = useLanguage();
  return language === "en" ? contactFaqsEn : contactFaqs;
}

export function useDiningVenues(): DiningVenue[] {
  const language = useLanguage();
  return language === "en" ? diningVenuesEn : diningVenues;
}

/** Finds the English twin of a server-provided (Indonesian) venue payload. */
export function useLocalizedDiningVenue(venue: DiningVenue): DiningVenue {
  const venues = useDiningVenues();
  return venues.find((item) => item.slug === venue.slug) ?? venue;
}
