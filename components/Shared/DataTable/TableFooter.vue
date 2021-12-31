<template>
  <div class="data-table--footer">
    <slot name="footer:inner-prepend" />
    <pagination
        v-if="tableConfiguration.pagination.totalPages"
        :table-data="tableConfiguration"
        :is-loading="isLoading"
        @change-page="$emit('change-page', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import Pagination from '~/components/Shared/DataTable/Pagination.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'

@Component({
  components: { Pagination }
})
export default class TableFooter extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
  @Prop({ type: Boolean, default: false }) isLoading!: boolean
}
</script>

<style scoped>

</style>
