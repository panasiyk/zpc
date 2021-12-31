<template>
  <div class="data-table--header-cell">
    <div class="label">
      {{ header.text }}
    </div>
    <v-btn :class="{'is-current': isCurrentSorting}" class="sorting" icon x-small @click="changeSort">
      <v-icon>
        {{ iconLabel }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { DataTableHeader } from 'vuetify/types'

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import SortingDirectionEnum from '~/core/enums/SortingDirectionEnum'

@Component
export default class TableHeaderCell extends Vue {
  @Prop({ type: Object, required: true }) header!: DataTableHeader
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration

  get isCurrentSorting () {
    return this.tableConfiguration.sorting.field === this.header.value
  }

  get isAsc () {
    return this.tableConfiguration.sorting.direction === SortingDirectionEnum.ascending
  }

  get isDesc () {
    return this.tableConfiguration.sorting.direction === SortingDirectionEnum.descending
  }

  get iconLabel () {
    if (this.isCurrentSorting) {
      return this.isAsc ? 'mdi-arrow-up' : 'mdi-arrow-down'
    }

    return 'mdi-arrow-up'
  }

  changeSort () {
    let newDirection = SortingDirectionEnum.ascending

    if (this.isCurrentSorting) {
      newDirection = this.isAsc ? SortingDirectionEnum.descending : SortingDirectionEnum.ascending
    } else {
      newDirection = SortingDirectionEnum.ascending
    }

    this.$emit('change-sorting', { field: this.header.value, direction: newDirection })
  }
}
</script>

<style scoped>

</style>
