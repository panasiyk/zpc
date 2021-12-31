<template>
  <div>
    <span class="create-action__title">Выберите тип справочника</span>
    <div class="grey-block">
      <el-select v-model="type">
        <el-option
          v-for="item in items"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

import SelectItem from '~/core/models/SelectItem'
import DirectoryType from '~/core/models/DirectoryType'

@Component
export default class DirectoryTypeSelect extends Vue {
  @VModel({ type: String, default: null }) type!: string | null
  @Prop({ type: Array, default: () => [] }) errorMessages!: string[]

  items: SelectItem[] = DirectoryType.getSelectItems()
}
</script>

<style scoped>

</style>
