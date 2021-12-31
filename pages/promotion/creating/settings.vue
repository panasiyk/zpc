<template>
  <div>
    <el-input v-model="promotion.name" class="create-action__name" placeholder="Введите название" />

    <div class="grey-block">
      <div class="grey-block__row grey-block__row--bordered">
        <div class="create-action__date">
          <span class="grey-block__label">Дата начала</span>
          <el-date-picker
            v-model="promotion.startDate"
            :class="promotion.startDate ? 'el-date-editor--filled' : ''"
            prefix-icon="el-icon-date"
            clear-icon="el-icon-close"
            format="dd.MM.yyyy   |   HH:mm"
            type="datetime"
          />
        </div>
        <div class="create-action__date">
          <span class="grey-block__label">Дата окончания</span>
          <el-date-picker
            v-model="promotion.endDate"
            :class="promotion.endDate ? 'el-date-editor--filled' : ''"
            prefix-icon="el-icon-date"
            clear-icon="el-icon-close"
            format="dd.MM.yyyy   |   HH:mm"
            type="datetime"
          />
        </div>
        <div class="create-action__checkbox">
          <el-checkbox v-model="promotion.persistent">
            Действует постоянно
          </el-checkbox>
        </div>
      </div>
      <div class="grey-block__row">
        <div class="create-action__days">
          <span class="grey-block__label">Дни недели, когда активна акция</span>
          <el-select v-model="promotion.activeDays" multiple>
            <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>

    <div v-if="!isDontShowAgainVisible" class="create-action__alert">
      <el-alert type="warning" show-icon>
        <span class="el-alert__text">Для создания акций нужно загрузить Вашу базу данных из 1С.<br>Вы можете это сделать, нажав кнопку выгрузки данных </span>
        <el-button type="primary">
          Загрузить данные
        </el-button>
        <el-button type="text" @click="dontShowAgain()">
          Больше не показывать
        </el-button>
      </el-alert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Promotion from '~/core/models/Promotion'
import WeekDays from '~/core/enums/WeekDayEnum'
import { vxm } from '~/store'

@Component({ name: 'Settings' })
export default class Settings extends Vue {
  @Prop({ required: true }) promotion!:Promotion

  get days () {
    return WeekDays
  }

  get isDontShowAgainVisible () {
    return vxm.ui.isDontShowAgainHidden
  }

  dontShowAgain () {
    vxm.ui.hideDontShowAgain()
  }
}
</script>
<style lang="sass" scoped>
@import 'assets/new-design/sass/vars'

.grey-block
  &__row
    &:nth-of-type(2)
      padding-bottom: 0

.create-action
  &__name
    font-size: 15px
    width: 100%
    padding-bottom: 16px
    ::v-deep input
      border-radius: 0
      border: 0
      border-bottom: 1px solid #F2F2F2
      padding: 0 0 10px

    ::placeholder
      color: #909399

  &__date
    width: 33%
    .el-date-editor
      width: 216px !important

      ::v-deep .el-input__prefix
        left: auto
        right: 14px
        font-size: 24px
      &--filled
        ::v-deep .el-input__prefix
          display: none
          ::v-deep .el-input__suffix
            font-size: 24px
            cursor: pointer
            .el-input__icon
              transition: none
              &:before
                content: '\e6db'
                font-family: element-icons
                font-style: normal
                font-weight: 400

      ::v-deep .el-input__inner
        font-size: 15px
        color: $black
        padding-left: 16px

    &:nth-of-type(2)
      width: 36%
      padding-left: 32px

  &__checkbox
    width: auto
    margin-left: 80px

    ::v-deep .el-checkbox__label
      font-size: 15px
      color: #909399
      padding-left: 16px

  &__days
    width: 100%
    display: flex
    align-items: center

    .grey-block__label
      white-space: nowrap

    .el-select
      width: 100%
      padding-right: 108px

      ::v-deep &__tags
        padding-left: 6px

      ::v-deep .el-tag__close
        background: transparent

      ::v-deep .el-tag--small
        padding: 0 9px

  &__alert
    margin-top: 15px
    width: 766px

    ::v-deep .el-alert
      padding: 8px 11px

      &__description
        display: flex
        align-items: center
        margin: 0

      &__text
        font-size: 11px
        color: #909399
        line-height: 15px
        margin-left: 5px
        margin-right: 50px

      &__icon.is-big
        font-size: 26px

      .el-button
        font-size: 12px
        padding: 9px 21px

        &--text
          margin-left: 19px
          font-size: 11px
          color: #909399

      &__closebtn
        font-size: 18px
        top: 14px
        right: 13px

</style>
