<template>
  <div>
    <filter-select :value="condition.filter" :filters="options.filters" />
    <condition-select :value="condition.conditionId" :items="getConditionSelectItems()" />
    <condition-value :value="condition.value" :filter-type="getConditionValueType()" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import FilterSelect from '~/components/Shared/ConditionsWidget/ConditionsRule/FilterSelect.vue'
import ConditionSelect from '~/components/Shared/ConditionsWidget/ConditionsRule/ConditionSelect.vue'
import ConditionValue from '~/components/Shared/ConditionsWidget/ConditionsRule/ConditionValue/ConditionValue.vue'
import WidgetModelItem from '~/core/models/ConditionsWidget/WidgetModelItem'
import ConditionsWidgetOptions from '~/core/models/ConditionsWidget/ConditionsWidgetOptions'

@Component({
  components: { ConditionValue, ConditionSelect, FilterSelect }
})
export default class ConditionsRule extends Vue {
  @Prop({ type: Object, required: true }) condition!: WidgetModelItem
  @Prop({ type: Object, required: true }) options!: ConditionsWidgetOptions

  getConditionSelectItems () {
    if (!this.condition.filter) {
      return []
    }

    return this.options.conditions.find(condition => condition.filterName === this.condition.filter)?.values || []
  }

  getConditionValueType () {
    return this.options.filters.find(filter => filter.name === this.condition.filter)?.type
  }
}
</script>

<style scoped>

</style>
