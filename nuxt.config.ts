// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  app: {
    baseURL: '/test-scamacca/'
  },
  css: [
    '@/assets/scss/main.scss',
  ],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt']
})