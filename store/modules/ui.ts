import { createModule, mutation } from 'vuex-class-component'

const MENU_COLLAPSED_STORAGE_KEY = 'isNavMenuCollapsed'
const DONT_SHOWAGAIN_PROMOTION_SETTINGS_KEY = 'dontShowAgainPromotionSettings'

export default class UiModule extends createModule({
  namespaced: 'ui',
  strict: false,
  target: 'nuxt'
}) {
  isNavMenuCollapsed = localStorage.getItem(MENU_COLLAPSED_STORAGE_KEY) === '1'

  isDontShowAgainHidden = localStorage.getItem(DONT_SHOWAGAIN_PROMOTION_SETTINGS_KEY) === '1'

  @mutation
  hideDontShowAgain () {
    this.isDontShowAgainHidden = true
    localStorage.setItem(DONT_SHOWAGAIN_PROMOTION_SETTINGS_KEY, '1')
  }

  @mutation
  collapseNavMenu () {
    this.isNavMenuCollapsed = true
    localStorage.setItem(MENU_COLLAPSED_STORAGE_KEY, '1')
  }

  @mutation
  exposeNavMenu () {
    this.isNavMenuCollapsed = false
    localStorage.setItem(MENU_COLLAPSED_STORAGE_KEY, '0')
  }

  @mutation
  toggleNavMenu () {
    this.isNavMenuCollapsed = !this.isNavMenuCollapsed
    localStorage.setItem(MENU_COLLAPSED_STORAGE_KEY, this.isNavMenuCollapsed ? '1' : '0')
  }
}
