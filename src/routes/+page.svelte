<script lang="ts">
    import TrueFalseResponse from "$lib/TrueFalseResponse.svelte";

    let response: boolean;
</script>

<svelte:head>
    <title>Anime quizz</title>
</svelte:head>
<div class="container mx-auto flex flex-wrap">
    <div class="my-4 grow text-center font-black">
        <div
            class="mx-auto flex animate-movingbg flex-col bg-gradient-to-r from-violet-900 via-blue-700 to-violet-900 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
        >
            <div class="self-start pb-5 text-6xl">Anime quizz</div>
        </div>
        <div class="text-start text-xl text-slate-100">
            Anime quizz game, it asks anime related questions... Enjoy!
        </div>
    </div>
    <div class="flex grow content-center gap-8">
        <div class="self-center text-xl font-bold text-slate-900">
            Created by <a
                href="https://github.com/Furanshisuko17"
                class="text-violet-500 underline hover:text-violet-600"
            >
                Francisco
            </a>
        </div>
        <div class="self-center text-xl font-semibold">
            <a
                href="https://github.com/Furanshisuko17/QA-Projects/tree/project_three"
                class=" text-slate-100 underline hover:text-slate-200"
            >
                Github
            </a>
        </div>
    </div>
    <div class="container mx-auto flex p-4">
        <div class="flex flex-grow flex-col items-center justify-center gap-4">
            <img class="h-[400px] w-[400px]" src="" alt="" />
        </div>
        <div class="flex flex-grow flex-col gap-4">
            <div class="flex flex-col">
                <h2 class="mb-2 text-4xl font-bold text-slate-100">How to play</h2>
                <ul class="list-inside list-decimal text-slate-100">
                    <li>There exists two types of questions: True/False and Multiple Choices</li>
                    <li>There is no time limit.</li>
                    <li>You can not skip any questions.</li>
                    <li>The puntuation will be shown at the end of the game.</li>
                </ul>
            </div>
            <div class="m-auto flex">
                <a
                    href="/play"
                    class="rounded border-2 border-purple-700 bg-indigo-900 px-5 py-2 text-center text-3xl font-bold text-gray-100"
                >
                    Play
                </a>
            </div>
        </div>
    </div>
</div>
