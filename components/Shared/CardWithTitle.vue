<template>
  <v-card class="card-with-title">
    <v-card-title v-if="$slots.title" class="full-width">
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class CardWithTitle extends Vue {
}
</script>

<style scoped>

</style>
