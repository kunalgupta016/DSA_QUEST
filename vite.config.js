import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    heme: {
      extend: {
        fontFamily: {
          royal: ['Cinzel', 'serif'],
        },
        colors: {
          royalGold: '#D4AF37',
          royalDark: '#1A1A1A',
        },
      },
    },
    
})
