<template>
  <page-header>
    <page-header-title>
      Условия рекомендации
    </page-header-title>
    <table-filter-input :table-configuration="tableConfiguration" />
    <selected-columns-button :table-configuration="tableConfiguration" />
  </page-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import TableFilterInput from '~/components/Shared/PageHeader/TableFilterInput/TableFilterInput.vue'
import SelectedColumnsButton from '~/components/Shared/PageHeader/SelectedColumnsButton.vue'
import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'
import PageHeaderTitle from '~/components/Shared/PageHeader/PageHeaderTitle.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'

@Component({
  components: { SelectedColumnsButton, TableFilterInput, PageHeaderTitle, PageHeader }
})
export default class ConditionPageHeader extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
}
</script>

<style scoped>

</style>
