<template>
  <div class="topbar__profile">
    <el-popover
      placement="bottom"
      width="176"
      trigger="click"
      popper-class="topbar__profile-popover"
    >
      <div>
        <p class="topbar__profile-name">
          Александр Новиков
        </p>
        <ul class="topbar__profile-menu">
          <li><a @click="logout">Профиль</a></li>
          <li><a href="#">Выйти</a></li>
        </ul>
      </div>
      <el-avatar slot="reference">
        AN
      </el-avatar>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { vxm } from '~/store'

@Component
export default class UserDropdownButton extends Vue {
  logout () {
    vxm.auth.logout()
    this.$router.push({ name: 'auth-login' })
  }
}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'
.topbar__profile
  margin-left: auto
  height: 40px
  .el-avatar
    background: $blue
    cursor: pointer
  &-popover
    margin-top: 16px!important
    left: initial!important
    right: 35px
    padding: 12px 18px 8px 18px
    .popper__arrow
      left: 152px!important
  &-name
    font-size: 13px
    font-weight: bold
    margin-bottom: 18px
  &-menu
    list-style-type: none
    padding: 0
    a
      color: $black
      text-decoration: none
      font-size: 10px
      display: block
      margin-bottom: 8px
      &:hover,
      &:focus
        text-decoration: underline
</style>
