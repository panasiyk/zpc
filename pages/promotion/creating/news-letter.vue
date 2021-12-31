<template>
  <div class="grey-block">
    <div class="grey-block__row">
      <div class="create-action__segment">
        <span class="grey-block__label">Выбрать рассылку</span>
        <div class="create-action__segment-container">
          <el-tag closable>
            Магазины Дальнего Востока
          </el-tag>
          <el-button type="primary">
            Выбрать
          </el-button>
        </div>
        <el-button type="primary" icon="el-icon-plus">
          Создать новую рассылку
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Promotion from '~/core/models/Promotion'

@Component({ name: 'NewsLetter' })
export default class NewsLetter extends Vue {
  @Prop({ required: true }) promotion!:Promotion
}
</script>
<style lang="sass" scoped>
.create-action
  &__segment
    &-container
      .el-button
        margin-left: auto!important
    .el-button
      margin-left: 79px
</style>
