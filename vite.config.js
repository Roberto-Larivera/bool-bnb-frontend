import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { 
         additionalData: `
         @import "./src/style/partials/variables.scss";
         @import "./src/style/partials/mixin.scss";
         
         
         ` 
     },
    },
  },
})
