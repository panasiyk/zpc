<template>
  <div class="page">
    <page-header :table-configuration="tableConfiguration" page-name="Клиенты" table-filter btn-back />
    <page-content>
      <div class="content-block">
        <new-data-table
          v-loading="isLoading"
          :selected-rows.sync="selectedRows"
          :table-configuration="tableConfiguration"
          page-name="Элементов"
          @change-sorting="fetchData"
          @change-page="fetchData"
        >
          <template #footerControlButtons>
            <div class="table-actions__buttons">
              <el-button type="primary" :disabled="!selectedRows.length" @click="applySegment">
                Применить
              </el-button>
              <el-button plain @click="$router.back()">
                Отмена<i class="el-icon-close el-icon-right" />
              </el-button>
            </div>
          </template>
        </new-data-table>
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
import TableColumn from '~/core/models/Table/TableColumn'

@Component({ name: 'SelectDirectory', components: { DirectoryTypeSelect, PageHeader, NewDataTable, DataTable, PageContent } })
export default class SelectDirectory extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('directoryItems', '/v1/data/table/directory', { type: 'client' })
  directoryType: string | null = null
  selectedRows:Array<any> = []

  async mounted () {
    await this.fetchData()
  }

  applySegment () {
    vxm.directory.addSelectedDirectory(this.selectedRows)
    this.$router.back()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => this.tableConfiguration.fetchItems())

    if (!result.isSuccess) {
      alert(result.errorMessage)
    } else {
      const additionalStyle: Record<string, any> = {
        id: { width: 60 },
        description: { width: null, classList: 'no-wrap table-actions__name' },
        bonuses: { width: 100 },
        created_at: { tag: true },
        updated_at: { tag: true }
      }
      const styles: Record<string, any> = this.tableConfiguration.columns.reduce((prev:Object, current: TableColumn) => {
        return { ...prev, [current.value]: { width: 180, ...(additionalStyle[current.value] ? additionalStyle[current.value] : {}) } }
      }, {})
      this.tableConfiguration.setColumnStyleConfig(styles)
    }
  }
}
</script>
<style scoped lang="sass">
.table
  margin-top: 20px
.content-block
  padding: 16px 24px 24px 21px
</style>
