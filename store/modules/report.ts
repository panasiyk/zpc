import { action, createModule } from 'vuex-class-component'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import TableConfiguration from '~/core/models/Table/TableConfiguration'

export default class ReportModule extends createModule({
  namespaced: 'report',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchDiscountReportTableData (payload: { tableConfiguration: TableConfiguration }) {
    try {
      const response = await $axios.get('/v1/data/table/report', {
        params: {
          sorting: payload.tableConfiguration.sorting,
          page: payload.tableConfiguration.pagination.currentPage,
          selectedColumns: payload.tableConfiguration.selectedColumns,
          filters: payload.tableConfiguration.filtersMap
        }
      })

      payload.tableConfiguration.fromResponse(response)

      return new ActionResult()
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }
}
