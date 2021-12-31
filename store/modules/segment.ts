import { action, createModule } from 'vuex-class-component'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import SegmentFrequency from '~/core/models/SegmentFrequency'
import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import Segment from '~/core/models/Segment'
import WidgetModelItem from '~/core/models/ConditionsWidget/WidgetModelItem'
import ConditionsWidgetModel from '~/core/models/ConditionsWidget/ConditionsWidgetModel'

export interface FetchSegmentsResponse {
  items?: any[]
}

export interface FetchSegmentResponse {
  segment?: Segment
}

function parseConditionsToConditionsWidgetModel (items: any[]) {
  const widgetModelItems: WidgetModelItem[] = []

  items.forEach((item) => {
    if (item.type === WidgetModelItem.FOLDER) {
      const children = parseConditionsToConditionsWidgetModel(item.items)

      const group = new WidgetModelItem(item.condition_id, WidgetModelItem.FOLDER, children)

      widgetModelItems.push(group)
    } else {
      const condition = new WidgetModelItem(
        item.condition_id,
        WidgetModelItem.CONDITION,
        [],
        item.column,
        item.item_id,
        item.value
      )

      widgetModelItems.push(condition)
    }
  })

  return widgetModelItems
}

export default class SegmentModule extends createModule({
  namespaced: 'segment',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchFrequencies () {
    try {
      const data = await $axios.$get('/v1/segment/options/frequencies')

      const frequencies = Object.keys(data)
        .map(value => parseInt(value))
        .map(value => new SegmentFrequency(data[value], value))

      return new ActionResult({
        frequencies
      })
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }

  @action
  async fetchSegmentsTableData (payload: { type: DirectoryTypeEnum, tableConfiguration: TableConfiguration }) {
    try {
      const response = await $axios.get('/v1/data/table/segment', {
        params: {
          type: payload.type,
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
  async fetchSegments (payload: { type: DirectoryTypeEnum }): Promise<ActionResult<FetchSegmentsResponse>> {
    try {
      const { items } = await $axios.$get('/v1/data/table/segment', {
        params: {
          type: payload.type,
          all: true
        }
      })

      return new ActionResult({
        items
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async fetchSegment (id: number): Promise<ActionResult<FetchSegmentResponse>> {
    try {
      const data = await $axios.$get(`/v1/segment/nomenclature/${id}`)

      const segmentConditions = parseConditionsToConditionsWidgetModel(data.conditions)
      const conditionsWidgetModel = new ConditionsWidgetModel(segmentConditions)

      const segment = new Segment({
        id: data.id,
        name: data.name,
        conditions: conditionsWidgetModel
      })

      return new ActionResult({
        segment
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }
}
