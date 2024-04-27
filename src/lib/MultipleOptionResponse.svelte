<script lang="ts">
    export const question: string = "";
    export let answer: boolean;

</script>

<div>
    <button
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        on:click={() => (answer = true)}
    >
        True
    </button>
    <button
        class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        on:click={() => (answer = false)}
    >
        False
    </button>
</div>
