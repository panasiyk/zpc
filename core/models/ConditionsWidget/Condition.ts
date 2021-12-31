import ConditionValue from '~/core/models/ConditionsWidget/ConditionValue'

export default class Condition {
  filterName: string = ''
  values: ConditionValue[] = []

  constructor (filterName: string, values: ConditionValue[]) {
    this.filterName = filterName
    this.values = values
  }
}
