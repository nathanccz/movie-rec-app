import daisyui from "daisyui"
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, aspectRatio],
  daisyui: {
    themes: ["synthwave", "black", "business", "night", "cyberpunk", "sunset", "nord"],
  },
}
