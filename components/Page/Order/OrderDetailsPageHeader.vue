<template>
  <page-header>
    <page-header-title>
      {{ title }}
    </page-header-title>
  </page-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import PageHeader from '../../Shared/PageHeader/PageHeader.vue'
import PageHeaderTitle from '../../Shared/PageHeader/PageHeaderTitle.vue'

@Component({
  components: { PageHeaderTitle, PageHeader }
})
export default class OrderDetailsPageHeader extends Vue {
  @Prop({ type: String, default: 'Заказ' }) title!: string
}
</script>

<style scoped>

</style>
