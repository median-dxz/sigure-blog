// @ts-check
import { spawn } from "node:child_process";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";

import { expressiveCodeConfig } from "./src/config.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://fuwari.vercel.app/",
  base: "/",
  trailingSlash: "always",

  integrations: [
    swup({
      theme: false,
      accessibility: false, // Disabled by default
      smoothScrolling: true, // Don't use with native at the same time
      progress: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
      // native: true,
      // debug: import.meta.env.DEV,
      animationClass: "swup-transition-",
    }),
    icon({
      include: {
        "preprocess: vitePreprocess(),": ["*"],
        "fa6-brands": ["*"],
        "fa6-regular": ["*"],
        "fa6-solid": ["*"],
      },
    }),
    expressiveCode({
      themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers(), pluginLanguageBadge(), pluginCustomCopyButton()],
      defaultProps: {
        wrap: true,
        overridesByLang: {
          shellsession: {
            showLineNumbers: false,
          },
        },
      },
      styleOverrides: {
        codeBackground: "var(--codeblock-bg)",
        borderRadius: "0.75rem",
        borderColor: "none",
        codeFontSize: "0.875rem",
        codeFontFamily: "var(--font-mono)",
        codeLineHeight: "1.5rem",
        frames: {
          editorBackground: "var(--codeblock-bg)",
          terminalBackground: "var(--codeblock-bg)",
          terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
          editorTabBarBackground: "var(--codeblock-topbar-bg)",
          editorActiveTabBackground: "none",
          editorActiveTabIndicatorBottomColor: "var(--primary)",
          editorActiveTabIndicatorTopColor: "none",
          editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
          terminalTitlebarBorderBottomColor: "none",
        },
        textMarkers: {
          delHue: "0",
          insHue: "180",
          markHue: "250",
        },
      },
      frames: {
        showCopyToClipboardButton: false,
      },
    }),
    svelte(),
    sitemap(),
    mdx(),
    {
      name: "pagefind",
      hooks: {
        "astro:build:done": ({ dir, logger }) => {
          const loglevelFlag = getPagefindLoggingFlags(logger.options.level);
          const targetDir = fileURLToPath(dir);
          const cwd = dirname(fileURLToPath(import.meta.url));
          const relativeDir = relative(cwd, targetDir);
          return new Promise((resolve) => {
            spawn("pnpm exec", ["pagefind", ...loglevelFlag, "--site", relativeDir], {
              stdio: "inherit",
              shell: true,
              cwd,
            }).on("close", () => resolve());
          });
        },
      },
    },
  ],

  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkExcerpt,
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      remarkSectionize,
      parseDirectiveNode,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeComponents,
        {
          components: {
            github: GithubCardComponent,
            // @ts-ignore
            note: (x, y) => AdmonitionComponent(x, y, "note"),
            // @ts-ignore
            tip: (x, y) => AdmonitionComponent(x, y, "tip"),
            // @ts-ignore
            important: (x, y) => AdmonitionComponent(x, y, "important"),
            // @ts-ignore
            caution: (x, y) => AdmonitionComponent(x, y, "caution"),
            // @ts-ignore
            warning: (x, y) => AdmonitionComponent(x, y, "warning"),
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: ["anchor-icon"],
              "data-pagefind-ignore": true,
            },
            children: [
              {
                type: "text",
                value: "#",
              },
            ],
          },
        },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});

/**
 * Map the logging level of Astro’s logger to one of Pagefind’s logging level flags.
 * See: https://github.com/withastro/starlight/blob/main/packages/starlight/index.ts
 */
// @ts-ignore
function getPagefindLoggingFlags(level) {
  switch (level) {
    case "silent":
    case "error":
      return ["--silent"];
    case "warn":
      return ["--quiet"];
    case "debug":
      return ["--verbose"];
    case "info":
    default:
      return [];
  }
}
