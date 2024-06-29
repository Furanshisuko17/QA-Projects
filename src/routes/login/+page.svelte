<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex h-screen items-center justify-center">
  <form class="flex flex-col gap-4" use:enhance method="post">
    <label class="flex flex-col">
      <span class="text-sm font-medium text-gray-700">Email</span>
      <input
        type="email"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-medium text-gray-700">Password</span>
      <input
        type="password"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      />
    </label>
    <button type="submit" class="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600">
      Login
    </button>
  </form>
</div>
