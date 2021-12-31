import { action, createModule } from 'vuex-class-component'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import TableConfiguration from '~/core/models/Table/TableConfiguration'

export interface FetchConditionsResponse {
  conditions?: any[]
}

export default class DiscountSourceModule extends createModule({
  namespaced: 'source',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchConditionsTableData (payload: { tableConfiguration: TableConfiguration }) {
    try {
      const response = await $axios.get('/v1/data/table/source', {
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
  async fetchRecommendationsTableData (payload: { tableConfiguration: TableConfiguration }) {
    try {
      const response = await $axios.get('/v1/data/table/recommendation', {
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
  async fetchConditions (): Promise<ActionResult<FetchConditionsResponse>> {
    try {
      const { items } = await $axios.$get('/v1/data/table/source', {
        params: {
          all: true
        }
      })

      return new ActionResult({
        conditions: items
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }
}
