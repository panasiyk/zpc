<template>
  <page-header>
    <page-header-title>
      Отчёт о примененных скидках
    </page-header-title>
  </page-header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import PageHeader from '../../Shared/PageHeader/PageHeader.vue'
import PageHeaderTitle from '../../Shared/PageHeader/PageHeaderTitle.vue'

@Component({
  components: { PageHeaderTitle, PageHeader }
})
export default class ReportDiscountPageHeader extends Vue {
}
</script>

<style scoped>

</style>
