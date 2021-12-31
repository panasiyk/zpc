<template>
  <action-button-container>
    <v-tooltip max-width="300px" bottom>
      <template #activator="{attrs, on}">
        <v-btn
            ref="button"
            v-bind="attrs"
            class="page-header--button"
            elevation="0"
            color="primary"
            v-on="on"
            @click="onClick"
        >
          Создать сегмент
        </v-btn>
      </template>
      <span>
        Сегмент — выборка данных из справочника. Сохраняйте готовые сегменты, чтобы применять скидки только на
        определённую группу
      </span>
    </v-tooltip>
    <create-segment-from-filters-modal ref="modal" />
  </action-button-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'

import CreateSegmentFromFiltersModal from '~/components/Shared/Modal/CreateSegmentFromFiltersModal.vue'
import ActionButtonContainer from '~/components/Shared/PageHeader/ActionButtonContainer.vue'

@Component({
  components: {
    ActionButtonContainer,
    CreateSegmentFromFiltersModal
  }
})
export default class CreateSegmentButton extends Vue {
  @Ref() modal!: InstanceType<typeof CreateSegmentFromFiltersModal>

  onClick () {
    this.modal.openModal()
  }
}
</script>

<style scoped>

</style>
