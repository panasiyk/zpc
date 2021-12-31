import { NuxtConfig } from '@nuxt/types'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'

const config: NuxtConfig = {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Процессинговый центр - %s',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/new-design/sass/index.sass'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios-accessor.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/fetch-auth-user.ts',
    '~/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://dev2.anmarto.ru/app'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    plugins: [
      new WebpackBuildNotifierPlugin({
        title: 'PC',
        suppressWarning: true
      })
    ]
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './{components,layouts,middleware,pages,plugins,store,test,types,core}/**/*.{ts,js,vue}'
      }
    }
  },

  router: {
    prefetchLinks: false,
    middleware: 'auth'
  }
}

export default config
