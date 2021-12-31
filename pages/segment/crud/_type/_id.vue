<template>
  <page>
    <segment-crud-page-header />
    <page-content>
      <card-with-title class="mb-4">
        <template #title>
          Частота и название
        </template>
      </card-with-title>
      <conditions-widget
          :options="widgetOptions"
          :conditions-model="segmentConditions"
      />
    </page-content>
  </page>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { cloneDeep } from 'lodash'

import LoadingMixin from '../../../../core/mixins/LoadingMixin'
import ConditionsWidgetOptions from '~/core/models/ConditionsWidget/ConditionsWidgetOptions'
import Page from '~/components/Shared/Page.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import SegmentCrudPageHeader from '~/components/Page/Segment/Crud/SegmentCrudPageHeader.vue'
import ConditionsWidget from '~/components/Shared/ConditionsWidget/ConditionsWidget.vue'
import CardWithTitle from '~/components/Shared/CardWithTitle.vue'
import { vxm } from '~/store'
import ConditionsWidgetModel from '~/core/models/ConditionsWidget/ConditionsWidgetModel'

@Component({
  components: { CardWithTitle, ConditionsWidget, SegmentCrudPageHeader, PageContent, Page },
  middleware ({ params: { type, id }, error }: Context) {
    if (!type || !id) {
      error({ statusCode: 404 })
    }
  }
})
export default class SegmentCrudPage extends mixins(LoadingMixin) {
  widgetOptions: ConditionsWidgetOptions = new ConditionsWidgetOptions()
  originalSegmentConditions: ConditionsWidgetModel = new ConditionsWidgetModel([])
  segmentConditions: ConditionsWidgetModel = new ConditionsWidgetModel([])

  get segmentId () {
    return parseInt(this.$route.params.id)
  }

  get directoryType () {
    return this.$route.params.type
  }

  mounted () {
    this.fetchOptions()

    if (this.segmentId) {
      this.fetchSegmentConditions()
    }
  }

  async fetchOptions () {
    const result = await this.widgetOptions.init(`/v1/rules/options?widget=segment&directoryType=${this.directoryType}`)

    if (!result.isSuccess) {
      alert(result.errorMessage)
    }
  }

  async fetchSegmentConditions () {
    const result = await vxm.segment.fetchSegment(this.segmentId)

    if (result.isSuccess) {
      this.$set(this, 'originalSegmentConditions', cloneDeep(result.data?.segment?.conditions))
      this.$set(this, 'segmentConditions', cloneDeep(result.data?.segment?.conditions))
    } else {
      alert(result.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
