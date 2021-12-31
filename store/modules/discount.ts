import { action, createModule, createSubModule } from 'vuex-class-component'

import DiscountSourceModule from '~/store/modules/discount/source'
import DirectoryModule from '~/store/modules/discount/directory'
import ActionResult from '~/core/models/ActionResult'
import Discount from '~/core/models/Discount'
import { $axios } from '~/core/utils/api'
import DiscountType from '~/store/modules/discount/discountType'
import TreeModule from '~/store/modules/discount/tree'
import FolderModule from '~/store/modules/discount/folder'

export interface IDiscountResponse {
  discount?: Discount
}

export interface ISaveDiscountPayload {
  discount: Discount
}

export default class DiscountModule extends createModule({
  namespaced: 'discount',
  strict: false,
  target: 'nuxt'
}) {
  source = createSubModule(DiscountSourceModule)
  directory = createSubModule(DirectoryModule)
  discountType = createSubModule(DiscountType)
  tree = createSubModule(TreeModule)
  folder = createSubModule(FolderModule)

  @action
  async fetchDiscount (id: number): Promise<ActionResult<IDiscountResponse>> {
    try {
      const data = await $axios.$get(`/v1/discount/${id}`)

      const discount = new Discount().fromJson(data)

      return new ActionResult({
        discount
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async saveDiscount (payload: ISaveDiscountPayload): Promise<ActionResult<any>> {
    try {
      const path = payload.discount.id ? `/v1/discount/${payload.discount.id}` : '/v1/discount'

      await $axios.$post(path, {
        name: payload.discount.name,
        discount_folder_id: 3,
        space_id: payload.discount.space?.value,
        type_id: payload.discount.type,
        active: payload.discount.isActive,
        amount: payload.discount.value,
        sources: payload.discount.conditions,
        segments: payload.discount.segments,
        folder_id: payload.discount.folderId
      })

      return new ActionResult()
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }
}
