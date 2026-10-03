import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// De site draait op https://<gebruiker>.github.io/wheelofvalues/, vandaar deze base.
export default defineConfig({
  base: '/wheelofvalues/',
  plugins: [react()],
})
