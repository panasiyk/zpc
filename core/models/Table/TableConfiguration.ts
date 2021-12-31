import { AxiosResponse } from 'axios'

import TableColumn from '~/core/models/Table/TableColumn'
import TableSorting from '~/core/models/Table/TableSorting'
import SortingDirectionEnum from '~/core/enums/SortingDirectionEnum'
import Pagination from '~/core/models/Pagination'
import TableFilter from '~/core/models/Table/TableFilter'
import IFromResponse from '~/core/interfaces/IFromResponse'
import ITableColumnStyle from '~/core/interfaces/ITableColumnStyle'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'

export default class TableConfiguration<T = Record<string, any>> implements IFromResponse<TableConfiguration<T>> {
  items: T[] = []
  columns: TableColumn[] = []
  selectedColumns: string[] = []
  filters: TableFilter[] = []
  sorting: TableSorting = new TableSorting('id', SortingDirectionEnum.ascending)
  pagination: Pagination = new Pagination()
  isFirstInit = true
  disableLocalSorting = true

  constructor (
    public tableName: string,
    public sourcePath?: string,
    public additionalRequestParams?: Record<string, any>
  ) {
  }

  get displayingColumns (): TableColumn[] {
    return this.columns.filter(column => this.selectedColumns.includes(column.value))
  }

  get filtersMap () {
    const map: Record<string, any> = {}

    this.filters.forEach((filter) => {
      map[filter.field] = filter.value
    })

    return map
  }

  get selectedFiltersCount (): number {
    return this.filters.filter(filter => filter.value !== undefined && filter.value !== null && filter.value !== '').length
  }

  fromResponse (response: AxiosResponse): TableConfiguration<T> {
    this.items = Array.isArray(response.data.items) ? response.data.items : Object.values(response.data.items)
    this.pagination = new Pagination().fromHeaders(response.headers)

    if (this.isFirstInit) {
      this.columns = response.data.columns.map((item: any) => new TableColumn().fromJson(item))
      this.selectedColumns = response.data.selectedColumns || this.columns.map(column => column.value)
      this.filters = response.data.columns.map((item: any) => new TableFilter().fromJson(item))

      this.isFirstInit = false
    }

    return this
  }

  isFilterSet (field: string): boolean {
    const value = this.filters.find(filter => filter.field === field)?.value

    return value !== undefined && value !== null && value !== ''
  }

  async fetchItems (params: Record<string, any> = {}) {
    if (!this.sourcePath) {
      return Promise.resolve(new ActionResult(undefined, new Error('Не указан источник данных')))
    }

    try {
      const response = await $axios.get(this.sourcePath, {
        params: {
          sorting: this.sorting.requestData,
          page: this.pagination.currentPage,
          selectedColumns: this.selectedColumns,
          filters: this.filtersMap,
          ...this.additionalRequestParams,
          ...params
        }
      })

      this.fromResponse(response)

      return new ActionResult()
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }

  setColumnStyleConfig (config: Record<string, ITableColumnStyle>) {
    for (const columnId in config) {
      const column = this.columns.find(column => column.value === columnId)
      if (column) {
        column.setStyle(config[columnId])
      }
    }
  }
}
