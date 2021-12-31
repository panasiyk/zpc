import IFromJson from '~/core/interfaces/IFromJson'

export default class User implements IFromJson<User> {
  id?: number
  username?: string
  email?: string
  status?: string
  apiKey?: string

  fromJson (json: any): User {
    this.id = json.id
    this.username = json.username
    this.email = json.email
    this.status = json.status
    this.apiKey = json.apiKey

    return this
  }
}
