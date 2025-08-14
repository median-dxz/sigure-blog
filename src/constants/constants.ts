import { siteConfig } from "@/config";

export const PAGE_SIZE = 8;

export const LIGHT_MODE = "light",
  DARK_MODE = "dark",
  AUTO_MODE = "auto";
export const DEFAULT_THEME = AUTO_MODE;

// Banner height unit: vh
export const BANNER_HEIGHT = siteConfig.banner?.height || 45;
export const BANNER_HEIGHT_EXTEND = siteConfig.banner?.extendHeight || 30;

// The height the main panel overlaps the banner, unit: rem
export const MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5;

// Page width: rem
export const PAGE_WIDTH = 75;
