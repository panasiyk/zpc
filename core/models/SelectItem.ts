import ISelectItem from '~/core/interfaces/ISelectItem'

export default class SelectItem implements ISelectItem {
  constructor (public text: string, public value: any) {
  }
}
