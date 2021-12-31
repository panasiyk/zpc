import IFromJson from '~/core/interfaces/IFromJson'

export default class Folder implements IFromJson<Folder> {
  id: number | null = null
  name: string = ''
  parentId: number | null = null
  groupId: number | null = null
  isLimitedBySize: boolean = false
  restrictionTypeId: number | null = null
  restrictionAreaId: number | null = null
  restrictionValue: number = 0

  fromJson (json: any): Folder {
    this.id = json.id
    this.name = json.name
    this.parentId = json.parent_id
    this.groupId = json.group_id
    this.isLimitedBySize = json.sizeLimit
    this.restrictionTypeId = json.limit_type_id
    this.restrictionAreaId = json.limit_space_id
    this.restrictionValue = json.limit_amount || 0

    return this
  }
}
