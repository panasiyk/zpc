<template>
  <validation-observer ref="validator" v-slot="{handleSubmit}">
    <v-form :disabled="innerDisabled" @submit.prevent="handleSubmit(submit)">
      <card-with-title>
        <template #title>
          <validation-provider v-slot="{errors}" rules="required" name="Название" vid="name" class="full-width">
            <v-text-field v-model="discount.name" :error-messages="errors" label="Введите название скидки *" />
          </validation-provider>
        </template>
        <main-area>
          <validation-provider v-slot="{errors}" rules="required" name="Папка" vid="folder">
            <select-folder-input v-model="discount.folderId" :open-ids="openFolderIds" :error-messages="errors" class="mb-4" />
          </validation-provider>
          <discount-type-select v-model="discount.type" @input="resetValue" />
          <div class="mt-4">
            <amount-input
                v-model="discount.value"
                :discount-type="discount.type"
            />
          </div>
          <v-divider class="my-4" />
          <validation-provider v-slot="{errors}" ruless="required" name="Область проверки" vid="space">
            <discount-checking-area-select v-model="discount.space" :error-messages="errors" class="mb-4" />
          </validation-provider>
          <validation-provider
              v-if="isProductSegmentSelectVisible"
              v-slot="{errors}"
              rules="required"
              name="Сегменты"
              vid="segments"
          >
            <product-segment-select
                v-model="discount.segments"
                :error-messages="errors"
                label="Продуктовые сегменты *"
            />
          </validation-provider>
          <v-divider class="my-4" />
          <validation-provider v-slot="{errors}" rules="required" name="Условия предоставления" vid="sources">
            <discount-condition-select
                v-model="discount.conditions"
                :error-messages="errors"
                label="Условия предоставления *"
                multiple
            />
          </validation-provider>
          <v-divider class="my-4" />
          <v-switch v-model="discount.isActive" label="Активна" inset hide-details />
          <v-divider class="my-4" />
          <div>
            <v-btn :loading="isLoading" :disabled="innerDisabled" color="primary" type="submit">
              Сохранить
            </v-btn>
            <v-btn :loading="isLoading" :disabled="innerDisabled" outlined @click="$emit('cancel')">
              Отменить
            </v-btn>
          </div>
        </main-area>
      </card-with-title>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, mixins, Prop, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'

import CardWithTitle from '../../../CardWithTitle.vue'
import MainArea from '~/components/Shared/MainArea.vue'
import DiscountCheckingAreaSelect
  from '~/components/Shared/Modal/DiscountModal/Components/DiscountCheckingAreaSelect.vue'
import Discount from '~/core/models/Discount'
import ProductSegmentSelect from '~/components/Shared/Modal/DiscountModal/Components/ProductSegmentSelect.vue'
import DiscountConditionSelect from '~/components/Shared/DiscountConditionSelect.vue'
import DiscountTypeSelect from '~/components/Shared/Modal/DiscountModal/Components/DiscountTypeSelect.vue'
import AmountInput from '~/components/Shared/Modal/DiscountModal/Components/AmountInput/AmountInput.vue'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import { vxm } from '~/store'
import SelectFolderInput from '~/components/Shared/SelectFolderInput.vue'

@Component({
  components: {
    SelectFolderInput,
    AmountInput,
    DiscountTypeSelect,
    DiscountConditionSelect,
    ProductSegmentSelect,
    DiscountCheckingAreaSelect,
    MainArea,
    CardWithTitle
  }
})
export default class DiscountForm extends mixins(LoadingMixin) {
  @Ref() validator!: InstanceType<typeof ValidationObserver>
  @Prop({ type: Object, required: true }) discount!: Discount
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Array, default: () => [] }) openFolderIds!: number[]

  get isProductSegmentSelectVisible () {
    return this.discount.space?.value === 2
  }

  get innerDisabled () {
    return this.disabled || this.isLoading
  }

  async submit () {
    const result = await this.wrapLoading(() => vxm.discount.saveDiscount({ discount: this.discount }))

    if (result.isSuccess) {
      alert('Saved')

      this.$nuxt.$emit('discountSaved', this.discount)
    } else {
      alert(result.errorMessage)
    }
  }

  resetValue () {
    this.discount.value = null
  }
}
</script>

<style scoped>

</style>
