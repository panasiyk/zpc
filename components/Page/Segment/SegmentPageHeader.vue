<template>
  <page-header>
    <page-header-title>
      {{ title }}
    </page-header-title>
    <table-filter-input :table-configuration="tableConfiguration" />
    <selected-columns-button :table-configuration="tableConfiguration" />
  </page-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import PageHeader from '../../Shared/PageHeader/PageHeader.vue'
import PageHeaderTitle from '../../Shared/PageHeader/PageHeaderTitle.vue'
import TableFilterInput from '~/components/Shared/PageHeader/TableFilterInput/TableFilterInput.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import SelectedColumnsButton from '~/components/Shared/PageHeader/SelectedColumnsButton.vue'

@Component({
  components: { SelectedColumnsButton, TableFilterInput, PageHeaderTitle, PageHeader }
})
export default class SegmentPageHeader extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
}
</script>

<style scoped>

</style>
