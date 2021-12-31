<template>
  <v-select v-model="area" :items="items" :error-messages="errorMessages" label="Область ограничения" outlined />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel } from 'nuxt-property-decorator'

import LoadingMixin from '../../../core/mixins/LoadingMixin'
import SelectItem from '../../../core/models/SelectItem'
import { vxm } from '~/store'

@Component
export default class FolderRestrictionAreaSelect extends mixins(LoadingMixin) {
  @VModel({ type: Number, default: null }) area!: number | null
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: SelectItem[] = []

  mounted () {
    this.fetchItems()
  }

  async fetchItems () {
    const result = await this.wrapLoading(() => vxm.discount.folder.fetchFolderRestrictionAreas())

    if (result.isSuccess) {
      this.items = result.data.areas as SelectItem[]
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
