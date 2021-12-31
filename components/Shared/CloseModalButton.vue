<template>
  <v-btn outlined @click="$emit('click')">
    <template v-if="showLabel">
      {{ label }}
    </template>
    <v-icon>
      mdi-close
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CloseModalButton extends Vue {
  @Prop({ type: String, default: 'Отмена' }) label!: string
  @Prop({ type: Boolean, default: true }) showLabel!: boolean
}
</script>

<style scoped>

</style>
