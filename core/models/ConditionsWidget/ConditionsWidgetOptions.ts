import Condition from '~/core/models/ConditionsWidget/Condition'
import Filter from '~/core/models/ConditionsWidget/Filter'
import GroupCondition from '~/core/models/ConditionsWidget/GroupCondition'
import Value from '~/core/models/ConditionsWidget/Value'
import ActionResult from '~/core/models/ActionResult'
import { $axios } from '~/core/utils/api'
import ConditionValue from '~/core/models/ConditionsWidget/ConditionValue'
import ValueItem from '~/core/models/ConditionsWidget/ValueItem'

export default class ConditionsWidgetOptions {
  conditions: Condition[] = []
  filters: Filter[] = []
  groupConditions: GroupCondition[] = []
  values: Value[] = []

  async init (path: string) {
    try {
      const data = await $axios.$get(path)

      this.conditions = Object.keys(data.conditions).map((filterName) => {
        const conditionValues = Object.keys(data.conditions[filterName]).map((valueId) => {
          return new ConditionValue(parseInt(valueId), data.conditions[filterName][valueId])
        })

        return new Condition(filterName, conditionValues)
      })

      this.filters = Object.values(data.filters).map((item: any) => {
        return new Filter(item.name, item.label, item.type)
      })

      this.groupConditions = Object.keys(data.groupConditions).map((conditionId) => {
        return new GroupCondition(parseInt(conditionId), data.groupConditions[conditionId])
      })

      this.values = Object.keys(data.values).map((filterName) => {
        const valueItems = Object.keys(data.values[filterName].items).map((id) => {
          return new ValueItem(parseInt(id), data.values[filterName].items[id])
        })

        return new Value(filterName, valueItems)
      })

      return new ActionResult()
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }
}
