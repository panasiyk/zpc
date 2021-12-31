import Vue from 'vue'
import { cloneDeep } from 'lodash'

import { $axios } from '~/core/utils/api'
import ActionResult from '~/core/models/ActionResult'
import TreeItem from '~/core/models/TreeConfiguration/TreeItem'

function isFolder (id: number | null, searchItems: TreeItem[]) {
  for (const searchItem of searchItems) {
    if (searchItem.id === id && searchItem.isFolder) {
      return true
    } else if (searchItem.isFolder && searchItem.hasChildren) {
      if (isFolder(id, searchItem.items)) {
        return true
      }
    }
  }

  return false
}

function filterOnlyFolder (items: TreeItem[]) {
  const filteredItems = []

  for (const item of items) {
    if (item.isFolder) {
      item.items = filterOnlyFolder(item.items)

      filteredItems.push(item)
    }
  }

  return filteredItems
}

function findNode (id: number | null, items: TreeItem[]): TreeItem | null {
  if (!id) {
    return null
  }

  for (const searchItem of items) {
    if (searchItem.id === id) {
      return searchItem
    }

    const foundNode = findNode(id, searchItem.items)

    if (foundNode) {
      return foundNode
    }
  }

  return null
}

export default class TreeConfiguration {
  items: TreeItem[] = []
  folderItems: TreeItem[] = []

  constructor (public sourcePath: string) {
  }

  isFolder (id: number): boolean {
    return isFolder(id, this.items)
  }

  async fetchData () {
    try {
      const data = await $axios.$get(this.sourcePath)

      Vue.set(this, 'items', data.map((item: any) => new TreeItem().fromJson(item)))
      Vue.set(this, 'folderItems', filterOnlyFolder(cloneDeep(this.items)))

      return new ActionResult()
    } catch (e) {
      return new ActionResult(undefined, e)
    }
  }

  findNode (nodeId: number | null): TreeItem | null {
    return findNode(nodeId, this.items)
  }
}
