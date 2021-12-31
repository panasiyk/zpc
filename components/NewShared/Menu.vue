<template>
  <div :class="['main-menu', isMiniVariant ? 'main-menu--collapsed' : '']">
    <div class="main-menu__logo" @click="toggleMini">
      {{ isMiniVariant ? 'A' : 'Anmarto' }}
    </div>
    <el-menu
      :default-active="defaultActive"
      class="main-menu__menu"
      :collapse="isMiniVariant"
      router
    >
      <template v-for="item in items">
        <el-submenu v-if="item.children" :key="item.title" :index="item.title">
          <template slot="title">
            <i :class="`el-icon el-icon-${item.icon}`" />
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.href" :index="child.href">
            {{ child.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="item.href" :index="item.href">
          <i :class="`el-icon el-icon-${item.icon}`" />
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { vxm } from '~/store'
import INavMenuItem from '~/core/interfaces/INavMenuItem'
import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'

@Component
export default class Menu extends Vue {
  get isMiniVariant () {
    return vxm.ui.isNavMenuCollapsed
  }
  toggleMini () {
    vxm.ui.toggleNavMenu()
  }

  get defaultActive () {
    return vxm.auth.loggedIn ? '/promotion' : '/auth/login'
  }

  get items (): INavMenuItem[] {
    if (vxm.auth.loggedIn) {
      return [
        {
          title: 'Главная',
          icon: 'home',
          href: '/'
        },
        {
          title: 'Акции',
          icon: 'actions',
          href: '/promotion'
        },
        {
          title: 'Скидки',
          icon: 'discount',
          children: [
            {
              title: 'Условия предоставления',
              href: '/discount/condition'
            },
            {
              title: 'Условия рекомендации',
              href: '/discount/recommendation'
            },
            {
              title: 'Система скидок',
              href: '/discount/tree'
            }
          ]
        },
        {
          title: 'Сегментирование',
          icon: 'segment',
          children: [
            {
              title: 'Карты лояльности',
              href: `/segment/${DirectoryTypeEnum.card}`
            },
            {
              title: 'Покупатели',
              href: `/segment/${DirectoryTypeEnum.client}`
            },
            {
              title: 'Товары',
              href: `/segment/${DirectoryTypeEnum.nomenclature}`
            },
            {
              title: 'Методы оплат',
              href: `/segment/${DirectoryTypeEnum.payment_type}`
            },
            {
              title: 'Точки продаж',
              href: `/segment/${DirectoryTypeEnum.point}`
            }
          ]
        },
        {
          title: 'Заказы',
          icon: 'orders',
          href: '/order'
        },
        {
          title: 'Справочники',
          icon: 'directory',
          children: [
            {
              title: 'Карты лояльности',
              href: `/directory/${DirectoryTypeEnum.card}`
            },
            {
              title: 'Покупатели',
              href: `/directory/${DirectoryTypeEnum.client}`
            },
            {
              title: 'Товары',
              href: `/directory/${DirectoryTypeEnum.nomenclature}`
            },
            {
              title: 'Методы оплат',
              href: `/directory/${DirectoryTypeEnum.payment_type}`
            },
            {
              title: 'Точки продаж',
              href: `/directory/${DirectoryTypeEnum.point}`
            },
            {
              title: 'Ручная загрузка',
              href: '/directory/upload'
            }
          ]
        },
        {
          title: 'Отчет о скидках',
          href: '/report/discount',
          icon: 'report'
        },
        {
          title: 'Помощь',
          href: '/help',
          icon: 'help'
        }
      ]
    }

    return [
      {
        title: 'Вход',
        icon: 'login',
        href: '/auth/login'
      },
      {
        title: 'Помощь',
        href: '/help',
        icon: 'help'
      }
    ]
  }
}
</script>

<style lang="sass">
@import '../../assets/new-design/sass/vars'

.v-application ul, .v-application ol
  padding-left: 0

.main-menu
  width: 280px
  height: 100vh
  background: $blue-dark

  &__logo
    color: $white
    font-size: 30px
    font-weight: bold
    text-align: center
    padding: 23px 0
    cursor: pointer

  &__menu
    background: transparent
    border: 0

    .el-menu
      background: transparent

      &-item
        color: $white
        font-size: 13px
        height: 60px
        margin-bottom: 4px
        padding: 0 25px !important

        &:hover,
        &.is-active
          background: #035FCA

    .el-submenu
      &__title
        color: $white
        font-size: 13px
        height: 60px
        margin-bottom: 4px
        padding: 0 25px !important

        &:hover
          background: #035FCA

        i
          color: $white

      &-icon-arrow
        right: 24px

      .el-menu-item
        padding-left: 74px !important
        height: 36px
        line-height: 38px

    .el-icon
      &:before
        content: ''
        display: block
        width: 24px
        height: 24px
        background-size: contain
        margin-right: 20px

      &-home
        &:before
          background-image: url("../../assets/new-design/img/icon-home.png")

      &-actions
        &:before
          background-image: url("../../assets/new-design/img/icon-actions.png")

      &-discount
        &:before
          background-image: url("../../assets/new-design/img/icon-discount-menu.png")

      &-segment
        &:before
          background-image: url("../../assets/new-design/img/icon-segment.png")

      &-orders
        &:before
          background-image: url("../../assets/new-design/img/icon-orders.png")

      &-directory
        &:before
          background-image: url("../../assets/new-design/img/icon-directory.png")

      &-report
        &:before
          background-image: url("../../assets/new-design/img/icon-report.png")

      &-help
        &:before
          background-image: url("../../assets/new-design/img/icon-help.png")

      &-login
        &:before
          background-image: url("../../assets/new-design/img/icon-login.png")
  &--collapsed
    width: 74px

    .el-menu--collapse
      width: 74px
</style>
