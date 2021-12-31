<template>
  <fullscreen-modal ref="modal">
    <discount-folder-modal-header :title="headerTitle" @click:back-button="closeModal" />

    <page-content>
      <v-card>
        <v-card-text>
          <discount-folder-form :folder="folder" :open-ids="payload.openedFolderIds" @saved="onSaved" />
        </v-card-text>
      </v-card>
    </page-content>
  </fullscreen-modal>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from 'nuxt-property-decorator'

import FullscreenModal from '../FullscreenModal.vue'
import DiscountFolderModalHeader
  from '~/components/Shared/Modal/DiscountFolderModal/Components/DiscountFolderModalHeader.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import DiscountFolderForm from '~/components/Shared/DiscountFolderForm/DiscountFolderForm.vue'
import Folder from '~/core/models/Folder'
import IDiscountFolderModalPayload from '~/core/interfaces/IDiscountFolderModalPayload'
import BusEvent from '~/core/enums/BusEvent'
import { vxm } from '~/store'

@Component({
  components: { DiscountFolderForm, PageContent, DiscountFolderModalHeader, FullscreenModal }
})
export default class DiscountFolderModal extends Vue {
  @Ref() modal!: InstanceType<typeof FullscreenModal>
  @Prop({ type: String, default: 'Папка' }) headerTitle!: string

  folder: Folder = new Folder()

  payload: IDiscountFolderModalPayload = {
    parentFolderId: null,
    openedFolderIds: [],
    folderId: null
  }

  openModal (payload: IDiscountFolderModalPayload) {
    this.$set(this, 'payload', payload)
    this.initFolder()
    this.modal.openModal()
  }

  closeModal () {
    this.modal.closeModal()
  }

  async initFolder () {
    if (this.payload.folderId) {
      const result = await vxm.discount.folder.fetchFolderDetails(this.payload.folderId)

      if (result.isSuccess) {
        this.$set(this, 'folder', result.data!.folder as Folder)
      } else {
        alert(result.errorMessage)
        this.closeModal()
      }
    } else {
      this.$set(this, 'folder', new Folder())
      this.folder.parentId = this.payload.parentFolderId
    }
  }

  onSaved () {
    this.$nuxt.$emit(BusEvent.folderSaved)
    alert('Изменения сохранены')
    this.closeModal()
  }
}
</script>

<style scoped>

</style>
