<template>
  <div class="topbar__filter-popover-tags">
    <p>Фильтр по точкам продаж</p>
    <div class="topbar__filter-popover-tags-container">
      <el-tag closable type="info">
        Центральный магазин
      </el-tag>
      <el-tag type="info">
        Кирова
      </el-tag>
      <el-tag type="info">
        Ленина,62
      </el-tag>
      <el-tag type="info">
        Останкинский магазин
      </el-tag>
      <el-button type="text">
        Очистить
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'TagsFilter' })
export default class TagsFilter extends Vue {
}
</script>
<style scoped lang="sass">
@import 'assets/new-design/sass/vars'
.topbar__filter-popover-tags
  p
    font-size: 13px
    margin-top: 5px
  &-container
    width: 216px
    min-height: 165px
    position: relative
    padding: 16px 5px 24px 15px
    border: 1px solid #E2E2E3
    border-radius: 4px
    text-align: left
    margin-top: 12px
    .el-tag
      overflow: hidden !important
      text-overflow: ellipsis
      max-width: 188px
      font-size: 14px
      padding-right: 18px
      margin-right: 5px
      .el-icon-close
        &:hover
          &:before
            border-radius: 50%
            background-color: #909399
    .el-button
      position: absolute
      font-size: 10px
      color: #797979
      right: 13px
      bottom: -4px
      &:hover
        color: $blue
</style>
