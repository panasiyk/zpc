import { action, createModule } from 'vuex-class-component'
import ActionResult from '~/core/models/ActionResult'
import ISelectItem from '~/core/interfaces/ISelectItem'
import { $axios } from '~/core/utils/api'
import { mapToSelectItems } from '~/core/utils/dataStructureHelper'

export interface FetchTypesResponse {
  types?: ISelectItem[]
}

export default class DiscountType extends createModule({
  namespaced: 'discountType',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchTypes (): Promise<ActionResult<FetchTypesResponse>> {
    try {
      const data = await $axios.$get('/v1/discount/options/types')

      const types = mapToSelectItems(data)

      return new ActionResult({
        types
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }
}
