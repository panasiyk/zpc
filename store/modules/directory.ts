import { action, createModule, mutation } from 'vuex-class-component'

import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import IActionResultWithTableData from '~/core/interfaces/IActionResultWithTableData'

export interface FetchTableDataPayload {
  type: DirectoryTypeEnum,
  tableConfiguration: TableConfiguration
}

export default class DirectoryModule extends createModule({
  namespaced: 'directory',
  strict: false,
  target: 'nuxt'
}) {
  selectedDirectory: Array<any> = []

  @mutation
  addSelectedDirectory (directoryList: Array<any>) {
    const uniqueArray = directoryList.filter(item => !this.selectedDirectory.some(segment => segment.id === item.id))
    this.selectedDirectory = [...this.selectedDirectory, ...uniqueArray]
  }

  @mutation
  removeSelectedDirectoryItem (directoryItem: any) {
    this.selectedDirectory = this.selectedDirectory.filter(item => item.id !== directoryItem.id)
  }

  @action
  async fetchTableData (payload: FetchTableDataPayload) {
    try {
      const response = await $axios.get('/v1/data/table/directory', {
        params: {
          type: payload.type,
          sorting: payload.tableConfiguration.sorting,
          page: payload.tableConfiguration.pagination.currentPage,
          selectedColumns: payload.tableConfiguration.selectedColumns,
          filters: payload.tableConfiguration.filtersMap
        }
      })

      payload.tableConfiguration.fromResponse(response)

      return new ActionResult<IActionResultWithTableData>({
        tableConfiguration: payload.tableConfiguration
      })
    } catch (e:any) {
      return new ActionResult<IActionResultWithTableData>(undefined, e)
    }
  }
}
