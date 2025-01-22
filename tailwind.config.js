/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Soft Green
        secondary: '#FF5722', // Vibrant Orange
        light: '#F5F5F5', // Off White
        dark: '#121212', // Dark Grey
        textPrimary: '#212121', // Black for light mode
        textSecondary: '#757575', // Grey for subtitles
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
     
    },
  },
  plugins: [
    scrollbarHide
  ],
}

