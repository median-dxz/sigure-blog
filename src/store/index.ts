import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { siteConfig } from "@/config";

export const HUE_DEFAULT = siteConfig.themeColor.hue.toString();
export const isClickAwayStore = atom("");
export const hueStore = persistentAtom("hue", HUE_DEFAULT);
