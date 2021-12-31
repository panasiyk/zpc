<template>
  <el-container>
    <Menu />
    <el-container>
      <nuxt />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import Menu from '~/components/NewShared/Menu.vue'

@Component({ components: { Menu } })
export default class DefaultLayout extends Vue {}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'

html
  font-family: $helvetica
  font-size: 16px
  word-spacing: 0
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
  color: $black
  overflow-x: hidden

*,
*::before,
*::after
  box-sizing: border-box
  margin: 0

body
  background-color: #f2f2f2
</style>
