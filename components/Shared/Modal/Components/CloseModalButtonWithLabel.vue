<template>
  <page-header-title>
    <v-icon class="mr-4" @click="_onClick">
      mdi-arrow-left
    </v-icon>
    {{ title }}
  </page-header-title>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import PageHeaderTitle from '~/components/Shared/PageHeader/PageHeaderTitle.vue'

@Component({
  components: { PageHeaderTitle }
})
export default class CloseModalButtonWithLabel extends Vue {
  @Prop({ type: Function, default: () => ({}) }) onClick!: Function
  @Prop({ type: String, default: '' }) title!: string

  _onClick () {
    this.onClick()
    this.$emit('click:back-button')
  }
}
</script>

<style scoped>

</style>
