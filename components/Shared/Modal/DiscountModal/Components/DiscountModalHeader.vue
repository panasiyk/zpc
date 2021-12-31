<template>
  <page-header>
    <close-modal-button-with-label
        :title="title"
        class="mr-4"
        @click:back-button="$emit('click:back-button')"
    />
    <close-modal-button class="mr-auto" @click="$emit('click:back-button')" />
  </page-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import PageHeader from '../../../PageHeader/PageHeader.vue'
import PageHeaderTitle from '../../../PageHeader/PageHeaderTitle.vue'
import CloseModalButtonWithLabel from '~/components/Shared/Modal/Components/CloseModalButtonWithLabel.vue'
import CloseModalButton from '~/components/Shared/CloseModalButton.vue'

@Component({
  components: { CloseModalButton, CloseModalButtonWithLabel, PageHeaderTitle, PageHeader }
})
export default class DiscountModalHeader extends Vue {
  @Prop({ type: String, default: 'Скидка' }) title!: string
}
</script>

<style scoped>

</style>
