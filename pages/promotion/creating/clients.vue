<template>
  <div>
    <span class="create-action__title">Добавьте покупателей</span>
    <div class="grey-block">
      <div class="grey-block__row">
        <div class="create-action__segment">
          <span class="grey-block__label">Выбрать сегмент</span>
          <div class="create-action__segment-container">
            <div class="create-action__segment-container-wrapper">
              <el-tag v-for="segment in selectedDirectory" :key="segment.id" closable @close="removeSegment(segment)">
                {{ segment.description }}
              </el-tag>
            </div>
            <el-button type="primary" icon="el-icon-plus" @click="addDirectory">
              Добавить сегмент
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Promotion from '~/core/models/Promotion'
import IWithId from '~/core/interfaces/IWithId'
import { vxm } from '~/store'

@Component({ name: 'Clients' })
export default class Clients extends Vue {
  @Prop({ required: true }) promotion!:Promotion

  get selectedDirectory ():Array<any> {
    return vxm.directory.selectedDirectory
  }

  removeSegment (directory: IWithId) {
    vxm.directory.removeSelectedDirectoryItem(directory)
  }

  addDirectory () {
    this.$router.push({ name: 'directory-select' })
  }
}
</script>
<style scoped lang="sass">
.create-action__segment-container-wrapper
  flex-wrap: wrap
  .el-tag
    margin: 2px
</style>
