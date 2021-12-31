<template>
  <div class="page-header--title">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageHeaderTitle extends Vue {
}
</script>

<style scoped>

</style>
