<template>
  <div class="page">
    <recommendation-page-header :table-configuration="tableConfiguration" />

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

import RecommendationPageHeader from '~/components/Page/Discount/RecommendationPageHeader.vue'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'

@Component({
  components: { RecommendationPageHeader, PageContent, DataTable }
})
export default class RecommendationPage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('recommendations', '/v1/data/table/recommendation')

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
