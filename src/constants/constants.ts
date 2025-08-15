import type { SiteConfig } from "@/types/config";
import { TransitionType } from "midori-bg";

export const PAGE_SIZE = 8;

export const LIGHT_MODE = "light",
  DARK_MODE = "dark",
  AUTO_MODE = "auto";
export const DEFAULT_THEME = AUTO_MODE;

// The height the main panel overlaps the banner, unit: rem
export const MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5;

// Page width: rem
export const PAGE_WIDTH = 75;

// Banner defaults
export const BANNER_DEFAULTS = {
  random: true,
  height: 65, // Banner height unit: vh
  extendHeight: 60,
  elapsedTime: 15000,
  transitions: [TransitionType.None],
  effects: {},
} as Omit<Required<Exclude<SiteConfig["banner"], undefined>>, "imgList">;
