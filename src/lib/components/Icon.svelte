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
</script>

<div class={twMerge("flex justify-center align-middle", className)}>
  <span class="material-symbols-rounded {size}">{icon}</span>
</div>
