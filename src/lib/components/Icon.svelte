<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let icon: string;

  /**
   * The size of the icon.
   * @default 'text-[36px]'
   */
  export let size: string = "text-[36px]";
  let className: string = "";
  export { className as class };
  export let style = "";
</script>

<div class={twMerge("flex justify-center align-middle", className)} {style}>
  <span class="material-symbols-rounded {size}">{icon}</span>
</div>
