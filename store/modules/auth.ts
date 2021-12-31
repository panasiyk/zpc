import { action, createModule, mutation } from 'vuex-class-component'

import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import User from '~/core/models/User'

export interface LoginPayload {
  login: string
  password: string
}

export default class AuthModule extends createModule({
  namespaced: 'auth',
  strict: false,
  target: 'nuxt'
}) {
  authUser: User | null = null

  get loggedIn (): boolean {
    return Boolean(this.authUser)
  }

  @mutation
  logout () {
    localStorage.removeItem('authToken')
    this.authUser = null
  }

  @action
  async login (payload: LoginPayload) {
    try {
      const { token } = await $axios.$post('/v1/user/auth/login', {
        username: payload.login,
        password: payload.password
      })

      $axios.setToken(token, 'Bearer')
      localStorage.setItem('authToken', token)

      const result = await this.fetchAuthUser()

      if (result.isSuccess) {
        return new ActionResult()
      }

      return result
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }

  @action
  async fetchAuthUser () {
    try {
      const user = await $axios.$get('/v1/user')

      this.authUser = new User().fromJson(user)

      return new ActionResult()
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }
}
