import { createModule, mutation } from 'vuex-class-component'

export interface ITreeView {
  openedIds: number[]
  activeFolderId: number | null
}

export default class TreeModule extends createModule({
  namespaced: 'tree',
  strict: false,
  target: 'nuxt'
}) {
  treeView: ITreeView = {
    openedIds: [],
    activeFolderId: null
  }

  @mutation
  setOpenedIds (ids: number[]) {
    this.treeView.openedIds = ids
  }

  @mutation
  setActiveFolderId (id: number | null) {
    this.treeView.activeFolderId = id
  }

  @mutation
  reset () {
    this.treeView.openedIds = []
    this.treeView.activeFolderId = null
  }
}
