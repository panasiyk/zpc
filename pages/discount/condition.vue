<template>
  <div class="page">
    <condition-page-header :table-configuration="tableConfiguration" />

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

import LoadingMixin from '~/core/mixins/LoadingMixin'
import ConditionPageHeader from '~/components/Page/Discount/ConditionPageHeader.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'

@Component({
  components: { PageContent, ConditionPageHeader, DataTable }
})
export default class ConditionPage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('conditions', '/v1/data/table/source')

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
