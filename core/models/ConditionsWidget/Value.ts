import ValueItem from '~/core/models/ConditionsWidget/ValueItem'

export default class Value {
  filterName: string = ''
  items: ValueItem[] = []

  constructor (filterName: string, items: ValueItem[]) {
    this.filterName = filterName
    this.items = items
  }
}
