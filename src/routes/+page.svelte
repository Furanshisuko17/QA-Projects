<script lang="ts">

</script>

<main class="container mx-auto w-2/3 font-sans">
    <div class="container mx-auto flex flex-wrap">
        <div class="my-4 grow text-center font-black">
            <div
                class="mx-auto flex animate-movingbg flex-col bg-gradient-to-r from-green-500 via-blue-500 to-green-500 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
            >
                <div class="self-start text-6xl">Word Counter</div>
            </div>
            <div class="text-xl text-start text-slate-900">App for counting words, characters and sentences.</div>
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
        <textarea name="" id="" class="w-full h-full min-h-80 bg-green-50/50"></textarea>

    </div>
    <div class="mx-auto flex flex-wrap justify-stretch gap-4">
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-pink-500 bg-slate-50 px-4"
        >
            <div class=" font-semibold text-slate-950">Length</div>
            <input
               
                type="range"
                min="8"
                max="30"
                class="slider accent-pink-500"
                id="myRange"
            />
            <div class="min-w-[24px] text-center font-semibold text-slate-950"></div>
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-pink-500 bg-slate-50 px-4"
        >
            <div class=" font-semibold text-slate-950">Numbers</div>
            <input
               
                type="checkbox"
                class="checkbox accent-pink-500"
            />
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-pink-500 bg-slate-50 px-4"
        >
            <div class=" font-semibold text-slate-950">Symbols</div>
            <input
                
                type="checkbox"
                class="checkbox accent-pink-500"
            />
        </div>
    </div>
</main>
