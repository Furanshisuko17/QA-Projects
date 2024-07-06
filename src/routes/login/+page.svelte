<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <div
    class="flex h-1/3 animate-movingbg items-center bg-gradient-to-r from-violet-900 via-blue-700 to-violet-900 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
  >
    <div class="px-2 py-1 text-6xl font-bold">Note Taking App</div>
  </div>
  <div class="h-2/3">
    <form
      class="flex flex-col gap-4"
      use:enhance={({ formElement, formData, action, cancel, submitter }) => {}}
      method="post"
    >
      <label class="flex flex-col">
        <span class="mb-1 text-sm font-medium text-gray-700">Nombre de usuario</span>
        <input
          type="text"
          name="username"
          id="username"
          class="w-64 rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-slate-800 focus:outline-none"
        />
      </label>
      {#if form?.error}
        <p class="-mt-3 text-sm font-semibold text-red-500">{form.error}</p>
        <ul class="-mt-3 w-64 list-outside list-disc pl-6 text-sm text-gray-900">
          <li>Solo letras mayúsculas, minusculas y números.</li>
          <li>No puede tener espacios.</li>
        </ul>
      {/if}
      <button
        type="submit"
        class="w-full rounded-md bg-slate-900 py-2 text-white hover:bg-slate-800"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</div>
