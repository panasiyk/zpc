<template>
  <v-pagination
      v-model="tableData.pagination.currentPage"
      :length="tableData.pagination.totalPages"
      :disabled="isLoading"
      total-visible="7"
      @input="$emit('change-page', $event)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import TableConfiguration from '~/core/models/Table/TableConfiguration'

@Component
export default class Pagination extends Vue {
  @Prop({ type: Object, required: true }) tableData!: TableConfiguration
  @Prop({ type: Boolean, default: false }) isLoading!: boolean
}
</script>

<style scoped>

</style>
