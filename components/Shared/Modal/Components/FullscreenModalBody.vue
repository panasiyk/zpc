<template>
  <v-card elevation="0">
    <v-card-text>
      <slot name="header">
        <div v-if="title" class="mb-4">
          {{ title }}
        </div>
      </slot>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class FullscreenModalBody extends Vue {
  @Prop({ type: String, default: '' }) title!: string
}
</script>

<style scoped>

</style>
