import { action, createModule, mutation } from 'vuex-class-component'

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import { Segment } from '~/core/interfaces/Segment'

export default class PromotionModule extends createModule({
  namespaced: 'promotion',
  strict: false,
  target: 'nuxt'
}) {
  selectedSegment: Array<Segment> = []

  selectedDiscount: Array<any> = []

  @mutation
  clearSelectedDiscount () {
    this.selectedDiscount = []
  }

  @mutation
  addSelectedDiscount (segmentList: Array<any>) {
    const uniqueArray = segmentList.filter(item => !this.selectedDiscount.some(segment => segment.id === item.id))
    this.selectedDiscount = [...this.selectedDiscount, ...uniqueArray]
  }

  @mutation
  removeSelectedDiscountItem (segmentItem: any) {
    this.selectedDiscount = this.selectedDiscount.filter(item => item.id !== segmentItem.id)
  }

  @mutation
  clearSelectedSegment () {
    this.selectedSegment = []
  }

  @mutation
  addSelectedSegment (segmentList: Array<Segment>) {
    const uniqueArray = segmentList.filter(item => !this.selectedSegment.some(segment => segment.id === item.id))
    this.selectedSegment = [...this.selectedSegment, ...uniqueArray]
  }

  @mutation
  removeSelectedSegmentItem (segmentItem: Segment) {
    this.selectedSegment = this.selectedSegment.filter(item => item.id !== segmentItem.id)
  }

  @action
  async fetchPromotionsTableData (payload: { tableConfiguration: TableConfiguration }) {
    try {
      const response = await $axios.get('/v1/data/table/campaign', {
        params: {
          sorting: payload.tableConfiguration.sorting,
          page: payload.tableConfiguration.pagination.currentPage,
          selectedColumns: payload.tableConfiguration.selectedColumns,
          filters: payload.tableConfiguration.filtersMap
        }
      })

      payload.tableConfiguration.fromResponse(response)

      return new ActionResult()
    } catch (e:any) {
      return new ActionResult(undefined, e)
    }
  }
}
