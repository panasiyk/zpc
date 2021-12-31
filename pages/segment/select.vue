<template>
  <div class="page">
    <page-header :table-configuration="tableConfiguration" page-name="Сегментирование" table-filter btn-back>
      <el-button type="primary" icon="el-icon-plus" @click="onClick">
        Создать сегмент
      </el-button>
    </page-header>

    <page-content>
      <div class="content-block">
        <directory-type-select :value="directoryType" @input="onDirectoryTypeChange" />
        <div v-if="directoryType" class="table">
          <new-data-table
            :selected-rows.sync="selectedRows"
            :table-configuration="tableConfiguration"
            page-name="Элементов"
            @change-sorting="fetchData"
            @change-page="fetchData"
          >
            <template #footerControlButtons>
              <div class="table-actions__buttons">
                <el-button type="primary" :disabled="!selectedRows.length" @click="applySegment">
                  Применить сегмент (ы)
                </el-button>
                <el-button plain @click="$router.back()">
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
import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'
import { vxm } from '~/store'
import { Segment } from '~/core/interfaces/Segment'

@Component({ name: 'SelectSegment', components: { DirectoryTypeSelect, PageHeader, NewDataTable, DataTable, PageContent } })
export default class SelectSegment extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('selectSegments', '/v1/data/table/segment')
  directoryType: string | null = null
  selectedRows:Array<Segment> = []

  applySegment () {
    vxm.promotion.addSelectedSegment(this.selectedRows)
    this.$router.back()
  }

  async onDirectoryTypeChange (selectedValue:DirectoryTypeEnum) {
    this.tableConfiguration.additionalRequestParams = { type: selectedValue }
    await this.fetchData()
    this.directoryType = selectedValue
  }

  async fetchData () {
    const result = await this.wrapLoading(() => this.tableConfiguration.fetchItems())

    if (!result.isSuccess) {
      alert(result.errorMessage)
    } else {
      this.tableConfiguration.setColumnStyleConfig({
        id: { width: 60 },
        name: { classList: 'no-wrap table-actions__name' },
        created_at: { tag: true },
        updated_at: { tag: true }
      })
    }
  }

  onClick () {
    // this.$router.push({ name: 'promotion-creating-settings' })
  }
}
</script>
<style scoped lang="sass">
.table
  margin-top: 20px
.content-block
  padding: 16px 24px 24px 21px
</style>
