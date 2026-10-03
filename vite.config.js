import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// De site draait op https://<gebruiker>.github.io/waardenwiel/, vandaar deze base.
export default defineConfig({
  base: '/waardenwiel/',
  plugins: [react()],
})
