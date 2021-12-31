<template>
  <div class="page">
    <report-discount-page-header />

    <page-content>
      <v-card>
        <data-table
            :table-configuration="tableConfiguration"
            :is-loading="isLoading"
            @change-sorting="fetchData"
            @change-page="fetchData"
        />
      </v-card>
    </page-content>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import ReportDiscountPageHeader from '~/components/Page/Report/ReportDiscountPageHeader.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import LoadingMixin from '~/core/mixins/LoadingMixin'

@Component({
  components: { DataTable, PageContent, ReportDiscountPageHeader },
  head: {
    title: 'Отчёт о скидках'
  }
})
export default class ReportDiscountPage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('discountsReport', '/v1/data/table/report')

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => this.tableConfiguration.fetchItems())

    if (!result.isSuccess) {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
