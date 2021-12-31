<template>
  <page-header>
    <page-header-title class="mr-4">
      Дерево скидок
    </page-header-title>
    <create-discount-button class="mr-auto" />
  </page-header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'
import PageHeaderTitle from '~/components/Shared/PageHeader/PageHeaderTitle.vue'
import CreateDiscountButton from '~/components/Shared/CreateDiscountButton.vue'

@Component({
  components: { CreateDiscountButton, PageHeaderTitle, PageHeader }
})
export default class TreePageHeader extends Vue {
}
</script>

<style scoped>

</style>
