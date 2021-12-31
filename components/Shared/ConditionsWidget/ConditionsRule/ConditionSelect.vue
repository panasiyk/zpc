<template>
  <v-select
      v-model="selectedCondition"
      :items="items"
      item-value="id"
      item-text="title"
      label="Условие"
      dense
      outlined
  />
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from 'nuxt-property-decorator'

import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'

@Component
export default class ConditionSelect extends Vue {
  @VModel({ type: Number, default: null }) selectedCondition!: number | null
  @Prop({ type: Array, default: () => [] }) items!: IWithIdAndLabel
}
</script>

<style scoped>

</style>
