<template>
  <fragment>
    <action-button-container class="mr-auto">
      <div class="btn-with-dropdown">
        <v-btn class="main-btn" elevation="0" @click="openDiscountModal">
          Создать скидку
        </v-btn>
        <v-menu offset-y bottom nudge-left="108">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="dropdown-btn" elevation="0" v-bind="attrs" v-on="on">
              <v-icon>
                mdi-arrow-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="openFolderModal">
              <v-list-item-title>
                Создать папку
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </action-button-container>
    <discount-modal ref="discountModal" header-title="Создание скидок" />
    <discount-folder-modal ref="folderModal" header-title="Создание папки" />
  </fragment>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Fragment } from 'vue-fragment'

import ActionButtonContainer from '~/components/Shared/PageHeader/ActionButtonContainer.vue'
import DiscountModal from '~/components/Shared/Modal/DiscountModal/DiscountModal.vue'
import DiscountFolderModal from '~/components/Shared/Modal/DiscountFolderModal/DiscountFolderModal.vue'
import { vxm } from '~/store'

@Component({
  components: { DiscountFolderModal, DiscountModal, ActionButtonContainer, Fragment }
})
export default class CreateDiscountButton extends Vue {
  @Ref() discountModal!: InstanceType<typeof DiscountModal>
  @Ref() folderModal!: InstanceType<typeof DiscountFolderModal>

  openDiscountModal () {
    this.discountModal.openModal({
      discountId: null,
      folderId: vxm.discount.tree.treeView.activeFolderId,
      openFolderIds: vxm.discount.tree.treeView.openedIds
    })
  }

  openFolderModal () {
    this.folderModal.openModal({
      openedFolderIds: vxm.discount.tree.treeView.openedIds,
      parentFolderId: vxm.discount.tree.treeView.activeFolderId,
      folderId: null
    })
  }
}
</script>

<style scoped>

</style>
