<template>
  <fullscreen-modal ref="modal" :on-open="onOpen">
    <select-client-segment-modal-header :table-configuration="tableConfiguration" :close-modal-handler="closeModal" />

    <page-content>
      <fullscreen-modal-body title="Добавьте покупателей">
        <data-table
            :selected-rows.sync="selectedRows"
            :table-configuration="tableConfiguration"
            show-select
        >
          <template v-slot:footer:inner-prepend>
            <div>
              <v-btn :disabled="!selectedRows.length" color="primary" @click="closeModal">
                Применить сегмент (-ы)
              </v-btn>
              <v-btn outlined @click="cancel">
                Отмена
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </template>
        </data-table>
      </fullscreen-modal-body>
    </page-content>
  </fullscreen-modal>
</template>

<script lang="ts">
import { Component, Ref, VModel, Vue } from 'nuxt-property-decorator'

import FullscreenModal from '../../Shared/Modal/FullscreenModal.vue'
import SelectClientSegmentModalHeader
  from '~/components/Shared/Modal/SelectClientSegmentModal/Components/SelectClientSegmentModalHeader.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import PageContent from '~/components/Shared/PageContent.vue'
import FullscreenModalBody from '~/components/Shared/Modal/Components/FullscreenModalBody.vue'
import MainArea from '~/components/Shared/MainArea.vue'
import DataTable from '~/components/Shared/DataTable/DataTable.vue'

@Component({
  components: { DataTable, MainArea, FullscreenModalBody, PageContent, SelectClientSegmentModalHeader, FullscreenModal }
})
export default class SelectClientSegmentModal extends Vue {
  @Ref() modal!: InstanceType<typeof FullscreenModal>
  @VModel({ type: Array, default: () => [] }) selectedRows!: any[]

  selectedRowsBackup: any[] = []

  tableConfiguration: TableConfiguration = new TableConfiguration('selectClients')

  closeModal () {
    this.modal.closeModal()
  }

  openModal () {
    this.modal.openModal()
  }

  onOpen () {
    this.selectedRowsBackup = [...this.selectedRows]
  }

  cancel () {
    this.selectedRows = [...this.selectedRowsBackup]
    this.closeModal()
  }
}
</script>

<style scoped>

</style>
