<template>
  <div class="page">
    <page-header :table-configuration="tableConfiguration" page-name="Скидки" table-filter btn-back>
      <el-dropdown split-button type="primary" class="topbar__create-discount">
        <span @click="createDiscount">Создать скидку</span>
        <el-dropdown-menu slot="dropdown" class="topbar__btns-dropdown">
          <el-dropdown-item @click="createFolder">
            Создать папку
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </page-header>

    <page-content>
      <div class="content-block">
        <span class="create-action__title">Выберите скидку</span>
        <div class="table">
          <new-data-table
            v-loading="isLoading"
            :selected-rows.sync="selectedRows"
            :table-configuration="tableConfiguration"
            page-name="Элементов"
            @change-sorting="fetchData"
            @change-page="fetchData"
          >
            <template #terms="{ item }">
              <el-tag v-if="item" type="info" class="table-actions__date">
              {{ item }}
            </el-tag>
            </template>
            <template #active="{ item }">
              {{ item ? 'Активна' : 'Неактивна' }}
            </template>
            <template #footerControlButtons>
              <div class="table-actions__buttons">
                <el-button type="primary" :disabled="!selectedRows.length" @click="applySegment">
                  Применить скидку (-и)
                </el-button>
                <el-button plain class="el-button--default" @click="$router.back()">
                  Отмена<i class="el-icon-close el-icon-right" />
                </el-button>
              </div>
            </template>
          </new-data-table>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'
import NewDataTable from '~/components/NewShared/DataTable/DataTable.vue'
import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'
import DirectoryTypeSelect from '~/components/Shared/DirectoryTypeSelect.vue'
import { vxm } from '~/store'
import { Segment } from '~/core/interfaces/Segment'
import TableColumn from '~/core/models/Table/TableColumn'

@Component({ name: 'Discount', components: { DirectoryTypeSelect, PageHeader, NewDataTable, DataTable, PageContent } })
export default class Discount extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('promotions', '/v1/data/table/campaign')
  directoryType: string | null = null
  selectedRows:Array<Segment> = []

  mounted () {
    // await this.fetchData()
    this.prepareDataToMockup()
    this.tableConfiguration.setColumnStyleConfig({
      id: { width: 60 },
      name: { classList: 'no-wrap table-actions__name' },
      dateCreation: { tag: true, width: 150 },
      terms: { tag: true, width: 170 },
      rule: { tag: true, width: 170 },
      active: { width: 125 },
      type: { tag: true, width: 180 }
    })
  }

  prepareDataToMockup () {
    this.tableConfiguration.columns = [
      new TableColumn().fromTextValue('Название скидки', 'name'),
      new TableColumn().fromTextValue('Дата создания', 'dateCreation'),
      new TableColumn().fromTextValue('Условия предоставления', 'terms'),
      new TableColumn().fromTextValue('Используемое правило (группа)', 'rule'),
      new TableColumn().fromTextValue('Активность', 'active'),
      new TableColumn().fromTextValue('Тип скидки', 'type'),
      new TableColumn().fromTextValue('ID', 'id')
    ]
    this.tableConfiguration.selectedColumns = this.tableConfiguration.columns.map(item => item.value)
    this.tableConfiguration.items = [
      {
        name: 'Скидка 200 рублей',
        dateCreation: '12.11.2020',
        terms: 'Не полночь',
        rule: 'Минимум',
        active: true,
        type: 'Подарок',
        id: 12
      },
      {
        name: 'Дискаунт',
        dateCreation: '12.11.2020',
        terms: 'На сумму от 2000р',
        rule: 'Сложение',
        active: true,
        type: 'Скидка суммой',
        id: 365
      },
      {
        name: '10% на все',
        dateCreation: '08.10.2020',
        terms: '',
        rule: 'Вытеснение',
        active: false,
        type: 'Начисление бонусов',
        id: 9087
      },
      {
        name: 'Новогодняя распродажа',
        dateCreation: '12.12.2020',
        terms: '',
        rule: 'Выбор',
        active: false,
        type: 'Подарок',
        id: 123
      }
    ]
  }

  async fetchData () {
    // const result = await this.wrapLoading(() => this.tableConfiguration.fetchItems())
    //
    // if (!result.isSuccess) {
    //   alert(result.errorMessage)
    // }
  }

  applySegment () {
    vxm.promotion.addSelectedDiscount(this.selectedRows)
    this.$router.back()
  }

  createDiscount () {
    // this.$router.push({ name: 'discount-create' })
  }

  createFolder () {
    // this.$router.push({ name: 'discount-create-folder' })
  }
}
</script>
<style scoped lang="sass">

.create-action__title
  padding-bottom: 0
.topbar__create-discount
  margin-left: 105px
.content-block
  padding: 16px 24px 24px 21px
</style>
