<script lang="ts">
  import { noteColors, type Note } from "$lib/models";
  import { fade, fly } from "svelte/transition";
  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { changeBrightness, changeSaturation } from "$lib/util";
  import Fa from "svelte-fa";
  import {
    faCheck,
    faChevronRight,
    faGear,
    faPalette,
    faTrash
  } from "@fortawesome/free-solid-svg-icons";
  import { quadInOut } from "svelte/easing";
  import { toast } from "svelte-sonner";
  import { writable } from "svelte/store";

  export let note: Note;
  export let deleteCallBack: (id: string) => void;

  let colorStore = writable(note.color);
  let hovering = false;

  $: $colorStore, sendColor();

  const {
    elements: { trigger, menu, item, separator, arrow, overlay },
    builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
    states: { open }
  } = createDropdownMenu({
    onOpenChange: ({ curr, next }) => {
      if (!next) {
        hovering = false;
      }
      return next;
    }
  });

  const {
    elements: { subMenu, subTrigger },
    states: { subOpen }
  } = createSubmenu({
    positioning: { placement: "right" }
  });

  const {
    elements: { radioGroup, radioItem },
    helpers: { isChecked }
  } = createMenuRadioGroup({
    value: colorStore
  });

  let initialTitle = note.title;
  let initialContent = note.content;
  let initialColor = note.color;

  async function sendTitle() {
    if (note.title === initialTitle) return;

    try {
      const response = await fetch(`api/notes/${note.id}/title`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: note.title })
      });

      if (response.ok) {
        const data = await response.json();
        note.title = data.title;
        initialTitle = data.title;
      } else {
        note.title = initialTitle;
        toast.error("Failed to update content!");
      }
    } catch (error) {
      note.title = initialTitle;
      toast.error("Failed to update content!");
    }
  }

  async function sendContent() {
    if (note.content === initialContent) return;

    try {
      const response = await fetch(`api/notes/${note.id}/content`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: note.content })
      });

      if (response.ok) {
        const data = await response.json();
        note.content = data.content;
        initialContent = data.content;
      } else {
        note.content = initialContent;
        toast.error("Failed to update content!");
      }
    } catch (error) {
      note.content = initialContent;
      toast.error("Failed to update content!");
    }
  }

  async function sendColor() {
    if ($colorStore === initialColor) return;

    try {
      const response = await fetch(`api/notes/${note.id}/color`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ color: $colorStore })
      });

      if (response.ok) {
        const data = await response.json();
        note.color = data.color;
        initialColor = data.color;
        color = noteColors.get(data.color);
        borderColor = changeBrightness(color?.hex!, -0.15);
        textAreaBorders = changeBrightness(color?.hex!, -0.25);
        bgColor = changeBrightness(color?.hex!, 0.35);
      } else {
        note.color = initialColor;
        toast.error("Failed to update note color!");
      }
    } catch (error) {
      note.color = initialColor;
      toast.error("Failed to update note color!");
    }
  }

  async function deleteNote() {
    try {
      const response = await fetch(`api/notes/${note.id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        deleteCallBack(note.id);
      } else {
        toast.error("Failed to delete note!");
      }
    } catch (error) {
      toast.error("Failed to delete note!");
    }
  }

  let color = noteColors.get(note.color);
  let titleTextarea: HTMLTextAreaElement;
  let contentTextarea: HTMLTextAreaElement;

  let borderColor = changeBrightness(color?.hex!, -0.15);
  let textAreaBorders = changeBrightness(color?.hex!, -0.25);
  let bgColor = changeBrightness(color?.hex!, 0.35);
</script>

<div
  class="note"
  style="background-color: {color?.hex}; border-color: {borderColor} "
  in:fade={{ duration: 100 }}
  on:mousemove={() => {
    hovering = true;
  }}
  on:mouseleave={() => {
    if ($open) {
      hovering = true;
    } else {
      hovering = false;
    }
  }}
  role="note"
>
  <textarea
    class="text-base font-bold placeholder:text-slate-600"
    style={`outline-color: ${textAreaBorders};`}
    rows="1"
    maxlength="255"
    placeholder="Title here..."
    bind:value={note.title}
    bind:this={titleTextarea}
    on:input={() => {
      titleTextarea.style.height = "auto";
      titleTextarea.style.height = `${titleTextarea.scrollHeight}px`;
    }}
    on:focusin={() => {
      titleTextarea.style.backgroundColor = bgColor;
    }}
    on:focusout={() => {
      titleTextarea.style.backgroundColor = "";
    }}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        titleTextarea.blur();
      }
    }}
    on:blur={() => sendTitle()}
  />
  <textarea
    class="text-sm font-normal placeholder:text-slate-500"
    style={`outline-color: ${textAreaBorders};`}
    placeholder="Content here..."
    bind:value={note.content}
    bind:this={contentTextarea}
    on:input={() => {
      contentTextarea.style.height = "auto";
      contentTextarea.style.height = `${contentTextarea.scrollHeight}px`;
    }}
    on:focusin={() => {
      contentTextarea.style.backgroundColor = bgColor;
    }}
    on:focusout={() => {
      contentTextarea.style.backgroundColor = "";
    }}
    on:blur={() => sendContent()}
  />
  <div class="flex h-[24px] items-center px-2">
    <div class="grow text-[11px] text-slate-600">
      {note.created_at.toLocaleString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}
    </div>
    {#if hovering}
      <div use:melt={$trigger} transition:fade={{ duration: 150, easing: quadInOut }}>
        <div class="rounded-full p-[6px]" style="background-color:{borderColor};">
          <Fa icon={faGear} class="text-slate-800" />
        </div>
      </div>
    {/if}
  </div>
</div>

{#if $open}
  <div use:melt={$overlay} class="fixed inset-0 z-40" />
  <div use:melt={$menu} class="menu" transition:fly={{ duration: 200, y: -10 }}>
    <div class="item" use:melt={$subTrigger}>
      <div
        class="absolute left-0 top-1/2 inline-flex w-6 items-center justify-center"
        style="translate: 0 calc(-50% )"
      >
        <Fa icon={faPalette} class="text-slate-500 group-hover:text-red-600" />
      </div>
      Change color
      <div class="ml-auto pl-5">
        <Fa icon={faChevronRight} size="sm" />
      </div>
    </div>
    {#if $subOpen}
      <div
        class="menu !w-[150px] shadow-md shadow-neutral-900/30"
        use:melt={$subMenu}
        transition:fly={{ x: -50, duration: 150 }}
      >
        <div class="pl-6 text-xs leading-6 text-slate-600">Colors</div>
        <div use:melt={$radioGroup}>
          {#each noteColors as color (color[0])}
            <div class="item" use:melt={$radioItem({ value: color[0] })}>
              <div
                class="absolute left-0 top-1/2 inline-flex w-6 items-center justify-center"
                style="translate: 0 calc(-50% ) "
              >
                <div
                  class="absolute z-10 h-4 w-4 rounded-sm"
                  style={`background-color: ${changeSaturation(color[1].hex, 50)}; border: 1px solid ${changeBrightness(
                    color[1].hex,
                    -0.25
                  )}`}
                ></div>
                {#if $isChecked(color[0])}
                  <Fa icon={faCheck} size="sm" class="z-20 text-slate-900" />
                {/if}
              </div>
              {color[1].name}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    <div use:melt={$separator} class="m-[5px] h-[1px] bg-slate-200" />

    <div
      use:melt={$item}
      class="item group"
      on:m-click={(e) => {
        e.preventDefault();
      }}
      on:dblclick={deleteNote}
      role="menuitem"
      tabindex="0"
    >
      <div
        class="absolute left-0 top-1/2 inline-flex w-6 items-center justify-center"
        style="translate: 0 calc(-50% ) "
      >
        <Fa icon={faTrash} class="text-slate-500 group-hover:text-red-600" />
      </div>
      Delete note
    </div>
    <div use:melt={$arrow} />
  </div>
{/if}

<style lang="postcss">
  .menu {
    @apply z-40 flex max-h-[300px] w-[200px] flex-col shadow-lg;
    @apply rounded-md bg-white p-1 shadow-neutral-900/30 lg:max-h-none;
    @apply ring-0 !important;
  }
  .item {
    @apply relative h-6 min-h-[24px] select-none rounded-sm pl-6 pr-1;
    @apply z-40 text-slate-900 outline-none;
    @apply data-[highlighted]:bg-slate-200 data-[highlighted]:text-slate-900;
    @apply data-[disabled]:text-slate-300;
    @apply flex items-center text-sm leading-none;
    @apply ring-0 !important;
  }

  textarea {
    @apply w-full resize-none overflow-clip whitespace-pre-wrap text-pretty break-words rounded-sm;
    @apply bg-transparent px-2 py-1 outline-2 transition-colors focus:outline;
  }

  .note {
    @apply flex w-80 flex-col gap-2 rounded-lg border-2 p-2 transition-colors duration-200;
  }
</style>
