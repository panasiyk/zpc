<template>
  <page-header>
    <page-header-title>
      {{ title }}
    </page-header-title>
    <create-segment-button />
    <table-filter-input :table-configuration="tableConfiguration" />
    <selected-columns-button :table-configuration="tableConfiguration" />
  </page-header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CreateSegmentButton from '~/components/Page/Directory/CreateSegmentButton.vue'
import TableFilterInput from '~/components/Shared/PageHeader/TableFilterInput/TableFilterInput.vue'
import SelectedColumnsButton from '~/components/Shared/PageHeader/SelectedColumnsButton.vue'
import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import PageHeaderTitle from '~/components/Shared/PageHeader/PageHeaderTitle.vue'

@Component({
  components: { PageHeaderTitle, PageHeader, SelectedColumnsButton, TableFilterInput, CreateSegmentButton }
})
export default class DirectoryPageHeader extends Vue {
  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
}
</script>

<style scoped>

</style>
