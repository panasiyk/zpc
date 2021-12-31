<template>
  <div class="page">
    <directory-page-header :title="pageLabel" :table-configuration="tableConfiguration" />

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

import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import PageContent from '~/components/Shared/PageContent.vue'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import CreateSegmentButton from '~/components/Page/Directory/CreateSegmentButton.vue'
import DirectoryPageHeader from '~/components/Page/Directory/DirectoryPageHeader.vue'
import DirectoryType from '~/core/models/DirectoryType'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'

@Component({
  components: { DataTable, DirectoryPageHeader, CreateSegmentButton, PageContent },
  middleware: 'directory-type-middleware',
  head () {
    return {
      title: (this as DirectoryTypePage).pageLabel
    }
  }
})
export default class DirectoryTypePage extends mixins(LoadingMixin) {
  tableConfiguration: TableConfiguration = new TableConfiguration('directoryItems', '/v1/data/table/directory', {
    type: this.$route.params.type
  })

  get pageLabel () {
    return DirectoryType.getLabel(this.$route.params.type as DirectoryTypeEnum)
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
