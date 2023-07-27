/** @type {import('tailwindcss').Config} */

module.exports ={
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        metal: "#f2e3ff",
        maincolor:"#783AB1",
        submaincolor:"#b47be8",
        lightgreyish:"#374151",
        darkgreyish:"#1F2937"
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  // darkMode: "class"
};
