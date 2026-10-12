"use client";

import { useMemo } from "react";
import type { DiningVenue, NavItem, NavLinkItem } from "@/types";
import { FOOTER_NAV, buildMainNav } from "@/lib/constants";
import { unitHref, unitFacilityMenu } from "@/data/units";
import { diningHref } from "@/data/dining";
import { useBusinessUnits, useDiningVenues } from "./useContent";
import { useT, type Translate } from "./useTranslation";

/** Resolves the label of an entry (and of every nested child) in the active language. */
function localizeItem<T extends NavItem>(item: T, t: Translate): T {
  return {
    ...item,
    label: item.labelKey ? t(item.labelKey) : item.label,
    children: item.children?.map((child) => localizeItem(child, t)),
  };
}

/**
 * Entries of the "Destinasi" dropdown, built from the localized content layer.
 *
 * Every destination keeps its own page link and, when it publishes supporting facilities
 * (Qubu Suites, Paradis-Q Waterpark), gains a `children` list pointing at those cards on
 * its own page. Hovering the row reveals them instead of a second menu tree, so no extra
 * page is ever created for them.
 *
 * "Dining" closes the list as a pure group row: it has no page of its own and only
 * reveals its restaurants (Patio Bistro, Embun Resto, Qubiq Bar, Food Corner).
 */
function useDestinationsMenu(): NavItem[] {
  const units = useBusinessUnits();
  const venues = useDiningVenues();

  return useMemo(
    () => [
      ...units.map((unit) => ({
        label: unit.name,
        href: unitHref(unit),
        children: unitFacilityMenu(unit),
      })),
      { label: "Dining", labelKey: "nav.dining", children: venues.map(diningMenuEntry) },
    ],
    [units, venues],
  );
}

/** One restaurant row inside the "Dining" group. */
function diningMenuEntry(venue: DiningVenue): NavItem {
  return { label: venue.name, href: diningHref(venue) };
}

/** Main navigation with labels resolved in the active language. */
export function useMainNav(): NavItem[] {
  const t = useT();
  const destinations = useDestinationsMenu();

  return useMemo(
    () => buildMainNav(destinations).map((item) => localizeItem(item, t)),
    [destinations, t],
  );
}

/** Footer columns with titles and link labels resolved in the active language. */
export function useFooterNav(): { title: string; items: NavLinkItem[] }[] {
  const t = useT();
  return useMemo(
    () =>
      FOOTER_NAV.map((column) => ({
        title: t(column.titleKey),
        items: column.items.map((item) => localizeItem(item, t)),
      })),
    [t],
  );
}