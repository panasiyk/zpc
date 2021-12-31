<template>
  <div class="topbar__settings">
    <el-popover
      placement="bottom"
      popper-class="topbar__settings-popover"
      width="207"
      title="Показывать столбцы"
      trigger="click"
    >
      <div>
        <el-checkbox-group v-model="tableConfiguration.selectedColumns">
          <el-checkbox
            v-for="column in tableConfiguration.columns"
            :key="column.value"
            :label="column.value"
          >
            {{ column.text }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button slot="reference" />
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import TableConfiguration from '~/core/models/Table/TableConfiguration'

@Component
export default class SelectedColumnsButton extends Vue {
  @Prop({ type: Object, required: true }) tableConfiguration!: TableConfiguration
}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'
.topbar__settings
  margin-left: 15px
  height: 40px
  .el-button
    height: 40px
    width: 40px
    background-image: url("assets/new-design/img/icon-settings.png")
    background-position: center
    background-repeat: no-repeat
    background-size: 20px
    border-color: $blue
    padding: 0
  &-popover
    padding: 8px 0 14px
    .el-popover__title
      font-size: 14px
      color: #606266
      padding: 0 15px
    .el-checkbox
      padding: 4px 15px
      width: 100%
      &:last-of-type
        margin-top: 4px
      &:hover
        background: #F2F2F2
      &__label
        font-size: 12px
        color: #606266
  &+.topbar__profile
    margin-left: 40px
</style>
