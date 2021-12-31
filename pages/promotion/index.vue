<template>
  <div class="page">
    <page-header :table-configuration="tableConfiguration" page-name="Акции" table-filter>
      <el-button type="primary" icon="el-icon-plus" @click="onClick">
        Создать акцию
      </el-button>
    </page-header>

    <page-content>
      <div class="content-block">
        <new-data-table
          v-loading="isLoading"
          :table-configuration="tableConfiguration"
          show-options
          :selected-rows.sync="selectedRows"
          page-name="Акции"
          @change-sorting="fetchData"
          @change-page="fetchData"
        >
          <template #date_start="{ item }">
            <el-tag disable-transitions :type="item.expired ? 'danger' : ''" class="table-actions__date">
              {{ item }}
            </el-tag>
          </template>
          <template #date_finish="{ item }">
            <el-tag v-if="item" disable-transitions :type="item ? 'danger' : ''" class="table-actions__date">
              {{ item }}
            </el-tag>
          </template>
          <template #mailing="{ item }">
            {{ item ? 'Отправлена' : 'Не отправлена' }}
          </template>
          <template #stores="{ item }">
            <stores-table-sell-render :item="item" />
          </template>

          <template #footerControlButtons>
            <el-select
              v-model="select"
              popper-class="table-actions__select-dropdown"
              placeholder="Выберите действие"
              :disabled="!selectedRows.length"
            >
              <el-option label="Закрепить" value="Закрепить" />
              <el-option label="Копировать" value="Копировать" />
              <el-option label="Избранное" value="Избранное" />
              <el-option label="Удалить" value="Удалить" />
            </el-select>
            <el-button type="primary" :disabled="!selectedRows.length">
              Применить
            </el-button>
          </template>
        </new-data-table>
      </div>
    </page-content>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'
import NewDataTable from '~/components/NewShared/DataTable/DataTable.vue'
import StoresTableSellRender from '~/components/Page/Promotion/StoresTableSellRender.vue'
import TableColumn from '~/core/models/Table/TableColumn'
import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'

@Component({
  components: { PageHeader, StoresTableSellRender, NewDataTable, DataTable, PageContent }
})
export default class PromotionPage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('promotions', '/v1/data/table/campaign')
  selectedRows:Array<any> = []

  select = null

  onClick () {
    this.$router.push({ name: 'promotion-creating-settings' })
  }

  async mounted () {
    await this.fetchData()
    this.prepareDataToMockup()
    this.tableConfiguration.setColumnStyleConfig({
      id: { width: 60 },
      name: { classList: 'no-wrap table-actions__name' },
      date_start: { width: 136 },
      date_finish: { width: 167 },
      mailing: { width: 141 },
      stores: { width: 240, classList: 'table-actions__stores' }
    })
  }

  prepareDataToMockup () {
    const requiredColumns = ['name', 'date_start', 'date_finish', 'mailing', 'stores', 'id']
    this.tableConfiguration.selectedColumns = [...requiredColumns]
    this.tableConfiguration.columns = [
      ...this.tableConfiguration.columns.filter(column => requiredColumns.includes(column.value)),
      new TableColumn().fromTextValue('Рассылка', 'mailing'),
      new TableColumn().fromTextValue('Точки продаж', 'stores')
    ]
  }

  @Watch('tableConfiguration.items')
  updateList () {
    const mockData = [
      { mailing: false, stores: 'all' },
      { mailing: false, stores: ['Ленина,6', 'Останкино', 'Центральный магазин', 'Кирова', 'Ленина,62', 'Останкинский магазин', 'Центральный магазин0', 'Кирова1'] },
      { mailing: true, stores: ['Кирова 20', 'Ленина,62', 'Останкинский магазин', 'Центральный магазин1', 'Кирова2'] },
      { mailing: true, stores: ['Центральный магазин4', 'Кирова 20', 'Ленина,62', 'Останкинский магазин2', 'Кирова3'] }
    ]
    this.tableConfiguration.items.forEach((item:Object, index:number) => Object.assign(item, mockData[index]))
  }

  async fetchData () {
    const result = await this.wrapLoading(() => this.tableConfiguration.fetchItems())

    if (!result.isSuccess) {
      alert(result.errorMessage)
    }
  }
}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'

.table-actions
  &__buttons
    .el-select
      width: 169px
    .el-input
      padding: 10px 7px
      font-size: 13px
      .el-input__inner
        border-color: $grey
        color: $grey
        height: 37px
        padding: 0 10px
        &::-moz-placeholder
          color: $grey
        &::-webkit-input-placeholder
          color: $grey
        &::-ms-input-placeholder
          color: $grey
        &::placeholder
          color: $grey
      .el-select__caret
        color: $grey
      .el-input__suffix
        right: 10px
      &.is-disabled
        .el-select__caret
          color: #DCDFE6

  &__tag
    margin-right: 5px
    max-width: 165px
    font-size: 14px

  &__date
    font-size: 14px
  &__popup
    &-content
      max-height: 158px
      overflow-y: auto
.content-block
  padding: 0 16px 0 7px
</style>
