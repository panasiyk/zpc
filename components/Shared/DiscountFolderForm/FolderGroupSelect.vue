<template>
  <v-select
      v-model="group"
      :items="items"
      :loading="isLoading"
      :error-messages="errorMessages"
      label="Группа"
      outlined
  />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel } from 'nuxt-property-decorator'

import SelectItem from '~/core/models/SelectItem'
import { vxm } from '~/store'
import LoadingMixin from '~/core/mixins/LoadingMixin'

@Component
export default class FolderGroupSelect extends mixins(LoadingMixin) {
  @VModel({ type: Number, default: null }) group!: number | null
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: SelectItem[] = []

  mounted () {
    this.fetchItems()
  }

  async fetchItems () {
    const result = await this.wrapLoading(() => vxm.discount.folder.fetchFolderGroups())

    if (result.isSuccess) {
      this.items = result.data?.groups as SelectItem[]
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
