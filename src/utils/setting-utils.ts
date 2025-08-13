import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
  switch (theme) {
    case LIGHT_MODE:
      document.documentElement.classList.remove("dark");
      break;
    case DARK_MODE:
      document.documentElement.classList.add("dark");
      break;
    case AUTO_MODE:
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      break;
  }

  // Set the theme for Expressive Code
  document.documentElement.setAttribute("data-theme", expressiveCodeConfig.theme);
}