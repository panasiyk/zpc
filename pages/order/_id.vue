<template>
  <div class="page">
    <order-details-page-header :title="title" />

    <page-content>
      <order-details :order="order" :is-loading="isLoading" class="mb-2" />
      <v-card :loading="isLoading">
        <v-card-title>
          Товары заказ
        </v-card-title>
        <data-table v-if="order" :table-configuration="order.productsDataTableConfiguration" />
      </v-card>
    </page-content>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import OrderDetailsPageHeader from '~/components/Page/Order/OrderDetailsPageHeader.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import OrderDetails from '~/components/Page/Order/OrderDetails.vue'
import Order from '~/core/models/Order'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import { vxm } from '~/store'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'

@Component({
  components: {
    DataTable,
    OrderDetails,
    PageContent,
    OrderDetailsPageHeader
  },
  head () {
    return {
      title: (this as OrderIdPage).title
    }
  }
})
export default class OrderIdPage extends mixins(LoadingMixin) {
  order: Order | null = null

  get title (): string {
    return `Заказ - ${this.$route.params.id}`
  }

  mounted () {
    this.fetchData()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => vxm.order.fetchOrderDetails(parseInt(this.$route.params.id)))

    if (result.isSuccess) {
      this.order = result.data.order
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
