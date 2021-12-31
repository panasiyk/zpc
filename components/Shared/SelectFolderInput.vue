<template>
  <div>
    <v-text-field
        :value="getFolderName()"
        :hide-details="!errorMessages.length"
        :error-messages="errorMessages"
        label="Выбор папки *"
        outlined
        readonly
    >
      <template #append>
        <v-btn color="primary" @click="openModal">
          Выбрать папку
        </v-btn>
      </template>
    </v-text-field>
    <select-folder-modal
        ref="modal"
        :tree-configuration="treeConfiguration"
        @select:folder="onSelectFolder"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, VModel, Vue } from 'nuxt-property-decorator'

import SelectFolderModal from './Modal/SelectFolderModal.vue'
import TreeConfiguration from '~/core/models/TreeConfiguration/TreeConfiguration'

@Component({
  components: { SelectFolderModal }
})
export default class SelectFolderInput extends Vue {
  @Ref() modal!: InstanceType<typeof SelectFolderModal>
  @VModel({ type: Number, default: null }) selectedFolderId!: number | null
  @Prop({ type: Array, default: () => [] }) openIds!: number[]
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  treeConfiguration: TreeConfiguration = new TreeConfiguration('/v1/discount/options/tree')

  mounted () {
    this.fetchData()
  }

  openModal () {
    this.modal.openModal({
      activeIds: this.selectedFolderId ? [this.selectedFolderId] : [],
      openIds: this.openIds
    })
  }

  async fetchData () {
    const result = await this.treeConfiguration.fetchData()

    if (!result.isSuccess) {
      alert(result.errorMessage)
    }
  }

  onSelectFolder (id: number | null) {
    this.selectedFolderId = id
  }

  getFolderName (): string | undefined {
    return this.treeConfiguration.findNode(this.selectedFolderId)?.name
  }
}
</script>

<style scoped>

</style>
