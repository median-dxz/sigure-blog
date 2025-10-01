<script lang="ts">
  import DisplaySettings from "@components/navbar-widget/DisplaySettings.svelte";
  import Icon from "@iconify/svelte";
  import { setupClickAway } from "@utils/client/utils";

  let open = $state(false);
</script>

<button
  aria-label="Display Settings"
  class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
  id="display-settings-switch"
  onclick={() => {
    open = !open;
    if (open) {
      setupClickAway("display-setting", ["display-settings-switch"], () => {
        open = false;
      });
    }
  }}
>
  <Icon icon="material-symbols:palette-outline" class="text-[1.25rem]" />
</button>
<DisplaySettings {open} />
