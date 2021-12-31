<template>
  <v-list dense>
    <order-details-list-item v-for="(item, index) in items" :key="index" :item="item" />
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import IWithTitleAndSubtitle from '~/core/interfaces/IWithTitleAndSubtitle'
import OrderDetailsListItem from '~/components/Page/Order/OrderDetailsList/OrderDetailsListItem.vue'

@Component({
  components: { OrderDetailsListItem }
})
export default class OrderDetailsList extends Vue {
  @Prop({ type: Array, default: () => [] }) items!: IWithTitleAndSubtitle[]
}
</script>

<style scoped>

</style>
