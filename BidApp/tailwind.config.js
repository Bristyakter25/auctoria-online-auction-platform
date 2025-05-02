/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        "custom-curve": "ellipse(100% 100% at 100% 50%)",
        // Add more custom shapes if needed
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-clip-path")],
  daisyui: {
    themes: ["light", "dark"], // Configure DaisyUI themes
  },
};

// require('tailwind-clip-path')
