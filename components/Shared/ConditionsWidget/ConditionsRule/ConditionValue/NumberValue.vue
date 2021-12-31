<template>
  <v-text-field v-model="conditionValue" label="Значение" dense outlined />
</template>

<script lang="ts">
import { Vue, Component, VModel } from 'nuxt-property-decorator'

@Component
export default class NumberValue extends Vue {
  @VModel({ type: Number, default: null }) conditionValue!: number | null
}
</script>

<style scoped>

</style>
