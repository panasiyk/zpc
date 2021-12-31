import TableFilterTypeEnum from '~/core/enums/TableFilterTypeEnum'
import IFromJson from '~/core/interfaces/IFromJson'

export default class TableFilter implements IFromJson<TableFilter> {
  field: string = ''
  label: string = ''
  type: TableFilterTypeEnum = TableFilterTypeEnum.string
  value: any = ''
  availableValues: any[] = []
  fetchMoreUrl?: string
  itemValue?: string
  itemLabel?: string

  fromJson (json: any): TableFilter {
    this.field = json.filterName
    this.label = json.header
    this.availableValues = json.filterValues
    this.type = json.filterType

    return this
  }
}
