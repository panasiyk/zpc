<template>
  <div class="create-action__regions">
    <div class="create-action__regions-head">
      <span class="grey-block__label">{{ title }}</span>
      <el-checkbox :value="selectAll" :indeterminate="false" @change="changeAll">
        Все
      </el-checkbox>
    </div>
    <div class="create-action__regions-body">
      <div class="create-action__regions-title">
        <el-input v-model="query" :placeholder="innerTitle" />
      </div>
      <el-checkbox-group v-model="selectedItems" @change="changeSingle">
        <el-checkbox v-for="item in visibleItems" :key="item.id" :label="item">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'

@Component
export default class BoxWithCheckboxes extends Vue {
  @VModel({ type: Array, default: () => [] }) selectedItems!: IWithIdAndLabel[]
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) innerTitle!: string
  @Prop({ type: Array, default: () => [] }) items!: IWithIdAndLabel[]
  @Prop({ type: Boolean, default: false }) isLoading!: boolean

  query: string = ''
  selectAll: boolean = false

  get visibleItems (): IWithIdAndLabel[] {
    return this.query
      ? this.items.filter(item => item.label.toLowerCase().includes(this.query.toLowerCase()))
      : this.items
  }

  changeSingle () {
    if (this.items.length === this.selectedItems.length) {
      this.selectAll = true
    }
  }

  changeAll (value: boolean) {
    this.selectAll = value
    this.selectedItems = this.selectAll ? [...this.visibleItems] : []
  }
}
</script>

<style lang="sass" scoped>
@import '../../../../assets/new-design/sass/vars'
.el-checkbox
  color: #909399
.create-action
  &__regions
    width: 31%
    margin-right: 3.5%

    &:last-of-type
      margin-right: 0

    &-head
      display: flex
      justify-content: space-between

      ::v-deep .el-checkbox__label
        color: #909399

    &-body
      margin-top: 15px
      background: $white
      border: 1px solid #E2E2E3
      border-radius: 4px
      padding: 14px 9px 15px 18px
      position: relative

    &-title
      z-index: 2
      border-bottom: 1px solid #DCDFE6
      position: absolute
      background: $white
      top: 0
      width: calc(100% - 56px)

    .el-checkbox-group
      height: 166px
      padding-top: 45px
      overflow-y: scroll

      .el-checkbox
        display: block
        margin-right: 0
        margin-bottom: 10px
    ::v-deep input
      border-radius: 0
      border: 0
      padding: 0

      ::placeholder
        color: #909399

</style>
