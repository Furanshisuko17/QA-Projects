<script lang="ts">
  import type { Note } from "$lib/models";
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";

  export let note: Note;

  let titleContainer: HTMLDivElement;

  onMount(() => {
    console.log(titleContainer.clientWidth);
  });

  function editNote() {
    console.log("Edit note");
  }
</script>

<div
  class="w-72 rounded-lg border border-slate-500 px-2 py-1"
  style="background-color: {note.color.hex};"
>
  <div class="flex items-center gap-1">
    <div class="grow overflow-hidden">
      <div class=" text-nowrap text-lg font-bold" bind:this={titleContainer}>
        {note.title}
      </div>
    </div>
    <button on:click={editNote}>
      <Icon icon="edit" size="text-[24px]" />
    </button>
  </div>
  <div class="">{note.content}</div>
</div>

<style>
</style>
