<template>
  <card-with-title>
    <template #title>
      <div>
        <v-btn text small @click="onAddConditionClick">
          Добавить условие
        </v-btn>
        <v-btn text small @click="onAddFolderClick">
          Добавить папку
        </v-btn>
      </div>
    </template>
    <v-divider class="my-4" />
    <template v-for="(item, index) in folder.items">
      <conditions-folder
          v-if="item.isFolder"
          :key="item.id"
          :folder="item"
          :options="options"
          class="mb-4"
          @add-folder="$emit('add-folder', $event)"
          @add-condition="$emit('add-condition', $event)"
      />
      <conditions-rule v-if="item.isCondition" :key="item.id" :condition="item" :options="options" />
      <v-divider v-if="isDividerVisible(index)" :key="`divider_${index}`" class="mb-6" />
    </template>
  </card-with-title>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import CardWithTitle from '../CardWithTitle.vue'
import ConditionsRule from '~/components/Shared/ConditionsWidget/ConditionsRule/ConditionsRule.vue'
import WidgetModelItem from '~/core/models/ConditionsWidget/WidgetModelItem'
import ConditionsWidgetOptions from '~/core/models/ConditionsWidget/ConditionsWidgetOptions'

@Component({
  components: { ConditionsRule, CardWithTitle },
  name: 'conditions-folder'
})
export default class ConditionsFolder extends Vue {
  @Prop({ type: Object, required: true }) folder!: WidgetModelItem
  @Prop({ type: Object, required: true }) options!: ConditionsWidgetOptions

  isDividerVisible (index: number) {
    return this.folder.items[index]?.isCondition && this.folder.items[index + 1]?.isCondition
  }

  onAddFolderClick () {
    this.$emit('add-folder', { parentUuid: this.folder.id })
  }

  onAddConditionClick () {
    this.$emit('add-condition', { parentUuid: this.folder.id })
  }
}
</script>

<style scoped>

</style>
