<template>
  <v-autocomplete
      v-model="type"
      :items="items"
      :error-messages="errorMessages"
      :hide-details="!errorMessages.length"
      :loading="isLoading"
      label="Тип скидки"
      clearable
      outlined
  />
</template>

<script lang="ts">
import { Component, mixins, Prop, VModel } from 'nuxt-property-decorator'

import ISelectItem from '~/core/interfaces/ISelectItem'
import { vxm } from '~/store'
import LoadingMixin from '~/core/mixins/LoadingMixin'

@Component
export default class DiscountTypeSelect extends mixins(LoadingMixin) {
  @VModel({ type: String, default: null }) type!: string
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: ISelectItem[] = []

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => vxm.discount.discountType.fetchTypes())

    if (result.isSuccess) {
      this.items = result.data!.types as ISelectItem[]
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
