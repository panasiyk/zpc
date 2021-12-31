import ISelectItem from '~/core/interfaces/ISelectItem'
import IFromJson from '~/core/interfaces/IFromJson'

export default class Discount implements IFromJson<Discount> {
  id?: number
  space?: ISelectItem
  name?: string
  conditions?: string[] | number[]
  segments?: string[] | number[]
  isActive: boolean = true
  type?: string
  value?: number | string | null
  folderId: number | null = null

  fromJson (json: any): Discount {
    this.name = json.name
    this.type = json.type_id.toString()
    this.value = json.amount
    this.id = json.id
    this.space = json.space
      ? ({
        text: json.space.name,
        value: json.space.id
      })
      : undefined
    this.conditions = json.sources
      ? json.sources.map((item: any) => item.id)
      : []
    this.segments = json.segments
      ? json.segments.map((item: any) => item.id)
      : []
    this.folderId = json.folder_id

    return this
  }
}
