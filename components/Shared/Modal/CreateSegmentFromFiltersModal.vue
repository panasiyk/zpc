<template>
  <v-dialog v-model="modal" max-width="500">
    <v-card>
      <v-card-title class="flex justify-space-between">
        Создание сегмента
        <close-modal-button @click="closeModal" />
      </v-card-title>
      <v-card-text>
        <validation-observer ref="validator" v-slot="{handleSubmit}">
          <v-form @submit.prevent="handleSubmit(submit)">
            <validation-provider v-slot="{errors}" rules="required" name="Название" vid="name">
              <v-text-field v-model="name" :error-messages="errors" label="Название *" outlined />
            </validation-provider>
            <validation-provider v-slot="{errors}" rules="required" name="Частота обновления" vid="frequency">
              <segment-frequency-select v-model="frequency" :error-messages="errors" />
            </validation-provider>
            <v-btn type="submit" color="primary">
              Создать
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'

import ModalMixin from '~/core/mixins/ModalMixin'
import CloseModalButton from '~/components/Shared/CloseModalButton.vue'
import SegmentFrequencySelect from '~/components/Shared/SegmentFrequencySelect.vue'
import SegmentFrequency from '~/core/models/SegmentFrequency'

@Component({
  components: { SegmentFrequencySelect, CloseModalButton }
})
export default class CreateSegmentFromFiltersModal extends mixins(ModalMixin) {
  @Ref() validator!: InstanceType<typeof ValidationObserver>

  created () {
    this.onClose = () => {
      this.resetForm()
    }
  }

  name = ''
  frequency: SegmentFrequency | null = null

  submit () {
    this.closeModal()
  }

  resetForm () {
    this.name = ''
    this.frequency = null

    this.validator.reset()
  }
}
</script>

<style scoped>

</style>
