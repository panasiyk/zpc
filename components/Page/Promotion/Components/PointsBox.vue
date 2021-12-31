<template>
  <box-with-checkboxes
      v-model="selectedItems"
      :items="items"
      title="Магазины"
      inner-title="Название магазина"
  />
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
  @Prop({ type: Array, default: () => [] }) cities!: IWithIdAndLabel[]

  items: IWithIdAndLabel[] = []

  @Watch('cities')
  onCitiesChange () {
    this.fetchItems()
  }

  async fetchItems () {
    this.items = []

    if (!this.cities.length) {
      return
    }

    const results: Array<ActionResult<IFetchItemsResponse>> = await this.wrapLoading(() => Promise.all(
        this.cities.map(city => vxm.location.fetchStores(city.id))
    ))

    const errorMessages: string[] = []

    results.forEach((result) => {
      if (result.isSuccess) {
        this.items = this.items.concat(result.data!.items as IWithIdAndLabel[])
      } else {
        const region = this.cities.find(({ id }) => id === result.data?.searchId)

        errorMessages.push(`Не удалось загрузить города для города ${region?.label}`)
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
