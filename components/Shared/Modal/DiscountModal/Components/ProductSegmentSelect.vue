<template>
  <segment-select
      v-model="segments"
      :directory-type="directoryType"
      :error-messages="errorMessages"
      :label="label"
      multiple
  />
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'

import SegmentSelect from '../../../SegmentSelect.vue'
import DirectoryTypeEnum from '../../../../../core/enums/DirectoryTypeEnum'

@Component({
  components: { SegmentSelect }
})
export default class ProductSegmentSelect extends Vue {
  @VModel({ type: Array, default: () => [] }) segments!: number[]
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]
  @Prop({ type: String, default: 'Сегменты' }) label!: string

  get directoryType () {
    return DirectoryTypeEnum.nomenclature
  }
}
</script>

<style scoped>

</style>
