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
import CloseModalButtonWithLabel from '../../Components/CloseModalButtonWithLabel.vue'
import CloseModalButton from '../../../CloseModalButton.vue'

@Component({
  components: { CloseModalButton, CloseModalButtonWithLabel, PageHeader }
})
export default class DiscountFolderModalHeader extends Vue {
  @Prop({ type: String, default: 'Папка' }) title!: string
}
</script>

<style scoped>

</style>
