<template>
  <v-data-table
      v-model="_selectedRows"
      :items="tableConfiguration.items"
      :headers="tableConfiguration.displayingColumns"
      :options.sync="options"
      :loading="isLoading"
      :disable-sort="tableConfiguration.disableLocalSorting"
      :show-select="showSelect"
      class="data-table"
      disable-pagination
      hide-default-footer
      @click:row="$emit('click:row', $event)"
  >
    <template v-for="column in tableConfiguration.displayingColumns" v-slot:[`header.${column.value}`]="{header}">
      <table-header-cell
          :key="column.value"
          :table-configuration="tableConfiguration"
          :header="header"
          @change-sorting="onSortChange"
      />
    </template>
    <template v-slot:footer>
      <table-footer
          :table-configuration="tableConfiguration"
          :is-loading="isLoading"
          @change-page="onPageChange"
      >
        <template v-slot:footer:inner-prepend>
          <slot name="footer:inner-prepend" />
        </template>
      </table-footer>
    </template>
    <template #no-data>
      <slot name="no-data" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from 'nuxt-property-decorator'
import { DataOptions } from 'vuetify/types'

import SortingDirectionEnum from '~/core/enums/SortingDirectionEnum'
import TableFooter from '~/components/Shared/DataTable/TableFooter.vue'
import TableHeaderCell from '~/components/Shared/DataTable/TableHeaderCell.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'

@Component({
  components: { TableHeaderCell, TableFooter }
})
export default class DataTable extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
  @Prop({ type: Boolean, default: false }) isLoading!: boolean
  @Prop({ type: Boolean, default: false }) showSelect!: boolean
  @PropSync('selectedRows', { type: Array, default: () => [] }) _selectedRows!: []

  options: Partial<DataOptions> = {
    sortBy: [this.tableConfiguration.sorting.field],
    sortDesc: [true]
  }

  onSortChange ({ field, direction }: { field: string, direction: SortingDirectionEnum }) {
    this.tableConfiguration.sorting.setSorting(field, direction)
    this.$emit('change-sorting', { field, direction })

    this.options.sortBy = [field]
    this.options.sortDesc![0] = direction === SortingDirectionEnum.descending
  }

  onPageChange () {
    this.tableConfiguration.fetchItems()
  }
}
</script>

<style scoped>

</style>
