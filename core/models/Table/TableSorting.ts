import Vue from 'vue'

import SortingDirectionEnum from '~/core/enums/SortingDirectionEnum'
import IFromJson from '~/core/interfaces/IFromJson'

export default class TableSorting implements IFromJson<TableSorting> {
  constructor (public field: string = 'id', public direction: SortingDirectionEnum = SortingDirectionEnum.ascending) {
  }

  get requestData () {
    const naming: Map<SortingDirectionEnum, string> = new Map([
      [SortingDirectionEnum.ascending, 'asc'],
      [SortingDirectionEnum.descending, 'desc']
    ])
    return {
      field: this.field,
      direction: naming.get(this.direction)
    }
  }

  reset () {
    Vue.set(this, 'field', 'id')
    Vue.set(this, 'direction', SortingDirectionEnum.ascending)
  }

  setSorting (field: string, direction: string) {
    Vue.set(this, 'field', field)
    Vue.set(this, 'direction', direction)
  }

  fromJson (json: any): TableSorting {
    this.field = json.field
    this.direction = json.direction

    return this
  }
}
