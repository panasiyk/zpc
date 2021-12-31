import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'
import SelectItem from '~/core/models/SelectItem'

export default class DirectoryType {
  static getLabel (type: DirectoryTypeEnum): string {
    const map = {
      [DirectoryTypeEnum.payment_type]: 'Методы оплаты',
      [DirectoryTypeEnum.client]: 'Покупатели',
      [DirectoryTypeEnum.card]: 'Карты лояльности',
      [DirectoryTypeEnum.point]: 'Точки продаж',
      [DirectoryTypeEnum.nomenclature]: 'Товары'
    }

    return map[type] || type
  }

  static getSelectItems (): SelectItem[] {
    return Object
      .keys(DirectoryTypeEnum)
      .map(type => new SelectItem(DirectoryType.getLabel(type as DirectoryTypeEnum), type))
  }
}
