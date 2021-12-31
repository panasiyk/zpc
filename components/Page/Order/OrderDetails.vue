<template>
  <v-card :loading="isLoading">
    <v-card-title>
      Детали заказа
    </v-card-title>
    <v-card-text>
      <v-skeleton-loader v-if="isLoading" type="list-item,list-item,list-item,list-item,list-item,list-item" />
      <v-row v-else>
        <v-col cols="12" sm="6">
          <details-card title="Общая информация" :items="commonInformation" />
        </v-col>
        <v-col cols="12" sm="6">
          <details-card title="Данные о клиенте" :items="clientInformation" />
        </v-col>
        <v-col cols="12" sm="6">
          <details-card title="Данные о стоимости" :items="pricesInformation" />
        </v-col>
        <v-col cols="12" sm="6">
          <details-card title="Данные о точке продажи" :items="pointInformation" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import Order from '~/core/models/Order'
import OrderDetailsList from '~/components/Page/Order/OrderDetailsList/OrderDetailsList.vue'
import IWithTitleAndSubtitle from '~/core/interfaces/IWithTitleAndSubtitle'
import DetailsCard from '~/components/Page/Order/DetailsCard.vue'

@Component({
  components: { DetailsCard, OrderDetailsList }
})
export default class OrderDetails extends Vue {
  @Prop({ type: Object, default: null }) order!: Order | null
  @Prop({ type: Boolean, default: false }) isLoading!: boolean

  get commonInformation (): IWithTitleAndSubtitle[] {
    return [
      {
        title: this.order?.id,
        subtitle: 'Внутренний номер заказа в ПЦ'
      },
      {
        title: this.order?.order_id,
        subtitle: 'Внешний номер заказа'
      },
      {
        title: this.order?.date,
        subtitle: 'Дата и время продажи'
      },
      {
        title: this.order?.order_url,
        subtitle: 'Ссылка на заказ во внешней системе',
        link: true
      }
    ]
  }

  get clientInformation (): IWithTitleAndSubtitle[] {
    return [
      {
        title: this.order?.client?.label,
        subtitle: 'Покупатель'
      },
      {
        title: this.order?.card?.label,
        subtitle: 'Номер карты клиента'
      }
    ]
  }

  get pricesInformation (): IWithTitleAndSubtitle[] {
    const oldPrice = this.order?.old_sum === undefined || this.order?.old_sum === null ? '-' : `${this.order?.old_sum} руб`
    const price = this.order?.sum === undefined || this.order?.sum === null ? '-' : `${this.order?.sum} руб`

    return [
      {
        title: `${oldPrice} / ${price}`,
        subtitle: 'Стоимость без скидки / со скидкой'
      },
      {
        subtitle: 'Примененные акции',
        title: this.order?.discounts
      },
      {
        subtitle: 'Бонусы',
        title: this.order?.bonus
      },
      {
        subtitle: 'Способы оплаты',
        title: this.order?.payments
      }
    ]
  }

  get pointInformation (): IWithTitleAndSubtitle[] {
    return [
      {
        subtitle: 'Точка продажи',
        title: this.order?.point?.label
      },
      {
        subtitle: 'Регион продажи',
        title: this.order?.area?.label
      }
    ]
  }
}
</script>

<style scoped>

</style>
