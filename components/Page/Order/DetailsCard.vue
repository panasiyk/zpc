<template>
  <v-card flat>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <order-details-list :items="items" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import OrderDetailsList from './OrderDetailsList/OrderDetailsList.vue'
import IWithTitleAndSubtitle from '~/core/interfaces/IWithTitleAndSubtitle'

@Component({
  components: { OrderDetailsList }
})
export default class DetailsCard extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Array, default: () => [] }) items!: IWithTitleAndSubtitle[]
}
</script>

<style scoped>

</style>
