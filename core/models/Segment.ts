import IFromJson from '~/core/interfaces/IFromJson'
import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'
import ConditionsWidgetModel from '~/core/models/ConditionsWidget/ConditionsWidgetModel'

export default class Segment implements IFromJson<Segment> {
  id: number = 0
  name: string = ''
  type_item?: IWithIdAndLabel
  frequency?: IWithIdAndLabel
  conditions?: ConditionsWidgetModel
  created_at?: string
  updated_at?: string

  // constructor (
  //   id: number,
  //   name: string,
  //   created_at: string,
  //   updated_at: string,
  //   type_item?: IWithIdAndLabel,
  //   frequency?: IWithIdAndLabel,
  //   conditions?: ConditionsWidgetModel
  // ) {
  //   this.id = id
  //   this.name = name
  //   this.type_item = type_item
  //   this.frequency = frequency
  //   this.created_at = created_at
  //   this.updated_at = updated_at
  //   this.conditions = conditions
  // }

  constructor ({
                 id,
                 name,
                 createdAt,
                 updatedAt,
                 typeItem,
                 frequency,
                 conditions
               }: {
    id: number,
    name: string,
    createdAt?: string,
    updatedAt?: string,
    typeItem?: IWithIdAndLabel,
    frequency?: IWithIdAndLabel,
    conditions?: ConditionsWidgetModel
  }) {
    this.id = id
    this.name = name
    this.created_at = createdAt
    this.updated_at = updatedAt
    this.type_item = typeItem
    this.frequency = frequency
    this.conditions = conditions
  }

  fromJson (json: any): Segment {
    this.id = json.id
    this.name = json.name
    this.type_item = json.type_item
    this.frequency = json.frequency
    this.created_at = json.created_at
    this.updated_at = json.updated_at

    return this
  }
}
