<script lang="ts">
  import DisplaySettings from "@components/navbar/DisplaySettings.svelte";
  import Icon from "@iconify/svelte";
  import { isClickAwayStore } from "@store/index";
  import { onDestroy } from "svelte";

  let open = $state(false);

  const unsubscribe = isClickAwayStore.subscribe((panel) => {
    if (panel === "display-setting") {
      open = false;
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<button
  aria-label="Display Settings"
  class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
  id="display-settings-switch"
  onclick={() => {
    open = !open;
  }}
>
  <Icon icon="material-symbols:palette-outline" class="text-[1.25rem]" />
</button>
<DisplaySettings {open} />
