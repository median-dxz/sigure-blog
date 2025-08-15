import { randInt } from "@utils/common";
import {
  Easings,
  EffectType,
  SlideDirection,
  TransitionType,
  WipeDirection,
  type EffectTypeConfig,
  type Transition,
} from "midori-bg";

export const BannerTransitions = {
  Blend: {
    type: TransitionType.Blend,
    config: {
      duration: 1.5,
      easing: Easings.Quartic.InOut,
    },
  },
  Wipe: () => ({
    type: TransitionType.Wipe,
    config: {
      duration: 1.5,
      easing: Easings.Quartic.InOut,
      gradient: 0.5,
      angle: 15,
      // Randomly select a direction from the Direction enum
      // Enum selection is implemented according to TS enum behavior
      direction: randInt(0, Object.keys(WipeDirection).length / 2 - 1) as WipeDirection,
    },
  }),
  Blur: {
    type: TransitionType.Blur,
    config: {
      duration: 1.5,
      easing: Easings.Quartic.InOut,
      intensity: 1.5,
    },
  },
  Glitch: () => ({
    type: TransitionType.Glitch,
    config: { duration: 1.5, easing: Easings.Cubic.InOut, seed: Math.random() },
  }),
  Slide: () => ({
    type: TransitionType.Slide,
    config: {
      duration: 1.5,
      easing: Easings.Quintic.InOut,
      slides: 2,
      intensity: 5,
      direction: randInt(0, Object.keys(SlideDirection).length / 2 - 1) as SlideDirection,
    },
  }),
} as Record<TransitionType, Transition | (() => Transition) | undefined>;

export const BannerEffects = {
  Bloom: { radius: 1, passes: 2 },
  Blur: { radius: 1.5, passes: 2 },
  RgbShift: { amount: 0.005, angle: 135 },
  Vignette: { darkness: 1, offset: 1 },
  VignetteBlur: { size: 3, radius: 1.5, passes: 2 },
} as {
  [T in EffectType]?: T extends Exclude<EffectType, EffectType.MotionBlur | EffectType.Glitch>
    ? EffectTypeConfig<T>
    : undefined;
};
