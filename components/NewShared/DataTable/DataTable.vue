<template>
  <div>
    <el-table
      class="table-actions"
      :data="dataForShowing"
      :default-sort="defaultSorting"
      style="width: 100%"
      @row-click="rowClick"
      @sort-change="onSortChange"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="35" />
      <el-table-column v-if="showOptions" width="31" class-name="table-actions__row-controls">
        <template slot="header">
          <el-popover placement="right-start" width="167" trigger="click" popper-class="table-actions__dropdown">
            <ul class="table-actions__dropdown-menu">
              <li>Закрепить</li>
              <li>Копировать</li>
              <li>Избранное</li>
              <li>Удалить</li>
            </ul>
            <el-button slot="reference" icon="el-icon-more" size="mini" class="table-actions__row-menu" />
          </el-popover>
        </template>
        <el-popover placement="right-start" width="167" trigger="click" popper-class="table-actions__dropdown">
          <ul class="table-actions__dropdown-menu">
            <li>Закрепить</li>
            <li>Копировать</li>
            <li>Избранное</li>
            <li>Удалить</li>
          </ul>
          <el-button slot="reference" icon="el-icon-more" size="mini" class="table-actions__row-menu" />
        </el-popover>
      </el-table-column>

      <el-table-column
          v-for="column in tableConfiguration.displayingColumns"
          :key="column.value"
          :label="column.text"
          :prop="column.value"
          :width="column.style.width"
          :class-name="column.style.classList"
          sortable
      >
        <template slot-scope="scope">
          <slot :name="column.value" :item="scope.row[column.value]">
            <template v-if="!column.style.tag || !scope.row[column.value]">
              {{ scope.row[column.value] }}
            </template>
            <el-tag v-else disable-transitions class="table-actions__date">
              {{ scope.row[column.value] }}
            </el-tag>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <table-footer :items="tableConfiguration.items" :page-name="pageName" :selected-rows="selectedRows" @change="paginationChanged">
      <div class="table-actions__buttons">
        <slot name="footerControlButtons" />
      </div>
    </table-footer>
    <slot name="additionalFooterControlButtons" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import SortingDirectionEnum from '~/core/enums/SortingDirectionEnum'
import TableFooter from '~/components/NewShared/DataTable/TableFooter.vue'

@Component({ components: { TableFooter } })
export default class DataTable extends Vue {
  @PropSync('selectedRows', { type: Array, default: () => [] }) _selectedRows!:Array<Record<string, any>>
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
  @Prop({ type: Boolean, default: false }) isLoading!: boolean
  @Prop({ type: Boolean, default: false }) showSelect!: boolean
  @Prop({ type: Boolean, default: false }) showOptions!: boolean
  @Prop({ type: String, required: true }) pageName!: string

  dataForShowing: Array<Record<string, any>> = []

  get defaultSorting () {
    return {
      prop: this.tableConfiguration.sorting.field,
      order: this.tableConfiguration.sorting.direction
    }
  }

  onSortChange (column: { prop: string, order: SortingDirectionEnum | undefined}) {
    if (column.order) {
      this.tableConfiguration.sorting.setSorting(column.prop, column.order)
      this.$emit('change-sorting')
    }
  }

  onSelectionChange (val:Array<Record<string, any>>) {
    this._selectedRows = val
  }

  rowClick (item: any) {
    this.$emit('click:row', item)
  }

  paginationChanged (items: Array<Record<string, any>>) {
    this.dataForShowing = items
  }
}
</script>
<style scoped lang="sass">
@import 'assets/new-design/sass/vars'
.table-actions
  ::v-deep th
    padding: 12px 0 0
    .cell
      word-break: break-word

  &__row-menu
    transform: rotate(90deg)
    color: #DCDFE6
    font-size: 14px
    transition: color .3s
    cursor: pointer
    border: 0
    background: transparent
    padding: 0
    &:hover,
    &:focus
      background: transparent
  &__controls
    display: flex
    align-items: center
    margin-top: 20px
    margin-bottom: 24px
.el-main--collapsed
  .table-actions__paginator
    width: 52%
</style>
