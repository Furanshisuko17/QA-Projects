<script lang="ts">
  import Fa from "svelte-fa";
  import { faArrowRightFromBracket, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
  import { Note, noteColors, User } from "$lib/models";
  import NoteComponent from "$lib/components/NoteComponent.svelte";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { createRadioGroup, createSeparator, melt } from "@melt-ui/svelte";
  import { changeBrightness, changeSaturation } from "$lib/util";
  import { selectedColor } from "$lib/stores";
  import { toast } from "svelte-sonner";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";

  let pageJustLoaded = true;

  console.log($page.data);

  setTimeout(() => {
    pageJustLoaded = false;
  }, 250);

  export let data: PageData;

  let user: User;

  $: console.log(user);

  let topContainerHeight: number = 0;
  let bottomContainerHeight: number = 0;

  if (data.response) {
    $selectedColor = data.response.selected_color;
    user = new User(
      data.response.id,
      data.response.username!,
      data.response.created_at,
      data.response.selected_color,
      data.response.notes.map(
        (note) => new Note(note.id, note.title, note.content, new Date(note.created_at), note.color)
      )
    );
  }

  $: $selectedColor, updateColorPreference();

  async function updateColorPreference() {
    if (pageJustLoaded) return;

    let userColorBeforeUpdate = user.selected_color;
    if (userColorBeforeUpdate === $selectedColor) return;

    const res = await fetch(`api/users/${user.id}/color`, {
      method: "PUT",
      body: JSON.stringify({
        selected_color: $selectedColor
      })
    });

    if (res.ok) {
      user.selected_color = $selectedColor;
    } else {
      $selectedColor = userColorBeforeUpdate;
      toast.error("Failed to change color!");
    }
  }

  async function createNote() {
    const res = await fetch(`api/notes/${crypto.randomUUID()}`, {
      method: "POST",
      body: JSON.stringify({
        title: "",
        content: "",
        created_at: new Date(),
        color: $selectedColor,
        user_id: user.id
      })
    });

    if (res.ok) {
      let data = await res.json();
      user.notes = [
        ...user.notes,
        new Note(data.id, data.title, data.content, data.created_at, data.color)
      ];
      console.log("Create note: ");
    } else {
      toast.error("Failed to create note!");
    }
  }

  function deleteNote(id: string) {
    user.notes = user.notes.filter((note) => note.id !== id);
  }

  const {
    elements: { root: vertical }
  } = createSeparator({
    orientation: "vertical",
    decorative: true
  });

  const {
    elements: { root, item }
  } = createRadioGroup({
    value: selectedColor
  });
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

{#if pageJustLoaded}
  <div class="flex h-screen flex-col items-center justify-center gap-2 bg-slate-50">
    <div class="text-xl font-semibold text-slate-800">Loading...</div>
    <Fa icon={faSpinner} spin size="2x" class="text-slate-800" />
  </div>
{:else}
  <form hidden use:enhance method="post" action="?/logout" id="logout-form"></form>

  <div class="h-screen" in:fade>
    <div class="gap 2 flex items-center bg-slate-50" bind:clientHeight={topContainerHeight}>
      <div
        class="flex grow animate-movingbg flex-col bg-gradient-to-r from-violet-900 via-blue-700 to-violet-900 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
      >
        <div class="self-start px-2 py-1 text-2xl font-bold">{user.username}'s notes</div>
      </div>
      <div class="flex gap-[10px]" use:melt={$root}>
        {#each noteColors as color (color[0])}
          <button
            use:melt={$item(color[0])}
            class="h-[24px] w-[24px] rounded-md transition-all hover:ring-2 hover:ring-slate-400 hover:ring-offset-2 aria-checked:ring-2 aria-checked:ring-slate-500 aria-checked:ring-offset-2"
            style="border: 2px solid {changeBrightness(
              color[1].hex,
              -0.25
            )};background-color: {changeSaturation(color[1].hex, 50)};"
            on:dblclick={createNote}
          />
        {/each}
      </div>
      <div use:melt={$vertical} class="mx-2 h-[24px] w-[1px] bg-slate-700" />
      <div class="flex justify-end gap-2 pe-4">
        <button
          class=" flex items-center justify-center gap-1 rounded-md bg-slate-900 px-2 py-[2px] text-slate-200 transition-colors duration-100 ease-in-out hover:bg-slate-800"
          on:click={createNote}
        >
          <Fa icon={faPlus} size="lg" />
          <div class="text-lg font-semibold">New note</div>
        </button>
        <button
          class=" flex items-center justify-center rounded-md bg-slate-900 px-2 py-[2px] text-slate-200 transition-colors duration-100 ease-in-out hover:bg-slate-800"
          form="logout-form"
        >
          <Fa icon={faArrowRightFromBracket} size="lg" />
        </button>
      </div>
    </div>
    <div
      bind:clientHeight={bottomContainerHeight}
      class="flex flex-col flex-wrap content-start gap-2
    {user.notes.length === 0 ? 'overflow-hidden' : 'overflow-auto'} 
    overflow-y-hidden border-t border-slate-400 bg-slate-100 p-2"
      style="height: calc(100vh - {topContainerHeight}px);max-height: calc(100vh - {topContainerHeight}px); max-width: 100vw;"
    >
      {#if user.notes.length === 0}
        <p class="w-screen text-center text-lg font-semibold text-slate-600">
          You have no notes! Create one...
        </p>
      {:else}
        {#each user.notes as note (note.id)}
          <div animate:flip={{ duration: 300 }}>
            <NoteComponent bind:note deleteCallBack={deleteNote} />
          </div>
        {/each}
      {/if}
    </div>
  </div>
{/if}
