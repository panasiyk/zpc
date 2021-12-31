<template>
  <div>
    <h1>
      {{ error.message }}
    </h1>
    <nuxt-link to="/">
      На главную
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types'

@Component({ layout: 'empty' })
export default class ErrorPage extends Vue {
  @Prop({ type: Object, required: true }) error!: NuxtError
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
