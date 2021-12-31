// @ts-ignore
import { v4 as uuid } from 'uuid'

export default class WidgetModelItem {
  id: string
  conditionId: number | null = null
  type: string = ''
  items: WidgetModelItem[]
  filter?: string | null = null
  itemId?: string | null = null
  value?: any

  static FOLDER = 'group'
  static CONDITION = 'item'

  constructor (
    conditionId: number | null,
    type: string,
    items: WidgetModelItem[] = [],
    filter?: string | null,
    itemId?: string | null,
    value?: any
  ) {
    this.filter = filter
    this.conditionId = conditionId
    this.itemId = itemId
    this.value = value
    this.id = uuid()
    this.type = type
    this.items = items
  }

  get isFolder () {
    return this.type === WidgetModelItem.FOLDER
  }

  get isCondition () {
    return this.type === WidgetModelItem.CONDITION
  }
}
