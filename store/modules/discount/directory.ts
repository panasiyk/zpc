import { action, createModule } from 'vuex-class-component'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import ISelectItem from '~/core/interfaces/ISelectItem'

export interface CheckingAreasResponse {
  items?: ISelectItem[]
}

export default class DirectoryModule extends createModule({
  namespaced: 'directory',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchCheckingAreas (): Promise<ActionResult<CheckingAreasResponse>> {
    try {
      const data = await $axios.$get('/v1/discount/options/spaces')

      const items: ISelectItem[] = Object.keys(data).map((id: string) => ({
        value: parseInt(id),
        text: data[id]
      }))

      return new ActionResult({
        items
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }
}
