<script lang="ts">
  import DisplaySettings from "@components/widget/DisplaySettings.svelte";
  import Icon from "@iconify/svelte";

  let open = false;
</script>

<button
  aria-label="Display Settings"
  class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
  id="display-settings-switch"
  on:click={() => {
    open = !open;
  }}
>
  <Icon icon="material-symbols:palette-outline" class="text-[1.25rem]" />
</button>
<DisplaySettings {open} />
