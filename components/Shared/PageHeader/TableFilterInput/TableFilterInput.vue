<template>
  <div class="input">
    <el-popover
      v-model="isFilterPopoverOpen"
      placement="bottom-start"
      width="672"
      popper-class="topbar__filter-popover"
    >
      <filter-popover
        :table-configuration="tableConfiguration"
        :is-open.sync="isFilterPopoverOpen"
        @filter-count-changed="changeFilterCount"
      />
      <el-input
        slot="reference"
        ref="a"
        v-model="search"
        placeholder="Фильтр + поиск"
        prefix-icon="el-icon-search"
      >
        <div slot="prepend">
          <el-tag v-if="activeFilters.length" closable disable-transitions @close="resetFilterValue">
            {{ filterTagName }}
          </el-tag>
        </div>
      </el-input>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import FilterPopover from '~/components/Shared/PageHeader/TableFilterInput/FilterPopover.vue'
import TableFilter from '~/core/models/Table/TableFilter'

@Component({ components: { FilterPopover } })
export default class TableFilterInput extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration

  activeFilters: Array<TableFilter> = []
  isFilterPopoverOpen: boolean = false
  search: string = ''

  get filterTagName ():string {
    return this.activeFilters.length === 1 ? this.activeFilters[0].label : `Фильтры - ${this.activeFilters.length}`
  }

  changeFilterCount () {
    this.activeFilters = this.tableConfiguration.filters.filter(item => !!item.value)
  }

  resetFilterValue () {
    this.tableConfiguration.filters.forEach((item) => {
      item.value = undefined
    })
    this.activeFilters = []
    this.tableConfiguration.fetchItems()
  }
}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'
.topbar__filter-popover
  padding: 0
  border-color: #E4E4E4
  min-height: 244px
  .popper__arrow
    left: 50px!important
.input
  width: 100%
  .el-input
    background-color: #F2F2F2
    border-radius: 4px
    &__inner
      background-color: transparent
      border: 0
      padding-left: 30px
      &::-moz-placeholder
        color: #909399
      &::-webkit-input-placeholder
        color: #909399
      &::-ms-input-placeholder
        color: #909399
      &::placeholder
        color: #909399
    &-group
      .el-input__prefix
        left: -4px
      &__prepend
        background-color: transparent
        border: 0
        padding: 0 10px
        .el-tag
          color: $blue
          font-size: 14px
          margin-right: 5px
          .el-tag__close
            color: #797979
            padding-right: 1px
            &:hover
              color: $white
    &+.topbar__profile
      margin-left: 15px
</style>
