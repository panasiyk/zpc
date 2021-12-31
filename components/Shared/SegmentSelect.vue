<template>
  <v-autocomplete
      v-model="segment"
      :items="items"
      :search-input.sync="query"
      :loading="isLoading"
      :multiple="multiple"
      :error-messages="errorMessages"
      :hide-details="!errorMessages.length"
      :label="label"
      item-value="id"
      item-text="name"
      outlined
      chips
      deletable-chips
      clearable
  />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel } from 'nuxt-property-decorator'

import DirectoryTypeEnum from '../../core/enums/DirectoryTypeEnum'
import LoadingMixin from '../../core/mixins/LoadingMixin'
import { vxm } from '~/store'

@Component
export default class SegmentSelect extends mixins(LoadingMixin) {
  @VModel({ type: [Number, Array], default: null }) segment!: null | number | number[]
  @Prop({ type: String, required: true }) directoryType!: DirectoryTypeEnum
  @Prop({ type: Boolean, default: false }) multiple!: boolean
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]
  @Prop({ type: String, default: 'Сегмент' }) label!: string

  query = ''
  items: any[] = []

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await vxm.segment.fetchSegments({ type: this.directoryType })

    if (result.isSuccess) {
      this.items = result.data!.items as any[]
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
