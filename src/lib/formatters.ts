import type { BusinessDetails } from "./types";

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return hhmm;
  if (h === 0) return `12:${m.toString().padStart(2, "0")}am`;
  if (h < 12) return `${h}:${m.toString().padStart(2, "0")}am`;
  if (h === 12) return `12:${m.toString().padStart(2, "0")}pm`;
  return `${h - 12}:${m.toString().padStart(2, "0")}pm`;
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)}\u2013${formatTime(end)}`;
}

export function formatPhoneDisplay(e164: string): string {
  const cleaned = e164.replace(/\D/g, "");
  if (cleaned.startsWith("44") && cleaned.length >= 12) {
    const rest = cleaned.slice(2);
    return `0${rest.slice(0, 4)} ${rest.slice(4, 7)} ${rest.slice(7)}`;
  }
  return e164;
}

export function formatPhoneHref(e164: string): string {
  return `tel:${e164.replace(/\s+/g, "")}`;
}

export function getAgeRangeDisplay(bd: BusinessDetails): string {
  if (bd.ageRange.displayOverride) return bd.ageRange.displayOverride;
  return `${bd.ageRange.minimum} to ${bd.ageRange.maximum} years`;
}

export function formatLanguages(languages: readonly string[] | undefined): string {
  if (!languages || languages.length === 0) return "";
  if (languages.length === 1) return languages[0];
  return `${languages.slice(0, -1).join(", ")} and ${languages[languages.length - 1]}`;
}


