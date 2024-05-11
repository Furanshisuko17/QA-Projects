<script lang="ts">
    let textAreaValue = "";
    let characters = 0;
    let words = 0;
    let sentences = 0;
    let whitespaces = 0;

    $: {
        if (textAreaValue.trim() === "" || textAreaValue === null) {
            words = 0;
            sentences = 0;
        } else {
            words = (textAreaValue.match(/\b\p{L}+\b/gu) || []).length;
            let helper = textAreaValue
                .trim()
                .split(/\p{L}[.!?][.!?\s]+/gu)
                .filter(
                    (sentence) =>
                        sentence.trim().length > 0 && textAreaValue.trim().indexOf(".") != -1
                );
            sentences = helper.length;
            console.log(helper);
            console.log("");
        }

        whitespaces = (textAreaValue.match(/\s/g) || []).length;
        characters = textAreaValue.length - whitespaces;
    }
</script>

<svelte:head>
    <title>Word Counter</title>
</svelte:head>

<main class="container mx-auto w-2/3 font-sans">
    <div class="container mx-auto flex flex-wrap">
        <div class="my-4 grow text-center font-black">
            <div
                class="mx-auto flex animate-movingbg flex-col bg-gradient-to-r from-green-500 via-blue-500 to-green-500 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
            >
                <div class="self-start text-6xl">Word Counter</div>
            </div>
            <div class="text-start text-xl text-slate-900">
                App for counting words, characters and sentences.
            </div>
        </div>
        <div class="flex grow content-center gap-8">
            <div class="self-center text-xl font-bold text-slate-900">
                Created by <a
                    href="https://github.com/Furanshisuko17"
                    class="text-green-500 underline hover:text-green-600"
                >
                    Francisco
                </a>
            </div>
            <div class="self-center text-xl font-semibold">
                <a
                    href="https://github.com/Furanshisuko17/QA-Projects/tree/project_two"
                    class=" text-slate-700 underline hover:text-slate-800"
                >
                    Github
                </a>
            </div>
        </div>
    </div>
    <div class="mx-auto my-4 rounded-md border-4 border-blue-300 bg-slate-100 bg-clip-border">
        <textarea
            bind:value={textAreaValue}
            name=""
            id=""
            class="m-0 box-border h-full min-h-80 w-full resize-none border-0 bg-green-50/50 p-2 align-top text-lg font-semibold outline-0"
        ></textarea>
    </div>
    <div class="mx-auto flex flex-wrap justify-stretch gap-4">
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-blue-800 bg-slate-50 px-4"
        >
            <div class=" font-bold text-slate-950">Characters:</div>
            <div class="min-w-[24px] text-center font-bold text-blue-800">
                {characters.toLocaleString()}
            </div>
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-sky-700 bg-slate-50 px-4"
        >
            <div class=" font-bold text-slate-950">Whitespaces:</div>
            <div class="min-w-[24px] text-center font-bold text-sky-700">
                {whitespaces.toLocaleString()}
            </div>
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-green-700 bg-slate-50 px-4"
        >
            <div class=" font-bold text-slate-950">Words:</div>
            <div class="min-w-[24px] text-center font-bold text-green-700">
                {words.toLocaleString()}
            </div>
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-lime-600 bg-slate-50 px-4"
        >
            <div class=" font-bold text-slate-950">Sentences:</div>
            <div class="min-w-[24px] text-center font-bold text-lime-600">
                {sentences.toLocaleString()}
            </div>
        </div>
    </div>
</main>
