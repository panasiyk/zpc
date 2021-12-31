import { Plugin } from '@nuxt/types'
import { vxm } from '~/store'

const plugin: Plugin = ({ route, redirect }) => {
  const excludedRoutes = [
    'auth-login',
    'help',
    'reset-password-new-token',
    'reset-password-email'
  ]

  if (!excludedRoutes.includes(route.name as string)) {
    if (!vxm.auth.loggedIn) {
      redirect({ name: 'auth-login' })
    }
  }
}

export default plugin
