<template>
  <v-card class="main-area" elevation="0">
    <v-card-text v-if="!noPadding">
      <slot />
    </v-card-text>
    <slot v-else />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class MainArea extends Vue {
  @Prop({ type: Boolean, default: false }) noPadding!: boolean
}
</script>

<style scoped>

</style>
