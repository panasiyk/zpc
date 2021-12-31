<template>
  <validation-observer v-slot="{handleSubmit}">
    <v-form @submit.prevent="handleSubmit(submit)">
      <validation-provider v-slot="{errors}" rules="required" name="Название" vid="name">
        <v-text-field v-model="folder.name" :error-messages="errors" label="Название *" />
      </validation-provider>
      <validation-provider v-slot="{errors}" rules="required" name="Родительская папка" vid="folder">
        <select-folder-input v-model="folder.parentId" :open-ids="openIds" :error-messages="errors" />
      </validation-provider>
      <validation-provider v-slot="{errors}" rules="required" name="Группа" vid="group">
        <folder-group-select v-model="folder.groupId" :error-messages="errors" />
      </validation-provider>
      <v-divider />
      <v-switch v-model="folder.isLimitedBySize" label="Ограничение по размеру" inset />
      <template v-if="folder.isLimitedBySize">
        <validation-provider v-slot="{errors}" rules="required" name="Тип ограничения" vid="restriction_type">
          <folder-restriction-type-select v-model="folder.restrictionTypeId" :error-messages="errors" />
        </validation-provider>
        <validation-provider v-slot="{errors}" rules="required" name="Область ограничения" vid="restriction_area">
          <folder-restriction-area-select v-model="folder.restrictionAreaId" :error-messages="errors" />
        </validation-provider>
        <validation-provider
            v-slot="{errors}"
            :rules="restrictionValueRules"
            name="Размер ограничения"
            vid="restriction_value"
        >
          <v-text-field
              v-model.number="folder.restrictionValue"
              :error-messages="errors"
              label="Размер ограничения"
              outlined
          />
        </validation-provider>
      </template>
      <v-btn :loading="isLoading" :disabled="isLoading" color="primary" type="submit">
        Сохранить
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch } from 'nuxt-property-decorator'

import SelectFolderInput from '~/components/Shared/SelectFolderInput.vue'
import Folder from '~/core/models/Folder'
import FolderGroupSelect from '~/components/Shared/DiscountFolderForm/FolderGroupSelect.vue'
import FolderRestrictionTypeSelect from '~/components/Shared/DiscountFolderForm/FolderRestrictionTypeSelect.vue'
import FolderRestrictionAreaSelect from '~/components/Shared/DiscountFolderForm/FolderRestrictionAreaSelect.vue'
import { vxm } from '~/store'
import LoadingMixin from '~/core/mixins/LoadingMixin'

@Component({
  components: { FolderRestrictionAreaSelect, FolderRestrictionTypeSelect, FolderGroupSelect, SelectFolderInput }
})
export default class DiscountFolderForm extends mixins(LoadingMixin) {
  @Prop({ type: Object, required: true }) folder!: Folder
  @Prop({ type: Array, default: () => [] }) openIds!: number[]

  get restrictionValueRules () {
    return this.folder.restrictionTypeId === 1 ? 'required|min_value:1|max_value:100' : 'required|min_value:0'
  }

  @Watch('folder.isLimitedBySize')
  onLimitFlagChange () {
    if (!this.folder.isLimitedBySize) {
      this.folder.restrictionTypeId = null
      this.folder.restrictionAreaId = null
      this.folder.restrictionValue = 0
    }
  }

  async submit () {
    const result = await this.wrapLoading(() => vxm.discount.folder.saveFolder(this.folder))

    if (result.isSuccess) {
      this.$emit('saved')
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
