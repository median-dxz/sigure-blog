import type { LIGHT_DARK_MODE } from "@/types/config";
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
  const dataset = document.documentElement.dataset;
  switch (theme) {
    case LIGHT_MODE:
      dataset.siteTheme = LIGHT_MODE;
      break;
    case DARK_MODE:
      dataset.siteTheme = DARK_MODE;
      break;
    case AUTO_MODE:
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        dataset.siteTheme = DARK_MODE;
      } else {
        dataset.siteTheme = LIGHT_MODE;
      }
      break;
  }
}
