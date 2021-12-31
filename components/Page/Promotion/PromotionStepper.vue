<template>
  <el-steps :active="activeStep" finish-status="success" class="steps">
    <el-step title="Настройка" />
    <el-step title="Точки продаж" />
    <el-step title="Скидки" />
    <el-step title="Покупатели" />
    <el-step title="Рассылка" />
  </el-steps>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'nuxt-property-decorator'

@Component({ name: 'PromotionStepper' })
export default class PromotionStepper extends Vue {
  @PropSync('step', { default: 0 }) activeStep!: number
}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'

.steps
  background: #F6F6F6
  border: 1px solid #F2F2F2
  border-radius: 4px
  box-shadow: 0 2px 12px rgba(0, 0, 0, .12)
  margin-bottom: 19px
  margin-top: -7px

  .el-step
    flex-basis: auto !important
    display: flex
    align-items: center

    &__line
      display: none

    &__head
      padding: 11px 10px 10px 24px

      .el-step
        &__icon
          color: $white
          font-size: 13px
          font-weight: bold
          border: 0
          background: #D7D7D7
          width: 29px
          height: 29px

      &.is-process
        background: $white

        .el-step
          &__icon
            background: $blue

    &__main
      height: 100%

    &__title
      font-size: 18px
      line-height: 1
      color: #D7D7D7
      font-weight: normal
      white-space: nowrap
      height: 100%
      padding-top: 15px
      padding-right: 16px
      margin-right: 8px

      &.is-process
        color: $blue
        background: $white
        position: relative
        margin-right: 18px

        &:before
          content: ''
          border: 25px solid transparent
          border-left: 16px solid $white
          display: block
          position: absolute
          right: -41px
          top: 0

    &__description
      display: none

    &:not(:first-of-type)
      .el-step
        &__title
          &.is-process
            position: relative

            &:after
              content: ''
              border: 25px solid transparent
              border-left: 16px solid #F6F6F6
              display: block
              position: absolute
              left: -63px
              top: 0
</style>
