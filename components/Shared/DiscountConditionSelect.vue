<template>
  <v-autocomplete
      v-model="condition"
      :items="items"
      :multiple="multiple"
      :error-messages="errorMessages"
      :hide-details="!errorMessages.length"
      :label="label"
      :loading="isLoading"
      chips
      deletable-chips
      outlined
      clearable
  />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel } from 'nuxt-property-decorator'

import { vxm } from '~/store'
import ISelectItem from '~/core/interfaces/ISelectItem'
import LoadingMixin from '~/core/mixins/LoadingMixin'

@Component
export default class DiscountConditionSelect extends mixins(LoadingMixin) {
  @VModel({ type: [Array, Object], default: null }) condition!: number[] | number | null
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]
  @Prop({ type: Boolean, default: false }) multiple!: boolean
  @Prop({ type: String, default: 'Условие предоставления' }) label!: string

  items: ISelectItem[] = []

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => vxm.discount.source.fetchConditions())

    if (result.isSuccess) {
      this.items = result.data!.conditions!.map((item: any) => ({
        text: item.name,
        value: item.id
      }))
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
