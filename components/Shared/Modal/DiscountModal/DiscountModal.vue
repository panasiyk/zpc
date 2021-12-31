<template>
  <fullscreen-modal ref="modal">
    <discount-modal-header :title="headerTitle" @click:back-button="closeModal" />

    <page-content>
      <discount-form :discount="discount" :open-folder-ids="payload.openFolderIds" :disabled="isLoading" />
    </page-content>
  </fullscreen-modal>
</template>

<script lang="ts">
import { Component, Ref, Prop, mixins } from 'nuxt-property-decorator'

import FullscreenModal from '../FullscreenModal.vue'
import DiscountModalHeader from '~/components/Shared/Modal/DiscountModal/Components/DiscountModalHeader.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import CardWithTitle from '~/components/Shared/CardWithTitle.vue'
import DiscountForm from '~/components/Shared/Modal/DiscountModal/Components/DiscountForm.vue'
import Discount from '~/core/models/Discount'
import { vxm } from '~/store'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import IDiscountModalPayload from '~/core/interfaces/IDiscountModalPayload'

@Component({
  components: { DiscountForm, CardWithTitle, PageContent, DiscountModalHeader, FullscreenModal }
})
export default class DiscountModal extends mixins(LoadingMixin) {
  @Ref() modal!: InstanceType<typeof FullscreenModal>
  @Prop({ type: String, default: 'Скидка' }) headerTitle!: string

  discount: Discount = new Discount()
  payload: IDiscountModalPayload = {
    discountId: null,
    folderId: null,
    openFolderIds: []
  }

  openModal (payload: IDiscountModalPayload) {
    this.$set(this, 'payload', payload)
    this.initDiscount()
    this.modal.openModal()
  }

  closeModal () {
    this.modal.closeModal()
  }

  async fetchDiscount (discountId: number) {
    const result = await this.wrapLoading(() => vxm.discount.fetchDiscount(discountId))

    if (result.isSuccess) {
      this.discount = result.data?.discount as Discount
    } else {
      alert(result.errorMessage)
    }
  }

  initDiscount () {
    if (this.payload.discountId) {
      this.fetchDiscount(this.payload.discountId)
    } else {
      this.$set(this, 'discount', new Discount())
      this.discount.folderId = this.payload.folderId
    }
  }
}
</script>

<style scoped>

</style>
