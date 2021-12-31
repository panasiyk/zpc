<template>
  <page-header>
    <page-header-title>
      Заказы
    </page-header-title>
    <table-filter-input :table-configuration="tableConfiguration" />
    <selected-columns-button :table-configuration="tableConfiguration" />
  </page-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import PageHeader from '../../Shared/PageHeader/PageHeader.vue'
import PageHeaderTitle from '../../Shared/PageHeader/PageHeaderTitle.vue'
import TableFilterInput from '../../Shared/PageHeader/TableFilterInput/TableFilterInput.vue'
import TableConfiguration from '../../../core/models/Table/TableConfiguration'
import SelectedColumnsButton from '../../Shared/PageHeader/SelectedColumnsButton.vue'

@Component({
  components: { SelectedColumnsButton, TableFilterInput, PageHeaderTitle, PageHeader }
})
export default class OrdersTablePageHeader extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
}
</script>

<style scoped>

</style>
