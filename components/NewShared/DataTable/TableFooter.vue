<template>
  <div class="table-actions__controls">
    <slot />
    <div class="table-actions__counter">
      {{ pageName }}: <span class="table-actions__counter-value">{{ selectedRows.length }} из {{ filteredData.length }}</span>
    </div>
    <div class="table-actions__paginator">
      <el-pagination
        :current-page="currentPage"
        layout="prev, pager, next, sizes"
        :page-sizes="itemsPerPageList"
        :page-size="itemsPerPageCount"
        :pager-count="7"
        popper-class="table-actions__paginator-dropdown"
        :total="items.length"
        @current-change="currentPageChange"
        @size-change="updateItemsPerPage"
/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Watch } from 'nuxt-property-decorator'

@Component({ name: 'TableFooter' })
export default class TableFooter extends Vue {
  @Prop({ default: () => [5, 10, 20, 100] }) itemsPerPageList!: Array<number>;
  @Prop({ required: true }) items!: Array<unknown>;
  @Prop({ required: true }) selectedRows!: Array<unknown>;
  @Prop({ required: true }) pageName!: string;

  filteredData: Array<unknown> = [];
  itemsPerPageCount: number = 0;
  currentPage: number = 1;

  mounted () {
    this.itemsPerPageCount = this.itemsPerPageCount || this.itemsPerPageList[0]
    this.filterData()
  }

  @Watch('items')
  onItemListUpdate () {
    this.filterData()
  }

  updateItemsPerPage (count: number) {
    const newCurrentPage = Math.ceil((this.currentPage * this.itemsPerPageCount) / count)
    const total = Math.ceil(this.items.length / count)
    if (total < newCurrentPage) {
      this.currentPage = Math.ceil(this.items.length / count)
    } else { this.currentPage = this.currentPage !== 1 ? newCurrentPage : 1 }
    this.itemsPerPageCount = count
    this.filterData()
  }

  currentPageChange (newCurrentPage: number) {
    this.currentPage = newCurrentPage
    this.filterData()
  }

  filterData () {
    const start = this.itemsPerPageCount * (this.currentPage - 1)
    this.filteredData = this.items.slice(start, start + this.itemsPerPageCount)
    this.$emit('change', this.filteredData)
  }
}
</script>
<style lang="sass">
@import 'assets/new-design/sass/vars'
.table-actions
  &__paginator
    margin-left: auto
    width: 51%
    .el-pagination
      padding: 0
      display: flex
      &__sizes
        display: inline-block
        margin-left: auto
        margin-right: 0
        &:before
          content: 'Показывать на странице'
          color: $grey
      .el-select
        .el-input
          width: 55px
          margin-right: 0
          margin-left: 14px
          &__inner
            padding-left: 2px
            padding-right: 21px
      .el-pager
        li
          min-width: 32px
      button
        min-width: 31px
    &-dropdown
      .el-select-dropdown
        &__item
          font-size: 12px
          line-height: 25px
          height: 25px
  &__counter
    color: $grey
    font-size: 13px
    margin-left: 37px
    &-value
      display: inline-block
      padding-left: 7px
  &__dropdown
    padding: 5px 0
    &-menu
      list-style-type: none
      padding: 0
      li
        padding: 5px 5px 5px 12px
        font-size: 13px
        color: #666
        cursor: pointer
        &:hover
          background: #F2F2F2
  &__select-dropdown
    margin-top: 0!important
    .el-select-dropdown
      &__item
        font-size: 12px
        line-height: 25px
        height: 25px
    .popper__arrow
      left: 140px!important
</style>
