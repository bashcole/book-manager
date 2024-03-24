/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gray': '#F1EFE8'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

