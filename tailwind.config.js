/** @type {import('tailwindcss').Config} */
import bannerImage from './public/banner.png'
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('/assets/banner.png')",
        'imgLogin': "url('/assets/imagenLogin.webp')",
        'imgRegistro': "url('/assets/imgRegistro.webp')"
      }
    },
  },
  plugins: [],
}

