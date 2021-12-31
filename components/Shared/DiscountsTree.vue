<template>
  <div>
    <v-treeview
        :items="treeConfiguration.items"
        :open.sync="openIds"
        :active.sync="activeIds"
        class="tree"
        activatable
        item-key="id"
        item-text="name"
        item-children="items"
        @update:active="onUpdateActive"
        @update:open="$emit('update:open', $event)"
    >
      <template v-slot:prepend="{item, open}">
        <v-icon v-if="item.isFolder">
          {{ open ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}
        </v-icon>
        <v-icon v-else>
          mdi-label-percent-outline
        </v-icon>
      </template>
      <template v-slot:append="{item, open}">
        <v-btn v-if="shouldDisplayEditButton(item)" icon @click.stop.prevent="openItemModal(item)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-icon v-else-if="item.isFolder">
          {{ open ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline' }}
        </v-icon>
      </template>
    </v-treeview>
    <discount-modal ref="discountModal" header-title="Редактирование скидки" />
    <discount-folder-modal ref="discountFolderModal" header-title="Редактирование папки" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'nuxt-property-decorator'

import TreeConfiguration from '~/core/models/TreeConfiguration/TreeConfiguration'
import TreeItem from '~/core/models/TreeConfiguration/TreeItem'
import DiscountModal from '~/components/Shared/Modal/DiscountModal/DiscountModal.vue'
import DiscountFolderModal from '~/components/Shared/Modal/DiscountFolderModal/DiscountFolderModal.vue'
import { vxm } from '~/store'

@Component({
  components: {
    DiscountFolderModal,
    DiscountModal
  }
})
export default class DiscountsTree extends Vue {
  @Ref() discountModal!: InstanceType<typeof DiscountModal>
  @Ref() discountFolderModal!: InstanceType<typeof DiscountFolderModal>
  @Prop({ type: Object, required: true }) treeConfiguration!: TreeConfiguration

  activeIds: number[] = []
  openIds: number[] = []

  shouldDisplayEditButton (item: TreeItem) {
    return item.id === this.activeIds[0]
  }

  openItemModal (node: TreeItem) {
    if (node.isFolder) {
      this.discountFolderModal.openModal({
        folderId: node.id,
        openedFolderIds: vxm.discount.tree.treeView.openedIds,
        parentFolderId: null
      })
    } else {
      this.discountModal.openModal({
        discountId: node.id,
        folderId: null,
        openFolderIds: vxm.discount.tree.treeView.openedIds
      })
    }
  }

  onUpdateActive (ids: number[]) {
    this.$emit('update:active', ids)

    if (this.treeConfiguration.isFolder(ids[0])) {
      this.$emit('select:folder', ids[0])
    } else {
      this.$emit('select:folder', null)
    }
  }
}
</script>

<style scoped>

</style>
