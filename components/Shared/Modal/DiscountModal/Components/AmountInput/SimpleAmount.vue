<template>
  <v-text-field
      v-model.number="amount"
      :error-messages="errorMessages"
      :hide-details="!errorMessages.length"
      :label="label"
      type="number"
      outlined
  />
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'

@Component
export default class SimpleAmount extends Vue {
  @VModel({ type: [Number, String], default: 0 }) amount!: number | string
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]
  @Prop({ type: String, default: '' }) label!: string
}
</script>

<style scoped>

</style>
