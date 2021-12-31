<template>
  <validation-provider v-slot="{errors}" :rules="rules" :name="validationProviderName" vid="value">
    <component :is="component" v-model="discountAmount" :error-messages="errors" :label="label" />
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

import SimpleAmount from '~/components/Shared/Modal/DiscountModal/Components/AmountInput/SimpleAmount.vue'
import PercentAmount from '~/components/Shared/Modal/DiscountModal/Components/AmountInput/PercentAmount.vue'
import RoundTypeSelect from '~/components/Shared/Modal/DiscountModal/Components/AmountInput/RoundTypeSelect.vue'

@Component
export default class AmountInput extends Vue {
  @VModel({ type: [Number, String], default: null }) discountAmount!: string | number
  @Prop({ type: String, default: null }) discountType!: string

  get component () {
    const inputMap: { [index: string]: any } = {
      1: SimpleAmount,
      2: PercentAmount,
      3: PercentAmount,
      5: RoundTypeSelect,
      6: PercentAmount,
      7: SimpleAmount
    }

    return inputMap[this.discountType]
  }

  get rules (): string {
    const rulesMap: { [index: string]: string } = {
      1: 'required|min_value:1',
      2: 'required|min_value:1|max_value:100',
      3: 'required|min_value:1|max_value:100',
      5: 'required',
      6: 'required|min_value:1|max_value:100',
      7: 'required|min_value:1'
    }

    return rulesMap[this.discountType]
  }

  get validationProviderName () {
    const namesMap: { [index: string]: string } = {
      1: 'Размер скидки, руб',
      2: 'Размер скидки, %',
      3: 'Размер скидки, %',
      5: 'До какого значения округлять',
      6: 'Бонусы процентом от суммы покупки',
      7: 'Размер бонусов'
    }

    return namesMap[this.discountType]
  }

  get label () {
    const labelsMap: { [index: string]: string } = {
      1: 'Размер скидки, руб *',
      2: 'Размер скидки, % *',
      3: 'Размер скидки, % *',
      5: 'До какого значения округлять *',
      6: 'Бонусы процентом от суммы покупки *',
      7: 'Размер бонусов *'
    }

    return labelsMap[this.discountType]
  }
}
</script>

<style scoped>

</style>
