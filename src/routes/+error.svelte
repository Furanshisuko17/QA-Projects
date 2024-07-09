<script lang="ts">
  import { page } from "$app/stores";
  let faces = [
    "\\(^Д^)/",
    "\\(o_o)/",
    "(o^^)o",
    "(;-;)",
    "(>_<)",
    "(='X'=)",
    "(^_^)b",
    "(·_·)",
    "(·.·)",
    "(^-^*)",
    "(≥o≤)",
    "(ㅠ﹏ㅠ)",
    "(>﹏<)",
    "(•-•)>",
    "(˘･_･˘)",
    "(≧﹏ ≦)"
  ];
  let randomFace = faces[Math.floor(Math.random() * faces.length)];
</script>

<svelte:head>
  <title>Error</title>
</svelte:head>

<div class="flex h-screen flex-col items-center justify-center gap-2">
  <h1 class="font-mono text-6xl font-bold">{randomFace}</h1>
  <h1 class="mt-5 text-4xl font-semibold">Oops... an error ocurred!</h1>
  <p class="flex text-xl">{$page.status}: {$page.error?.message}</p>
</div>
