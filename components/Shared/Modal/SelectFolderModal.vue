<template>
  <v-dialog v-model="modal">
    <v-card>
      <v-card-title>
        Выбор папки
      </v-card-title>
      <v-card-text>
        <discount-folders-tree
            :tree-configuration="treeConfiguration"
            :open-ids="payload.openIds"
            :active-ids="payload.activeIds"
            @select:folder="onFolderSelect"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!selectedFolderId" @click="submit">
          Выбрать
        </v-btn>
        <v-btn outlined @click="cancel">
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import { cloneDeep } from 'lodash'

import ModalMixin from '../../../core/mixins/ModalMixin'
import DiscountFoldersTree from '../DiscountFoldersTree.vue'
import MainArea from '../MainArea.vue'
import TreeConfiguration from '~/core/models/TreeConfiguration/TreeConfiguration'
import ISelectFolderModalPayload from '~/core/interfaces/ISelectFolderModalPayload'

@Component({
  components: { MainArea, DiscountFoldersTree }
})
export default class SelectFolderModal extends mixins(ModalMixin) {
  @Prop({ type: Object, required: true }) treeConfiguration!: TreeConfiguration

  selectedFolderId: number | null = null

  backupPayload: ISelectFolderModalPayload = {
    openIds: [],
    activeIds: []
  }
  payload: ISelectFolderModalPayload = {
    openIds: [],
    activeIds: []
  }

  // @ts-ignore
  openModal (payload: ISelectFolderModalPayload) {
    this.$set(this, 'payload', cloneDeep(payload))
    this.$set(this, 'backupPayload', cloneDeep(payload))
    this.selectedFolderId = payload.activeIds[0]
    this.modal = true
  }

  cancel () {
    this.closeModal()
  }

  submit () {
    this.$emit('select:folder', this.selectedFolderId)

    this.closeModal()
  }

  onFolderSelect (id: number | null) {
    this.selectedFolderId = id
  }
}
</script>

<style scoped>

</style>
