<script lang="ts">
  import { onMount } from "svelte";

  import { getPostUrlBySlug } from "@utils/url";
  import I18nKey from "../i18n/i18nKey";
  import { i18n } from "../i18n/translation";

  interface Props {
    tags: string[];
    categories: string[];
    sortedPosts?: Post[];
  }

  let { tags = $bindable(), categories = $bindable(), sortedPosts = [] }: Props = $props();

  interface Post {
    slug: string;
    data: {
      title: string;
      tags: string[];
      category?: string;
      published: Date;
    };
  }

  interface Group {
    year: number;
    posts: Post[];
  }

  let groups: Group[] = $state([]);
  let loadState: "loading" | "loaded" = $state("loading");

  function formatDate(date: Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}-${day}`;
  }

  function formatTag(tagList: string[]) {
    return tagList.map((t) => `#${t}`).join(" ");
  }

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    tags = params.has("tag") ? params.getAll("tag") : [];
    categories = params.has("category") ? params.getAll("category") : [];
    const uncategorized = params.get("uncategorized");

    let filteredPosts: Post[] = sortedPosts;

    if (tags.length > 0) {
      filteredPosts = filteredPosts.filter(
        (post) => Array.isArray(post.data.tags) && post.data.tags.some((tag) => tags.includes(tag)),
      );
    }

    if (categories.length > 0) {
      filteredPosts = filteredPosts.filter((post) => post.data.category && categories.includes(post.data.category));
    }

    if (uncategorized) {
      filteredPosts = filteredPosts.filter((post) => !post.data.category);
    }

    const grouped = filteredPosts.reduce(
      (acc, post) => {
        const year = post.data.published.getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      },
      {} as Record<number, Post[]>,
    );

    const groupedPostsArray = Object.keys(grouped).map((yearStr) => ({
      year: Number.parseInt(yearStr),
      posts: grouped[Number.parseInt(yearStr)],
    }));

    groupedPostsArray.sort((a, b) => b.year - a.year);

    groups = groupedPostsArray;
    loadState = "loaded";
  });
</script>

{#if loadState === "loading"}
  <div class="flex justify-center items-center h-full">
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else if groups.length === 0}
  <div class="text-center text-50">
    <!-- TODO -->
    <!-- {i18n(I18nKey.noPostsFound)} -->
    "No posts found."
  </div>
{:else}
  {#each groups as group}
    <div class="animate-fade-in">
      <div class="flex flex-row w-full items-center h-15">
        <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
          {group.year}
        </div>
        <div class="w-[15%] md:w-[10%]">
          <div
            class="h-3 w-3 bg-none rounded-full outline-(--primary) mx-auto
                  -outline-offset-2 z-50 outline-3"
          ></div>
        </div>
        <div class="w-[70%] md:w-[80%] transition text-left text-50">
          {group.posts.length}
          {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
        </div>
      </div>

      {#each group.posts as post}
        <a
          href={getPostUrlBySlug(post.slug)}
          aria-label={post.data.title}
          class="group btn-plain block! h-10 w-full rounded-lg hover:text-[initial]"
        >
          <div class="flex flex-row justify-start items-center h-full">
            <!-- date -->
            <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
              {formatDate(post.data.published)}
            </div>

            <!-- dot and line -->
            <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
              <div
                class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                       bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-(--primary)
                       outline-4 z-50
                       outline-(--card-bg)
                       group-hover:outline-(--btn-plain-bg-hover)
                       group-active:outline-(--btn-plain-bg-active)"
              ></div>
            </div>

            <!-- post title -->
            <div
              class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                     group-hover:translate-x-1 transition-all group-hover:text-(--primary)
                     text-75 pr-8 whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {post.data.title}
            </div>

            <!-- tag list -->
            <div
              class="hidden md:block md:w-[15%] text-left text-sm transition
                     whitespace-nowrap text-ellipsis overflow-hidden text-30"
            >
              {formatTag(post.data.tags)}
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/each}
{/if}
