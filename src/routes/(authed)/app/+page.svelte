<script lang="ts">
  import { Note, noteColors, User } from "$lib/models";
  import NoteComponent from "$lib/components/NoteComponent.svelte";
  import Icon from "$lib/components/Icon.svelte";

  let topContainerHeight: number = 0;
  let bottomContainerHeight: number = 0;
  let user: User = new User(
    "1",
    "Furanshisuko17",
    [
      new Note(
        crypto.randomUUID(),
        "Note 1",
        "Esta nota es interesante porque tiene un texto altamente largo",
        new Date(),
        noteColors.get("teal")
      ),
      new Note(crypto.randomUUID(), "Como usar la pc", "blah blah blah", new Date()),
      new Note(
        crypto.randomUUID(),
        "Titulo largo, para probar como se comporta xddxd",
        "blah blah blah",
        new Date()
      )
    ],
    new Date()
  );

  $: console.log(user.notes);

  function createNote() {
    console.log("Create note");
    user.notes = [
      ...user.notes,
      new Note(crypto.randomUUID(), "New note", "This is a new note", new Date())
    ];
  }

  function logOut() {
    console.log("Log out");
  }
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

<div class="h-screen">
  <div class="flex items-center" bind:clientHeight={topContainerHeight}>
    <div
      class=" flex animate-movingbg flex-col bg-gradient-to-r from-violet-900 via-blue-700 to-violet-900 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
    >
      <div class="self-start px-2 py-1 text-xl font-bold">{user.username}'s Notes</div>
    </div>
    <div class="flex grow justify-end gap-2 pe-4">
      <button
        class=" flex items-center justify-center gap-1 rounded-md border border-slate-700 bg-slate-700 px-1 text-slate-200 transition-colors duration-100 ease-in-out hover:bg-slate-900 active:bg-slate-700"
        on:click={createNote}
      >
        <Icon icon="add" size="text-[24px]" />
        <div class="pe-[0.35rem] text-lg font-semibold leading-normal">New note</div>
      </button>
      <button
        class=" flex items-center justify-center gap-1 rounded-md border bg-slate-700 px-1 text-slate-200 transition-colors duration-100 ease-in-out hover:bg-slate-900 active:bg-slate-600"
        on:click={logOut}
      >
        <Icon icon="logout" size="text-[24px]" />
      </button>
    </div>
  </div>
  <div
    bind:clientHeight={bottomContainerHeight}
    class="flex flex-col flex-wrap content-start gap-2 overflow-auto overflow-y-hidden border-t border-slate-400 bg-slate-100 p-2"
    style="height: calc(100vh - {topContainerHeight}px);max-height: calc(100vh - {topContainerHeight}px); max-width: 100vw;"
  >
    {#each user.notes as note}
      <NoteComponent {note} />
    {/each}
    <div></div>
  </div>
</div>
