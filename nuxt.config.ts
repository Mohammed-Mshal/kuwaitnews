// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: '/',
      withCredentials: true
    }
  },
  app: {
    head: {
      title: 'KUWAITNEWS',
      script: [
        {
          src: '/js/bootstrap.bundle.min.js'
        },
      ],
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      }
    },
  },
  css: ['@/assets/css/bootstrap.min.css', '@/assets/css/stylesheet.css', '@/assets/css/main.css'],
  plugins: [
    '@/plugins/axios.ts'
  ],
  i18n: {
    defaultLocale: 'ar',
    strategy: 'prefix',
    locales: [
      {
        code: 'en',
        dir: 'ltr',
        name: 'English',
        language: 'en',
        file: 'en.json'
      },
      {
        code: 'ar',
        dir: 'rtl',
        name: 'Arabic',
        language: 'ar',
        file: 'ar.json'
      }
    ]
  },
  modules: [
    '@nuxtjs/i18n',
    'nuxt-lucide-icons',
    '@pinia/nuxt',
    '@nuxt/image'
  ]
})