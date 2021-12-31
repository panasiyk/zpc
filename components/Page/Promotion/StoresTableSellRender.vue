<template>
  <div class="root">
    <template v-if="item === 'all'">
      <el-tag type="success" class="table-actions__tag" disable-transitions>
        Все точки
      </el-tag>
    </template>
    <template v-else>
      <div class="short-stores">
        <el-tag
          v-for="store in item"
          :key="store"
          class="no-wrap table-actions__tag"
          disable-transitions
          type="info"
        >
          {{ store }}
        </el-tag>
      </div>
      <el-popover
        trigger="click"
        placement="bottom-end"
        popper-class="table-actions__popup"
        width="207"
      >
        <div class="table-actions__popup-content">
          <el-tag
            v-for="store in item"
            :key="store"
            disable-transitions
            class="no-wrap table-actions__tag"
            type="info"
          >
            {{ store }}
          </el-tag>
        </div>
        <div slot="reference">
          <div class="arrow-bottom">
            <btn-arrow side="bottom" />
          </div>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import BtnArrow from '~/components/NewShared/BtnArrow.vue'

@Component({
 name: 'StoresTableSellRender',
  components: { BtnArrow }
})
export default class StoresTableSellRender extends Vue {
  @Prop({ required: true }) item!: string | Array<string>
}
</script>
<style scoped lang="sass">
.root
  display: flex
  .short-stores
    height: 32px
    overflow: hidden
.arrow-bottom
  display: inline
.el-popover__reference
  padding-top: 5px
</style>
