<template>
  <v-select
      v-model="roundType"
      :items="items"
      :error-messages="errorMessages"
      :hide-details="!errorMessages.length"
      label="До какого значения округлять *"
      outlined
  />
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'

import ISelectItem from '~/core/interfaces/ISelectItem'

@Component
export default class RoundTypeSelect extends Vue {
  @VModel({ type: Number, default: null }) roundType!: number
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: ISelectItem[] = [
    {
      text: 'До целых',
      value: 1
    },
    {
      text: 'До десятков',
      value: 10
    },
    {
      text: 'До сотен',
      value: 100
    },
    {
      text: 'До тысяч',
      value: 1000
    }
  ]
}
</script>

<style scoped>

</style>
