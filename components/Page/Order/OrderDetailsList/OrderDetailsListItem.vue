<template>
  <v-list-item :href="href">
    <v-list-item-content>
      <v-list-item-subtitle style="white-space: initial">
        {{ item.subtitle }}
      </v-list-item-subtitle>
      <v-list-item-title>
        {{ title }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import IWithTitleAndSubtitle from '~/core/interfaces/IWithTitleAndSubtitle'

@Component
export default class OrderDetailsListItem extends Vue {
  @Prop({ type: Object, required: true }) item!: IWithTitleAndSubtitle

  get title () {
    return this.item.title === undefined || this.item.title === null ? '-' : this.item.title
  }

  get href () {
    if (!this.item.title) {
      return undefined
    }

    return this.item.link ? this.item.title : undefined
  }
}
</script>

<style scoped>

</style>
