<template>
  <component :is="component" v-model="conditionValue" />
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

import NumberValue from '~/components/Shared/ConditionsWidget/ConditionsRule/ConditionValue/NumberValue.vue'
import StringValue from '~/components/Shared/ConditionsWidget/ConditionsRule/ConditionValue/StringValue.vue'

@Component
export default class ConditionValue extends Vue {
  @VModel({ type: undefined, default: null }) conditionValue!: any
  @Prop({ type: String, default: null }) filterType!: string | null

  get component () {
    if (!this.filterType) {
      return undefined
    }

    const componentsMap: { [key: string]: any } = {
      number: NumberValue,
      string: StringValue,
      integer: NumberValue
    }

    return componentsMap[this.filterType]
  }
}
</script>

<style scoped>

</style>
