import { action, createModule } from 'vuex-class-component'
import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'

export interface IFetchItemsResponse {
  items?: IWithIdAndLabel[]
  searchId?: number
}

function parseToItems (data: any[]): IWithIdAndLabel[] {
  return data.map(datum => ({
    id: datum.id,
    label: datum.name
  }))
}

export default class LocationModule extends createModule({
  namespaced: 'location',
  target: 'nuxt',
  strict: false
}) {
  @action
  async fetchRegions (): Promise<ActionResult<IFetchItemsResponse>> {
    try {
      const responseData = await $axios.$get('/v1/data/points/regions')

      return new ActionResult({
        items: parseToItems(responseData)
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async fetchCities (regionId: number): Promise<ActionResult<IFetchItemsResponse>> {
    try {
      const responseData = await $axios.$get('/v1/data/points/cities', {
        params: {
          region_id: regionId
        }
      })

      return new ActionResult({
        items: parseToItems(responseData)
      })
    } catch (e) {
      return new ActionResult({
        searchId: regionId
      }, e)
    }
  }

  @action
  async fetchStores (cityId: number): Promise<ActionResult<IFetchItemsResponse>> {
    try {
      const responseData = await $axios.$get('/v1/data/points', {
        params: {
          city_id: cityId
        }
      })

      return new ActionResult({
        items: parseToItems(responseData)
      })
    } catch (e) {
      return new ActionResult({
        searchId: cityId
      }, e)
    }
  }
}
