<template>
  <v-tooltip max-width="300px" right open-on-hover>
    <template #activator="{on, attrs}">
      <span v-bind="attrs" v-on="on">
        Группы условий
      </span>
    </template>
    Задайте набор правил предоставления любой сложности, оперируя условиями, относящимися к разным группам
  </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class MainCardHeader extends Vue {
}
</script>

<style scoped>

</style>
