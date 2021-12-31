<template>
  <v-select
      v-model="selectedFilter"
      :items="filters"
      item-value="name"
      item-text="title"
      label="Фильтр"
      outlined
      dense
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

import Filter from '~/core/models/ConditionsWidget/Filter'

@Component
export default class FilterSelect extends Vue {
  @VModel({ type: String, default: null }) selectedFilter!: string | null
  @Prop({ type: Array, default: () => [] }) filters!: Filter[]
}
</script>

<style scoped>

</style>
