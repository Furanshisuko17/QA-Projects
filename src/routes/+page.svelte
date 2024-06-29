<script lang="ts">
  let response: boolean;
  let user: User;
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

<div class="h-full w-full">
  <div class="grow text-center font-black">
    <div
      class="mx-auto flex animate-movingbg flex-col bg-gradient-to-r from-violet-900 via-blue-700 to-violet-900 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
    >
      <div class="self-start pb-5 text-6xl">Notes</div>
    </div>
  </div>
  <div class="flex grow flex-col"></div>
</div>
