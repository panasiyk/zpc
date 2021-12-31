<template>
  <div class="page">
    <tree-page-header />

    <page-content>
      <card-with-title>
        <template #title>
          Дерево скидок
          <tree-information-tooltip />
        </template>
        <main-area no-padding>
          <discounts-tree
              :tree-configuration="treeConfiguration"
              @update:open="onUpdateOpen"
              @select:folder="onSelectFolder"
          />
        </main-area>
      </card-with-title>
    </page-content>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import TreePageHeader from '~/components/Page/Discount/TreePageHeader.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import CardWithTitle from '~/components/Shared/CardWithTitle.vue'
import DiscountsTree from '~/components/Shared/DiscountsTree.vue'
import MainArea from '~/components/Shared/MainArea.vue'
import { vxm } from '~/store'
import TreeConfiguration from '~/core/models/TreeConfiguration/TreeConfiguration'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import BusEvent from '~/core/enums/BusEvent'
import TreeInformationTooltip from '~/components/Page/Discount/TreeInformationTooltip.vue'

@Component({
  components: { TreeInformationTooltip, MainArea, DiscountsTree, CardWithTitle, PageContent, TreePageHeader },
  beforeRouteLeave (_, __, next) {
    vxm.discount.tree.reset()

    next()
  }
})
export default class TreePage extends mixins(LoadingMixin) {
  treeConfiguration: TreeConfiguration = new TreeConfiguration('/v1/discount/options/tree')

  mounted () {
    this.$nuxt.$off(BusEvent.discountSaved, this.fetchData)
    this.$nuxt.$off(BusEvent.folderSaved, this.fetchData)
    this.$nuxt.$on(BusEvent.discountSaved, this.fetchData)
    this.$nuxt.$on(BusEvent.folderSaved, this.fetchData)

    this.fetchData()
  }

  async fetchData () {
    const result = await this.wrapLoading(() => this.treeConfiguration.fetchData())

    if (!result.isSuccess) {
      alert(result.errorMessage)
    }
  }

  onUpdateOpen (ids: number[]) {
    vxm.discount.tree.setOpenedIds(ids)
  }

  onSelectFolder (id: number | null) {
    vxm.discount.tree.setActiveFolderId(id)
  }
}
</script>

<style scoped>

</style>
