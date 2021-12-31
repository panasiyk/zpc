<template>
  <div class="page">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Page extends Vue {
}
</script>

<style scoped>

</style>
