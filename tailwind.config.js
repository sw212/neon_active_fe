/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#ffffff",
            black: "#000000",
            // 'text': '#028e8d',
            background: "rgb(22, 22, 24)",
        },
        extend: {},
    },
    plugins: [],
};
