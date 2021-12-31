import { action, createModule } from 'vuex-class-component'

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import Order from '~/core/models/Order'

export default class OrderModule extends createModule({
  namespaced: 'order',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchOrdersTableData (payload: { tableConfiguration: TableConfiguration }) {
    try {
      const response = await $axios.get('/v1/data/table/order', {
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

  @action
  async fetchOrderDetails (id: number) {
    try {
      const data = await $axios.$get(`/v1/order/${id}`)

      const order = new Order().fromJson(data)

      return new ActionResult({
        order
      })
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }
}
