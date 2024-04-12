/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            keyframes: {
                movingbg: {
                    "100%": {
                        "background-position": "200% center"
                    }
                }
            },
            animation: {
                movingbg: "movingbg 3s linear infinite"
            }
        }
    },
    plugins: []
};
