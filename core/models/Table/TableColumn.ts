import IFromJson from '~/core/interfaces/IFromJson'
import ITableColumnStyle from '~/core/interfaces/ITableColumnStyle'

export default class TableColumn implements IFromJson<TableColumn> {
  text: string = ''
  value: string = ''
  filterable: boolean = false
  sortable: boolean = false
  style: Required<ITableColumnStyle> = {
    tag: false,
    width: 0,
    classList: ''
  }

  fromJson (json: any): TableColumn {
    this.text = json.header
    this.value = json.field

    return this
  }

  fromTextValue (text: string, value: string) {
    this.text = text
    this.value = value

    return this
  }

  setStyle (style:ITableColumnStyle) {
    this.style = { ...this.style, ...style }
  }
}
