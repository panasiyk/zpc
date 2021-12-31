import { get } from 'lodash'

export default class ActionResult<T> {
  constructor (public data?: T, public error?: Error) {
  }

  get statusCode (): number | undefined {
    return get(this.error, 'response.data.status', undefined)
  }

  get errorMessage (): string {
    return get(this.error, 'response.data.message', '')
  }

  get isSuccess (): boolean {
    return !this.error
  }
}
