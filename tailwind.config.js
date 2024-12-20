/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-sky": "hsl(210,32%,93%)",
        "pale-sky": "hsl(210,38%,97%)",
        "dusty-blue": "hsl(210,9%,60%)",
        "forest-green": "hsl(162,46%,39%)",
        "vibrant-blue": "hsl(230,52%,53%)",
        "deep-charcoal": "hsl(212,29%,18%)",
        "bright-teal": "hsl(207,61%,49%)",
        "midnight-blue": "hsl(208,61%,27%)",
        "slate-gray": "hsl(212,18%,35%)",
        "cool-gray": "hsl(212,36%,35%)",
        "color-active": "hsl(205,92%,74%)",
        "color-1": "hsl(254,100%,71%)",
        "color-2": "hsl(227,31%,94%)",
      },
      keyframes: {
        "hover-bottom": {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "hover-bottom": "hover-bottom 1s ease-in-out forwards",
        "border-spin": "border-spin 7s linear infinite",
      },
    },
  },
  plugins: [],
};
