// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  app: {
    baseURL: '/test-scamacca/'
  },
  css: [
  //   '@/assets/css/variables.css',
    '@/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "@/assets/css/_typografy.scss" as *;'
        }
      }
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image']
})