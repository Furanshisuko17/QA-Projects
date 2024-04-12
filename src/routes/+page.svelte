<script lang="ts">
    let generatedPassword = "Press generate!";

    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const symbols = "_.@!#$%^&*(){}[];'?-";

    let allowNumbers = true;
    let allowSymbols = true;
    let passwordSize = 8;

    function generatePassword() {
        generatedPassword = "";
        let charList = letters;
        if (allowNumbers) {
            charList += numbers;
        }
        if (allowSymbols) {
            charList += letters;
            charList += symbols;
        }
        let charListSize = charList.length;
        let generatePasswordHelper = "";
        for (let index = 0; index < passwordSize; index++) {
            let randomIndex = randomIntFromInterval(0, charListSize - 1);
            generatePasswordHelper += charList[randomIndex];
        }
        generatedPassword = generatePasswordHelper;
    }

    function randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function copyToCliboard() {
        navigator.clipboard.writeText(generatedPassword);
    }
</script>

<main class="container mx-auto w-2/3 font-sans">
    <div class="container mx-auto flex flex-wrap">
        <div class="my-4 grow text-center text-6xl font-black text-slate-100">
            <div
                class="mx-auto flex animate-movingbg flex-col bg-gradient-to-r from-pink-500 via-blue-500 to-pink-500 bg-[length:200%_auto] bg-clip-text align-middle text-transparent"
            >
                <div class="self-start">Password</div>
                <div class=" self-center">Generator</div>
            </div>
        </div>
        <div class="flex grow content-center gap-8">
            <div class="self-center text-xl font-bold text-slate-100">
                Created by <a
                    href="https://github.com/Furanshisuko17"
                    class="text-pink-500 underline hover:text-pink-600"
                >
                    Francisco
                </a>
            </div>
            <div class="self-center text-xl font-semibold">
                <a
                    href="https://github.com/Furanshisuko17/QA-Projects/tree/project_one"
                    class=" text-slate-400 underline hover:text-slate-300"
                >
                    Github
                </a>
            </div>
        </div>
    </div>
    <div class="mx-auto my-4 rounded-md border-4 border-pink-300 bg-slate-100 bg-clip-border p-4">
        <div class="break-all text-center font-mono text-2xl tracking-widest">
            {generatedPassword}
        </div>
    </div>
    <div class="mx-auto flex flex-wrap justify-stretch gap-4">
        <button
            on:click={generatePassword}
            class="min-h-[48px] grow rounded-lg border-2 border-pink-500 bg-slate-50 p-2 text-center text-lg font-semibold text-slate-950 hover:bg-slate-200"
        >
            Generate!
        </button>
        <button
            on:click={copyToCliboard}
            class="min-h-[48px] grow rounded-lg border-2 border-pink-500 bg-slate-50 p-2 text-center text-lg font-semibold text-slate-950 hover:bg-slate-200"
        >
            Copy to Clipboard
        </button>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-pink-500 bg-slate-50 px-4"
        >
            <div class=" font-semibold text-slate-950">Length</div>
            <input
                on:input={generatePassword}
                bind:value={passwordSize}
                type="range"
                min="8"
                max="30"
                class="slider accent-pink-500"
                id="myRange"
            />
            <div class="min-w-[24px] text-center font-semibold text-slate-950">{passwordSize}</div>
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-pink-500 bg-slate-50 px-4"
        >
            <div class=" font-semibold text-slate-950">Numbers</div>
            <input
                bind:checked={allowNumbers}
                on:change={generatePassword}
                type="checkbox"
                class="checkbox accent-pink-500"
            />
        </div>
        <div
            class="flex min-h-[48px] grow items-center justify-center gap-4 rounded-lg border-2 border-pink-500 bg-slate-50 px-4"
        >
            <div class=" font-semibold text-slate-950">Symbols</div>
            <input
                bind:checked={allowSymbols}
                on:change={generatePassword}
                type="checkbox"
                class="checkbox accent-pink-500"
            />
        </div>
    </div>
</main>
