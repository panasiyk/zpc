<template>
  <div>
    <span class="create-action__title">Добавьте скидки</span>
    <div class="grey-block">
      <div
        v-for="discount in selectedDiscount"
        :key="discount.id"
        class="grey-block__row grey-block__row--bordered"
      >
        <div class="create-action__discount-name">
          <span class="grey-block__label">Скидка</span>
          <el-input v-model="discount.name" placeholder="" />
        </div>

        <div class="create-action__date">
          <span class="grey-block__label">Дата начала</span>
          <el-date-picker
            v-model="discount.dateCreation"
            :class="discount.dateCreation ? 'el-date-editor--filled' : ''"
            prefix-icon="el-icon-date"
            clear-icon="el-icon-close"
            format="dd.MM.yyyy"
            type="date"
          />
        </div>

        <div class="create-action__date">
          <span class="grey-block__label">Дата окончания</span>
          <el-date-picker
            v-model="discount.endDate"
            :class="discount.endDate ? 'el-date-editor--filled' : ''"
            prefix-icon="el-icon-date"
            clear-icon="el-icon-close"
            format="dd.MM.yyyy"
            type="date"
          />
        </div>

        <div class="create-action__delete-row" @click="removeItem(discount)">
          <el-button type="danger" icon="el-icon-close" circle />
        </div>
      </div>

      <div class="grey-block__row create-action__discount-controls">
        <el-button type="primary" icon="el-icon-plus" @click="addDiscounts">
          Добавить скидку
        </el-button>
        <el-button type="text" @click="removeAll">
          Удалить все
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Promotion from '~/core/models/Promotion'
import { vxm } from '~/store'

@Component({ name: 'Discounts' })
export default class Discounts extends Vue {
  @Prop({ required: true }) promotion!:Promotion

  addDiscounts () {
    this.$router.push({ name: 'discount' })
  }

  get selectedDiscount () {
    return vxm.promotion.selectedDiscount
  }

  removeItem (discount: any) {
    vxm.promotion.removeSelectedDiscountItem(discount)
    // this.promotion.selectedDiscounts.splice(index, 1)
  }

  removeAll () {
    vxm.promotion.clearSelectedDiscount()
    // this.promotion.selectedDiscounts = []
  }
}
</script>
<style lang="sass" scoped>
@import 'assets/new-design/sass/vars'

.grey-block
  &__row
    &:nth-of-type(2)
      padding-top: 0
    &--bordered
      padding-bottom: 12px
      margin-bottom: 12px
    &:last-of-type
      padding-bottom: 15px

.create-action
  &__date
    width: 35%
    display: flex
    align-items: center
    padding-right: 67px
    &:nth-of-type(2)
      width: 32%
      padding-left: 32px
      padding-right: 28px
      .grey-block__label
        white-space: nowrap
        margin-right: 18px
    .grey-block__label
      white-space: nowrap
      margin-right: 23px
    .el-date-editor
      width: 100% !important
      ::v-deep .el-input__prefix
        left: auto
        right: 7px
        font-size: 24px
      &--filled
        ::v-deep .el-input__prefix
          display: none
          ::v-deep .el-input__suffix
            font-size: 24px
            cursor: pointer
          ::v-deep .el-input__inner
            font-size: 15px
            color: $black
            padding-left: 16px
  &__discount
    &-name
      .el-input
        width: 226px
        &__inner
          padding: 0 8px
    &-controls
      .el-button
        &--primary
          font-size: 11px
          font-weight: bold
          padding: 8px 17px
        &--text
          margin-left: auto
          color: $black
          &:hover
            color: $blue
  &__delete-row
    .el-button
      padding: 2px
      margin-left: 6px

@media screen and (max-width: 1400px)
  .el-main--collapsed
    .create-action
      &__date
        flex-wrap: wrap
      &__discount-name
        .el-input
          width: 100%
</style>
