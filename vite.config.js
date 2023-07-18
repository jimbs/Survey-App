import { fileURLToPath, URL } from 'node:url'

// import '@mdi/light-font'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuetify from 'vite-plugin-vuetify'

console.log(import.meta.url)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vuetify()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
