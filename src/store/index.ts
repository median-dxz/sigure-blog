import { siteConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";
import { DEFAULT_THEME } from "@constants/constants";
import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const DEFAULT_HUE = siteConfig.themeColor.hue.toString();

export const isClickAwayStore = atom("");
export const hueStore = persistentAtom("hue", DEFAULT_HUE);
export const themeStore = persistentAtom("theme", DEFAULT_THEME as LIGHT_DARK_MODE);
