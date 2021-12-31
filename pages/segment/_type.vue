<template>
  <div class="page">
    <segment-page-header :title="pageLabel" :table-configuration="tableConfiguration" />

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

import TableConfiguration from '~/core/models/Table/TableConfiguration'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import SegmentPageHeader from '~/components/Page/Segment/SegmentPageHeader.vue'
import DirectoryType from '~/core/models/DirectoryType'
import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'
import PageContent from '~/components/Shared/PageContent.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'

@Component({
  components: {
    SegmentPageHeader,
    PageContent,
    DataTable
  }
})
export default class SegmentTypePage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('segments', '/v1/data/table/segment', {
    type: this.$route.params.type
  })

  get pageLabel () {
    return `Сегменты: ${DirectoryType.getLabel(this.$route.params.type as DirectoryTypeEnum)}`
  }

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
