import IFromJson from '~/core/interfaces/IFromJson'

export default class Point implements IFromJson<Point> {
  id?: number
  external_id?: string
  company_id?: number
  description?: string
  created_at?: string
  updated_at?: string

  fromJson (json: any): Point {
    this.id = json.id
    this.external_id = json.external_id
    this.company_id = json.company_id
    this.description = json.description
    this.created_at = json.created_at
    this.updated_at = json.updated_at

    return Object.assign(this, json, this)
  }
}
