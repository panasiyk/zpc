import IFromJson from '~/core/interfaces/IFromJson'
import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import TableColumn from '~/core/models/Table/TableColumn'
import SortingDirectionEnum from '~/core/enums/SortingDirectionEnum'

export default class Order implements IFromJson<Order> {
  id?: number
  area?: IWithIdAndLabel
  order_id?: string
  point?: IWithIdAndLabel
  client?: IWithIdAndLabel
  card?: IWithIdAndLabel
  date?: string
  status?: IWithIdAndLabel
  created_at?: string
  updated_at?: string
  order_url?: string
  payments?: string
  old_sum?: string | number
  sum?: string | number
  discounts?: string
  bonus?: string
  products: any[] = []
  productsDataTableConfiguration: TableConfiguration = new TableConfiguration('orderProducts')

  constructor () {
    this.initProductsTableData()
  }

  fromJson (json: any): Order {
    this.id = json.id
    this.area = json.area ?? undefined
    this.order_id = json.order_id ?? undefined
    this.point = json.point ?? undefined
    this.client = json.client ?? undefined
    this.card = json.card ?? undefined
    this.status = json.status
    this.created_at = json.created_at
    this.updated_at = json.updated_at
    this.order_url = json.order_url
    this.payments = json.payments
    this.date = json.date
    this.old_sum = json.old_sum
    this.sum = json.sum
    this.discounts = json.discounts
    this.bonus = json.bonus
    this.products = json.products
    this.productsDataTableConfiguration.items = this.products as []

    return this
  }

  private initProductsTableData () {
    this.productsDataTableConfiguration.columns = [
      new TableColumn().fromTextValue('Название', 'name'),
      new TableColumn().fromTextValue('Цена, руб', 'price'),
      new TableColumn().fromTextValue('Количество', 'amount')
    ]
    this.productsDataTableConfiguration.selectedColumns = ['name', 'price', 'amount']
    this.productsDataTableConfiguration.disableLocalSorting = false
    this.productsDataTableConfiguration.sorting.setSorting('name', SortingDirectionEnum.ascending)
  }
}
