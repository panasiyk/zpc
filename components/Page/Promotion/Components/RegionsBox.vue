<template>
  <box-with-checkboxes
      v-model="selectedItems"
      :items="items"
      title="Регионы"
      inner-title="Название региона"
  />
</template>

<script lang="ts">
import { Component, mixins, VModel } from 'nuxt-property-decorator'

import LoadingMixin from '~/core/mixins/LoadingMixin'
import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'
import { vxm } from '~/store'
import BoxWithCheckboxes
  from '~/components/Page/Promotion/Components/BoxWithCheckboxes.vue'

@Component({
  components: { BoxWithCheckboxes }
})
export default class RegionsBox extends mixins(LoadingMixin) {
  @VModel({ type: Array, default: () => [] }) selectedItems!: IWithIdAndLabel[]

  items: IWithIdAndLabel[] = []

  mounted () {
    this.fetchItems()
  }

  async fetchItems () {
    const result = await this.wrapLoading(() => vxm.location.fetchRegions())

    if (result.isSuccess) {
      this.items = result.data.items
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
