<template>
  <v-text-field v-model="conditionValue" label="Значение" dense outlined />
</template>

<script lang="ts">
import { Vue, Component, VModel } from 'nuxt-property-decorator'

@Component
export default class StringValue extends Vue {
  @VModel({ type: String, default: null }) conditionValue!: string | null
}
</script>

<style scoped>

</style>
