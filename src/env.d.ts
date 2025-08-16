/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module "astro:env/client" {
  export const BASE_URL: string;
  export const PROD: boolean;
}
