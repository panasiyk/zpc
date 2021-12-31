<template>
  <v-dialog v-model="modal" content-class="fullscreen-modal" fullscreen>
    <div class="page white">
      <slot />
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import ModalMixin from '~/core/mixins/ModalMixin'

@Component
export default class FullscreenModal extends mixins(ModalMixin) {
}
</script>

<style scoped>

</style>
