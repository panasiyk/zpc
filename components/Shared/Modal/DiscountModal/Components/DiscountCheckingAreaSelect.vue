<template>
  <v-select
      v-model="selectedItem"
      :items="items"
      :error-messages="errorMessages"
      :hide-details="!errorMessages.length"
      label="Область проверки"
      outlined
      return-object
      clearable
  />
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from 'nuxt-property-decorator'
import { vxm } from '~/store'
import ISelectItem from '~/core/interfaces/ISelectItem'

@Component
export default class DiscountCheckingAreaSelect extends Vue {
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]
  @VModel({ type: Object, default: null }) selectedItem!: ISelectItem | null

  items: ISelectItem[] = []

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await vxm.discount.directory.fetchCheckingAreas()

    if (result.isSuccess) {
      this.items = result.data!.items as ISelectItem[]
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
