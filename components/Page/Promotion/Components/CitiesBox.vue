<template>
  <box-with-checkboxes v-model="selectedItems" :items="items" title="Города" inner-title="Название города" />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel, Watch } from 'nuxt-property-decorator'

import LoadingMixin from '~/core/mixins/LoadingMixin'
import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'
import { vxm } from '~/store'
import BoxWithCheckboxes
  from '~/components/Page/Promotion/Components/BoxWithCheckboxes.vue'
import ActionResult from '~/core/models/ActionResult'
import { IFetchItemsResponse } from '~/store/modules/location'

@Component({
  components: { BoxWithCheckboxes }
})
export default class RegionsBox extends mixins(LoadingMixin) {
  @VModel({ type: Array, default: () => [] }) selectedItems!: IWithIdAndLabel[]
  @Prop({ type: Array, default: () => [] }) regions!: IWithIdAndLabel[]

  items: IWithIdAndLabel[] = []

  @Watch('regions')
  onRegionsChange () {
    this.fetchItems()
  }

  async fetchItems () {
    this.items = []

    if (!this.regions.length) {
      return
    }

    const results: ActionResult<IFetchItemsResponse>[] = await this.wrapLoading(() => Promise.all(
        this.regions.map(region => vxm.location.fetchCities(region.id))
    ))

    const errorMessages: string[] = []

    results.forEach((result) => {
      if (result.isSuccess) {
        this.items = this.items.concat(result.data!.items as IWithIdAndLabel[])
      } else {
        const region = this.regions.find(({ id }) => id === result.data?.searchId)

        errorMessages.push(`Не удалось загрузить города для региона ${region?.label}`)
      }
    })

    errorMessages.forEach((message: string) => {
      alert(message)
    })
  }
}
</script>

<style scoped>

</style>
