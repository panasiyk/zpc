<template>
  <v-select
      v-model="type"
      :items="items"
      :loading="isLoading"
      :error-messages="errorMessages"
      label="Тип ограничения"
      outlined
  />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel } from 'nuxt-property-decorator'

import LoadingMixin from '../../../core/mixins/LoadingMixin'
import SelectItem from '../../../core/models/SelectItem'
import { vxm } from '~/store'

@Component
export default class FolderRestrictionTypeSelect extends mixins(LoadingMixin) {
  @VModel({ type: Number, default: null }) type!: number | null
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: SelectItem[] = []

  mounted () {
    this.fetchItems()
  }

  async fetchItems () {
    const result = await this.wrapLoading(() => vxm.discount.folder.fetchFolderRestrictionTypes())

    if (result.isSuccess) {
      this.items = result.data.types
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
