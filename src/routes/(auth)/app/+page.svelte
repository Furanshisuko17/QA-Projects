<script lang="ts">
  import { Note, User } from "$lib/models";

  let user: User = new User("1", "user1", [
    new Note("1", "Note 1", "Description 1", new Date()),
    new Note("2", "Note 2", "Description 2", new Date())
  ]);
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

<div class="h-full w-full">
  <div
    class="mx-auto flex animate-movingbg flex-col bg-gradient-to-r from-violet-900 via-blue-700 to-violet-900 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
  >
    <div class="self-start p-2 text-2xl font-bold">{user.username}'s Notes</div>
  </div>

  <div class="flex grow flex-col flex-wrap"></div>
</div>
