import Vuex from 'vuex'
import Vue from 'vue'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import DirectoryModule from '~/store/modules/directory'
import SegmentModule from '~/store/modules/segment'
import AuthModule from '~/store/modules/auth'
import ReportModule from '~/store/modules/report'
import OrderModule from '~/store/modules/order'
import DiscountModule from '~/store/modules/discount'
import PromotionModule from '~/store/modules/promotion'
import UiModule from '~/store/modules/ui'
import LocationModule from '~/store/modules/location'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(DirectoryModule),
    ...extractVuexModule(SegmentModule),
    ...extractVuexModule(AuthModule),
    ...extractVuexModule(ReportModule),
    ...extractVuexModule(OrderModule),
    ...extractVuexModule(DiscountModule),
    ...extractVuexModule(PromotionModule),
    ...extractVuexModule(UiModule),
    ...extractVuexModule(LocationModule)
  }
})

export const vxm = {
  directory: createProxy(store, DirectoryModule),
  segment: createProxy(store, SegmentModule),
  auth: createProxy(store, AuthModule),
  report: createProxy(store, ReportModule),
  order: createProxy(store, OrderModule),
  discount: createProxy(store, DiscountModule),
  promotion: createProxy(store, PromotionModule),
  ui: createProxy(store, UiModule),
  location: createProxy(store, LocationModule)
}

export default () => store
