"use client";

import { useMemo } from "react";
import type { NavItem, NavLinkItem } from "@/types";
import { FOOTER_NAV, MAIN_NAV } from "@/lib/constants";
import { useT, type Translate } from "./useTranslation";

/** Resolves the label of an entry (and of every nested child) in the active language. */
function localizeItem<T extends NavItem>(item: T, t: Translate): T {
  return {
    ...item,
    label: item.labelKey ? t(item.labelKey) : item.label,
    children: item.children?.map((child) => localizeItem(child, t)),
  };
}

/** Main navigation with labels resolved in the active language. */
export function useMainNav(): NavItem[] {
  const t = useT();
  return useMemo(() => MAIN_NAV.map((item) => localizeItem(item, t)), [t]);
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
