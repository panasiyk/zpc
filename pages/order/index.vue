<template>
  <div class="page">
    <orders-table-page-header :table-configuration="tableConfiguration" />

    <page-content>
      <v-card>
        <data-table
            :table-configuration="tableConfiguration"
            :is-loading="isLoading"
            @click:row="onRowClick"
            @change-sorting="fetchData"
            @change-page="fetchData"
        />
      </v-card>
    </page-content>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import OrdersTablePageHeader from '~/components/Page/Order/OrdersTablePageHeader.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'
import IWithId from '~/core/interfaces/IWithId'

@Component({
  components: { DataTable, PageContent, OrdersTablePageHeader },
  head: {
    title: 'Заказы'
  }
})
export default class OrderTablePage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('orders', '/v1/data/table/order')

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => this.tableConfiguration.fetchItems())

    if (!result.isSuccess) {
      alert(result.errorMessage)
    }
  }

  onRowClick (row: IWithId) {
    this.$router.push({ name: 'order-id', params: { id: row.id as string } })
  }
}
</script>

<style scoped>

</style>
