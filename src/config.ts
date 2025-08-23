import { TransitionType } from "midori-bg";
import type { ExpressiveCodeConfig, LicenseConfig, NavBarConfig, ProfileConfig, SiteConfig } from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "Sigure",
  subtitle: "Median's Blog",
  lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
  themeColor: {
    hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    // Leave this array empty to use the default favicon
    {
      src: "/favicon/icon.png", // Path of the favicon, relative to the /public directory
      // theme: "light", // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      // sizes: "32x32", // (Optional) Size of the favicon, set only if you have favicons of different sizes
    },
  ],
  banner: {
    // Path to the banner images, relative to the /public directory
    imgList: [
      `/bg/bg_1.webp`,
      `/bg/bg_2.webp`,
      `/bg/bg_3.webp`,
      `/bg/bg_4.webp`,
      `/bg/bg_5.webp`,
      `/bg/bg_6.webp`,
      `/bg/bg_7.webp`,
      `/bg/bg_8.webp`,
      `/bg/bg_9.webp`,
    ],
    random: true, // Whether to randomly select a banner image from the list
    height: 65, // Height of the banner in vh, only applies to the home page (default: 65vh)
    extendHeight: 60, // Height of the extended banner in vh, only applies to the home page (default: 60vh)
    elapsedTime: 15000, // Time in milliseconds for the banner to change (default: 15000ms)
    transitions: [TransitionType.Glitch, TransitionType.Blend], // Array of transition effects for the banner, will randomly select one from the list
    effects: {
      Vignette: true,
      Bloom: true,
    }, // Effects for the banner, doesn't support Glitch and MotionBlur effects
  },
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: "GitHub",
      url: "https://github.com/median-dxz", // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar@1x.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "Median",
  bio: "So everything that make me whole, 今君に捧げよう",
  links: [
    {
      name: "Twitter",
      icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: "https://twitter.com",
    },
    {
      name: "Steam",
      icon: "fa6-brands:steam",
      url: "https://store.steampowered.com",
    },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/median-dxz",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig = {
  // Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
  // Please select a dark theme, as this blog theme currently only supports dark background color
  theme: "github-dark",
} satisfies ExpressiveCodeConfig;
