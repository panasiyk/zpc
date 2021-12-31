<template>
  <card-with-title>
    <template #title>
      <main-card-header />
    </template>
    <conditions-folder
        v-for="folder in conditionsModel.folders"
        :key="folder.id"
        :folder="folder"
        :options="options"
        class="mb-4"
        @add-folder="onAddFolder"
        @add-condition="onAddCondition"
    />
  </card-with-title>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import CardWithTitle from '~/components/Shared/CardWithTitle.vue'
import MainCardHeader from '~/components/Shared/ConditionsWidget/MainCardHeader.vue'
import ConditionsFolder from '~/components/Shared/ConditionsWidget/ConditionsFolder.vue'
import ConditionsWidgetOptions from '~/core/models/ConditionsWidget/ConditionsWidgetOptions'
import ConditionsWidgetModel from '~/core/models/ConditionsWidget/ConditionsWidgetModel'

@Component({
  components: { ConditionsFolder, MainCardHeader, CardWithTitle }
})
export default class ConditionsWidget extends Vue {
  @Prop({ type: Object, required: true }) options!: ConditionsWidgetOptions
  @Prop({ type: Object, required: true }) conditionsModel!: ConditionsWidgetModel

  onAddFolder ({ parentUuid }: { parentUuid: string }) {
    this.conditionsModel.addFolder(parentUuid)
  }

  onAddCondition ({ parentUuid }: { parentUuid: string }) {
    this.conditionsModel.addCondition(parentUuid)
  }
}
</script>

<style scoped>

</style>
