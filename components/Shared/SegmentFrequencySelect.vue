<template>
  <v-select
      v-model="frequency"
      label="Частота обновления *"
      :items="items"
      :error-messages="errorMessages"
      item-value="value"
      item-text="label"
      outlined
      return-object
  />
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'
import SegmentFrequency from '~/core/models/SegmentFrequency'
import { vxm } from '~/store'

@Component
export default class SegmentFrequencySelect extends Vue {
  @VModel({ type: Object, default: null }) frequency!: SegmentFrequency | null
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: SegmentFrequency[] = []

  mounted () {
    this.fetchItems()
  }

  async fetchItems () {
    const result = await vxm.segment.fetchFrequencies()

    if (result.isSuccess) {
      this.items = result.data!.frequencies
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
