<template>
    <div class="topbar__filter-popover-content">
      <div class="topbar__filter-popover-menu">
        <ul>
          <li v-for="filter in tableConfiguration.filters" :key="filter.field" @click="selectedFilter = filter">
            <a class="topbar__filter-popover-menu-item" :class="{ 'topbar__filter-popover-menu-item--picked': filter.field === selectedFilter.field }">
              {{ filter.label }} </a>
          </li>
        </ul>
      </div>
      <div class="topbar__filter-popover-picker">
        <div class="topbar__filter-popover-picker-left">
          <Datepicker
            v-if="isDate"
            :language="lang"
            inline
            monday-first
            :value="selectedFilter.value"
            @selected="dataSelected"
            />
          <template v-else-if="showInput">
            <div class="segmentsAndPoints" style="padding-bottom: 10px">
              {{ `Введите ${selectedFilter.label} для поиска` }}
            </div>
            <el-input v-model="selectedFilter.value" />
          </template>
          <tags-filter v-else />
        </div>
        <div class="topbar__filter-popover-picker-right">
          <div>
            <div class="segmentsAndPoints">
              Показывать точки продаж
            </div>
            <div>
              <el-checkbox
                v-for="column in segmentsAndPointsCheckBox"
                :key="column.value"
                :label="column.value"
              >
                {{ column.text }}
              </el-checkbox>
            </div>
          </div>
          <el-switch v-model="showCompletedActions" inactive-text="Показывать завершённые акции" />
          <el-button type="primary" @click="apply">
            Применить
          </el-button>
          <el-button type="text" @click="resetFilterValue">
            Сбросить
          </el-button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Datepicker from 'vuejs-datepicker'
import { ru } from 'vuejs-datepicker/dist/locale'
import { PropSync, Watch, Component, Prop, Vue } from 'nuxt-property-decorator'
import TagsFilter from './TagsFilter.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import TableFilter from '~/core/models/Table/TableFilter'
import TableFilterTypeEnum from '~/core/enums/TableFilterTypeEnum'

@Component({ name: 'FilterPopover', components: { TagsFilter, Datepicker } })
export default class FilterPopover extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
  @PropSync('isOpen', { required: true }) _isOpen!: boolean

  lang = ru
  showCompletedActions: boolean = false
  selectedFilter: TableFilter | null = null

  dataSelected (date:Date) {
    (this.selectedFilter as TableFilter).value = date.toISOString().substring(0, 10)
  }

  get segmentsAndPointsCheckBox () {
    return [
      { value: 'all', text: 'Все' },
      { value: 'new', text: 'Новые' }
    ]
  }

  get valueComponent () {
    const map: { [key: string]: any } = {
    }
    return map[this.selectedFilter?.type as string]
  }

  get isDate () {
    return this.selectedFilter?.type === TableFilterTypeEnum.date
  }

  get showInput () {
    return this.selectedFilter?.type === TableFilterTypeEnum.integer || this.selectedFilter?.type === TableFilterTypeEnum.string
  }

  resetFilterValue () {
    if (this.selectedFilter) {
      this.selectedFilter.value = undefined
      this.$emit('filter-count-changed')
      this.tableConfiguration.fetchItems()
    }
  }

  apply () {
    this.$emit('filter-count-changed')
    this.tableConfiguration.fetchItems()
    this._isOpen = false
  }

  @Watch('tableConfiguration.filters')
  onFiltersFetched () {
    this.selectedFilter = this.tableConfiguration.filters[0]
  }
}
</script>
<style lang="sass">
@import 'assets/new-design/sass/vars'
.topbar__filter-popover
  &-content
    display: flex
    height: 100%
  &-menu
    width: 195px
    background-color: rgba(216, 219, 225, .1)
    border-right: 1px solid #E4E4E4
    padding: 10px 26px 10px 23px
    ul
      list-style-type: none
      padding: 0
      li
        &:last-of-type
          .topbar__filter-popover-menu-item
            border-bottom: 0
        a
          cursor: pointer
    &-item
      font-size: 13px
      padding: 7px 0 8px 0
      border-bottom: 1px solid rgba(0, 0, 0, .1)
      display: block
      text-decoration: none
      color: $black
      &--picked,
      &:hover
        color: $blue
  &-picker
    display: flex
    &-left
      padding: 11px 20px
      width: 242px
      .vdp-datepicker
        &__calendar
          width: 202px
          border-color: #e4e7ed
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
          border-radius: 4px
        header
          line-height: 31px
          .day__month_btn
            font-size: 11px
            position: relative
          .up:not(.disabled):hover
            background: transparent
            color: $blue
          .prev,
          .next
            font-size: 0
            &:before
              font-family: element-icons, serif !important
              font-size: 12px
              position: absolute
              top: 0
              display: block
              width: 100%
              text-indent: 0
            &:after
              display: none
            &:hover
              background: transparent!important
              &:before
                color: $blue
          .prev
            &:before
              content: "\e6de"
          .next
            &:before
              content: "\e6e0"
          &+div
            padding: 0 12px 4px
        .cell
          &.day
            font-size: 10px
            height: 25px
            line-height: 23px
            width: 25px
          &.day-header
            font-size: 8px
            width: 25px
            border-bottom: 1px solid #ebeef5
            height: 33px
            margin-bottom: 3px
          &.today
            color: $blue
            font-weight: 700
          &:not(.blank):not(.disabled)
            &.day:hover,
            &.month:hover,
            &.year:hover
              color: $blue
              border-color: transparent
          &.selected
            background-color: $blue
            height: 25px
            border-radius: 50%
            color: $white
            &:hover
              background-color: $blue
              color: $white!important
          &.month,
          &.year
            font-size: 11px
            &.selected
              background: transparent
              color: $blue
              font-weight: 700
              height: 33px
              &:hover
                color: $blue!important
    &-right
      padding-left: 21px
      width: 233px
      .segmentsAndPoints
        padding-top: 11px
        color: $black
        font-size: 13px
      .el-switch
        display: block
        margin-top: 35px
        &__label
          display: block
          &--left
            margin-right: 0
          *
            font-size: 13px
            padding-right: 0
            width: 160px
            text-align: left
        &__core
          width: 50px!important
          margin-top: 21px
      .el-button
        margin-top: 105px
        font-size: 10px
        font-weight: 700
        padding: 9px 20px
        &--text
          color: #797979
          margin-left: 0
          &:hover
            color: $blue
      .el-checkbox
        padding-top: 10px
        span
          font-size: 11px
          color: $black
</style>
