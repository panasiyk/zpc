import IFromJson from '~/core/interfaces/IFromJson'

export default class TreeItem implements IFromJson<TreeItem> {
  id: number | null = null
  items: TreeItem[] = []
  name?: string
  priority?: number
  type?: string

  get isFolder () {
    return this.type === 'folder'
  }

  get hasChildren () {
    return Boolean(this.items.length)
  }

  fromJson (json: any): TreeItem {
    this.id = json.id
    this.name = json.name
    this.priority = json.priority
    this.type = json.type
    this.items = json.items ? json.items.map((item: any) => new TreeItem().fromJson(item)) : []

    return this
  }
}
