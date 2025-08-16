import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "selector", // allows toggling dark mode manually
  theme: {
    extend: {},
  },
  plugins: [typography],
};
