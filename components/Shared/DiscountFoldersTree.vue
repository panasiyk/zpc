<template>
  <div>
    <v-treeview
        :items="treeConfiguration.folderItems"
        :active.sync="innerActiveIds"
        :open.sync="innerOpenIds"
        class="tree"
        activatable
        item-key="id"
        item-text="name"
        item-children="items"
        @update:active="onUpdateActive"
    >
      <template v-slot:prepend="{item, open}">
        <v-icon v-if="item.isFolder">
          {{ open ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}
        </v-icon>
        <v-icon v-else>
          mdi-label-percent-outline
        </v-icon>
      </template>
      <template v-slot:append="{item, open}">
        <v-icon v-if="item.isFolder">
          {{ open ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline' }}
        </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'nuxt-property-decorator'

import TreeConfiguration from '~/core/models/TreeConfiguration/TreeConfiguration'

@Component
export default class DiscountFoldersTree extends Vue {
  @Prop({ type: Object, required: true }) treeConfiguration!: TreeConfiguration
  @PropSync('openIds', { type: Array, default: () => [] }) innerOpenIds!: number[]
  @PropSync('activeIds', { type: Array, default: () => [] }) innerActiveIds!: number[]

  onUpdateActive (ids: number[]) {
    this.$emit('select:folder', this.treeConfiguration.isFolder(ids[0]) ? ids[0] : null)
  }
}
</script>

<style scoped>

</style>
