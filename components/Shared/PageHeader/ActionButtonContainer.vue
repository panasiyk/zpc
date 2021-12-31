<template>
  <div class="page-header--button-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ActionButtonContainer extends Vue {
}
</script>

<style scoped>

</style>
