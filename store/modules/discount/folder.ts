import { action, createModule } from 'vuex-class-component'
import ActionResult from '~/core/models/ActionResult'
import SelectItem from '~/core/models/SelectItem'
import { $axios } from '~/core/utils/api'
import Folder from '~/core/models/Folder'

export interface FetchFolderGroupsResponse {
  groups?: SelectItem[]
}

export interface FetchFolderRestrictionTypesResponse {
  types?: SelectItem[]
}

export interface FetchFolderRestrictionAreasResponse {
  areas?: SelectItem[]
}

export interface FetchFolderDetailsResponse {
  folder?: Folder
}

export default class FolderModule extends createModule({
  namespaced: 'folder',
  strict: false,
  target: 'nuxt'
}) {
  @action
  async fetchFolderGroups (): Promise<ActionResult<FetchFolderGroupsResponse>> {
    try {
      const responseData = await $axios.$get('/v1/discount/folder/groups')

      const groups = Object.keys(responseData).map(id => new SelectItem(responseData[id], parseInt(id)))

      return new ActionResult({
        groups
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async fetchFolderRestrictionTypes (): Promise<ActionResult<FetchFolderRestrictionTypesResponse>> {
    try {
      const responseData = await $axios.$get('/v1/discount/folder/types')

      const types = Object.keys(responseData).map(id => new SelectItem(responseData[id], parseInt(id)))

      return new ActionResult({
        types
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async fetchFolderRestrictionAreas (): Promise<ActionResult<FetchFolderRestrictionAreasResponse>> {
    try {
      const responseData = await $axios.$get('/v1/discount/folder/spaces')

      const areas = Object.keys(responseData).map(id => new SelectItem(responseData[id], parseInt(id)))

      return new ActionResult({
        areas
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async saveFolder (folder: Folder) {
    try {
      const path = folder.id ? `/v1/discount/folder/${folder.id}` : '/v1/discount/folder'

      await $axios.$post(path, {
        name: folder.name,
        parent_id: folder.parentId,
        group_id: folder.groupId,
        sizeLimit: folder.isLimitedBySize,
        limit_type_id: folder.restrictionTypeId,
        limit_space_id: folder.restrictionAreaId,
        limit_amount: folder.restrictionValue
      })

      return new ActionResult()
    } catch (e) {
      return new ActionResult({}, e)
    }
  }

  @action
  async fetchFolderDetails (id: number): Promise<ActionResult<FetchFolderDetailsResponse>> {
    try {
      const responseData = await $axios.$get(`/v1/discount/folder/${id}`)

      const folder = new Folder().fromJson(responseData)

      return new ActionResult({
        folder
      })
    } catch (e) {
      return new ActionResult({}, e)
    }
  }
}
