<template>
  <div>
    <span class="create-action__title">Укажите точки продаж, в которых будет действовать акция</span>
    <div class="grey-block">
      <div :class="['grey-block__row', !promotion.isForAllPoints ? 'grey-block__row--bordered' : '']">
        <div class="create-action__switch">
          <el-switch
            v-model="promotion.isForAllPoints"
            :width="50"
            active-color="#909399"
            inactive-color="#409EFF"
            inactive-text="Все точки продаж"
            @change="onAllPointsSwitcherChange"
          />
        </div>

        <div class="create-action__segment">
          <span class="grey-block__label">Выбрать сегмент</span>
          <div class="create-action__segment-container">
            <div class="create-action__segment-container-wrapper">
              <el-tag v-for="segment in selectedSegment" :key="segment.id" closable @close="removeSegment(segment)">
                {{ segment.name }}
              </el-tag>
            </div>
            <el-button type="primary" icon="el-icon-plus" :disabled="!promotion.isForAllPoints" @click="addSegment">
              Добавить сегмент
            </el-button>
          </div>
        </div>
      </div>

      <div v-if="promotion.isForAllPoints" class="grey-block__row">
        <regions-box v-model="selectedRegions" />
        <cities-box v-model="selectedCities" :regions="selectedRegions" />
        <points-box v-model="selectedPoints" :cities="selectedCities" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Promotion from '~/core/models/Promotion'
import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'
import RegionsBox from '~/components/Page/Promotion/Components/RegionsBox.vue'
import CitiesBox from '~/components/Page/Promotion/Components/CitiesBox.vue'
import PointsBox from '~/components/Page/Promotion/Components/PointsBox.vue'
import { vxm } from '~/store'
import { Segment } from '~/core/interfaces/Segment'

@Component({
 name: 'SegmentsAndPoints',
  components: { PointsBox, CitiesBox, RegionsBox }
})
export default class SegmentsAndPoints extends Vue {
  @Prop({ required: true }) promotion!: Promotion

  selectedRegions: IWithIdAndLabel[] = []
  selectedCities: IWithIdAndLabel[] = []
  selectedPoints: IWithIdAndLabel[] = []

  beforeMount () {
    this.promotion.isForAllPoints = !!vxm.promotion.selectedSegment.length
  }

  get selectedSegment () {
    return vxm.promotion.selectedSegment
  }

  removeSegment (segmentItem: Segment) {
    vxm.promotion.removeSelectedSegmentItem(segmentItem)
  }

  onAllPointsSwitcherChange () {
    vxm.promotion.clearSelectedSegment()
  }

  addSegment () {
    this.$router.push({ name: 'segment-select' })
  }
}
</script>
<style lang="sass" scoped>
@import 'assets/new-design/sass/vars'

.create-action
  &__title
    margin-bottom: 0
  &__switch
    margin-right: 83px
    ::v-deep .el-switch
      &__label,
      &.is-active
        color: #909399
        white-space: nowrap
        margin-right: 34px
        span
          font-size: 15px
  &__segment-container
    .el-button.is-disabled
      background: #D7D7D7
      border-color: transparent
    &-wrapper
      flex-wrap: wrap
      .el-tag
        margin: 2px
</style>
