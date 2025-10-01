<script lang="ts">
  import I18nKey from "@i18n/i18nKey";
  import { i18n } from "@i18n/translation";
  import Icon from "@iconify/svelte";
  import { setupClickAway } from "@utils/client/utils";
  import { throttle } from "@utils/common";
  import { url } from "@utils/url";
  import { onMount } from "svelte";

  let keyword = $state("");
  let result: SearchResult[] = $state([]);
  let isSearching = $state(false);
  let pagefindLoaded = false;
  let initialized = $state(false);

  const fakeResult: SearchResult[] = [
    {
      url: url("/"),
      meta: {
        title: "This Is a Fake Search Result",
      },
      excerpt: "Because the search cannot work in the <mark>dev</mark> environment.",
    },
    {
      url: url("/"),
      meta: {
        title: "If You Want to Test the Search",
      },
      excerpt: "Try running <mark>npm build && npm preview</mark> instead.",
    },
  ];

  const togglePanel = () => {
    const panel = document.getElementById("search-panel");
    panel?.classList.toggle("float-panel-closed");

    if (!panel?.classList.contains("float-panel-closed")) {
      setupClickAway("search-panel", ["search-bar", "search-switch"]);
    }
  };

  const setPanelVisibility = (show: boolean): void => {
    const panel = document.getElementById("search-panel");
    if (!panel) return;

    if (show) {
      panel.classList.remove("float-panel-closed");
      setupClickAway("search-panel", ["search-bar", "search-switch"]);
    } else {
      panel.classList.add("float-panel-closed");
    }
  };

  const search = async (keyword: string): Promise<void> => {
    if (!keyword) {
      setPanelVisibility(false);
      result = [];
      return;
    }

    if (!initialized) {
      return;
    }

    result = [];
    isSearching = true;
    setPanelVisibility(true);

    try {
      let searchResults: SearchResult[] = [];

      if (import.meta.env.PROD && pagefindLoaded && window.pagefind) {
        const response = await window.pagefind.search(keyword);
        searchResults = await Promise.all(response.results.map((item) => item.data()));
      } else if (import.meta.env.DEV) {
        searchResults = fakeResult;
      } else {
        searchResults = [];
        console.error("Pagefind is not available in production environment.");
      }

      result = searchResults;
      console.log("Search results:", result);
    } catch (error) {
      console.error("Search error:", error);
      result = [];
      setPanelVisibility(false);
    } finally {
      isSearching = false;
    }
  };

  onMount(() => {
    const initializeSearch = () => {
      initialized = true;
      pagefindLoaded =
        typeof window !== "undefined" && !!window.pagefind && typeof window.pagefind.search === "function";
      console.log("Pagefind status on init:", pagefindLoaded);
      search(keyword);
    };

    if (import.meta.env.DEV) {
      console.log("Pagefind is not available in development mode. Using mock data.");
      initializeSearch();
    } else {
      document.addEventListener("pagefindready", () => {
        console.log("Pagefind ready event received.");
        initializeSearch();
      });

      document.addEventListener("pagefindloaderror", () => {
        console.warn("Pagefind load error event received. Search functionality will be limited.");
        initializeSearch(); // Initialize with pagefindLoaded as false
      });

      // Fallback in case events are not caught or pagefind is already loaded by the time this script runs
      setTimeout(() => {
        if (!initialized) {
          console.log("Fallback: Initializing search after timeout.");
          initializeSearch();
        }
      }, 2000); // Adjust timeout as needed
    }
  });

  const throttledSearch = throttle(150, () => search(keyword));

  $effect(() => {
    void (initialized && keyword);
    if (initialized) {
      throttledSearch();
    }
  });
</script>

<!-- search bar for desktop view -->
<div
  id="search-bar"
  class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg
      bg-black/4 hover:bg-black/6 focus-within:bg-black/6
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
"
>
  <Icon
    icon="material-symbols:search"
    class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
  ></Icon>
  <input
    placeholder={i18n(I18nKey.search)}
    bind:value={keyword}
    onfocus={() => search(keyword)}
    class="transition-all pl-10 text-sm bg-transparent outline-0
         h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
  />
</div>

<!-- toggle btn for phone/tablet view -->
<button
  onclick={togglePanel}
  aria-label="Search Panel"
  id="search-switch"
  class="btn-plain scale-animation lg:hidden! rounded-lg w-11 h-11 active:scale-90"
>
  <Icon icon="material-symbols:search" class="text-[1.25rem]"></Icon>
</button>

<!-- search panel -->
<div
  id="search-panel"
  class="float-panel float-panel-closed search-panel absolute md:w-120
top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2"
>
  <!-- search bar inside panel for phone/tablet -->
  <div
    id="search-bar-inside"
    class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
      bg-black/4 hover:bg-black/6 focus-within:bg-black/6
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
  "
  >
    <Icon
      icon="material-symbols:search"
      class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
    ></Icon>
    <input
      placeholder="Search"
      bind:value={keyword}
      class="pl-10 absolute inset-0 text-sm bg-transparent outline-0
               focus:w-60 text-black/50 dark:text-white/50"
    />
  </div>

  <!-- search results -->
  {#if isSearching}
    <div class="p-4 text-center text-gray-500">{i18n(I18nKey.searching)}</div>
  {:else if result.length === 0 && keyword}
    <div class="p-4 text-center text-gray-500">{i18n(I18nKey.noResultsFound)}</div>
  {/if}
  {#each result as item}
    <a
      href={item.url}
      class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
       rounded-xl text-lg px-3 py-2 hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active)"
    >
      <div class="transition text-90 inline-flex font-bold group-hover:text-(--primary)">
        {item.meta.title}<Icon
          icon="fa6-solid:chevron-right"
          class="transition text-[0.75rem] translate-x-1 my-auto text-(--primary)"
        ></Icon>
      </div>
      <div class="transition text-sm text-50">
        {@html item.excerpt}
      </div>
    </a>
  {/each}
</div>

<style>
  input:focus {
    outline: 0;
  }
  .search-panel {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }
</style>
