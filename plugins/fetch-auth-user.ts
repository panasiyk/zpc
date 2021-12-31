import { Plugin } from '@nuxt/types'
import { vxm } from '~/store'

const plugin: Plugin = async ({ $axios }) => {
  const authToken = localStorage.getItem('authToken')

  if (authToken) {
    $axios.setToken(authToken, 'Bearer')

    await vxm.auth.fetchAuthUser()
  }
}

export default plugin
