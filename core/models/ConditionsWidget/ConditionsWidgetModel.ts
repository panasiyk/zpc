import WidgetModelItem from '~/core/models/ConditionsWidget/WidgetModelItem'

function addItemToFolder (folderUuid: string, widgetItems: WidgetModelItem[], type: string) {
  widgetItems.forEach((item) => {
    if (item.isFolder && item.id === folderUuid) {
      item.items.push(new WidgetModelItem(null, type, []))
    } else if (item.isFolder) {
      addItemToFolder(folderUuid, item.items, type)
    }
  })
}

export default class ConditionsWidgetModel {
  folders: WidgetModelItem[] = []

  constructor (folders: WidgetModelItem[]) {
    this.folders = folders
  }

  addFolder (parentUuid: string) {
    addItemToFolder(parentUuid, this.folders, WidgetModelItem.FOLDER)
  }

  addCondition (folderUuid: string) {
    addItemToFolder(folderUuid, this.folders, WidgetModelItem.CONDITION)
  }
}
