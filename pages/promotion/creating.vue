<template>
  <div class="page">
    <page-header page-name="Создание новой акции">
      <el-button plain @click="back()">
        Отмена
        <i class="el-icon-close el-icon-right" />
      </el-button>
    </page-header>
    <page-content>
      <PromotionStepper :step="step" :step-pages="stepPages" />
      <div class="content-block">
        <NuxtChild :promotion="promotion" />

        <div class="create-action__btns">
          <el-button v-if="step" type="info" @click="goTo(-1)">
            Назад
          </el-button>
          <el-button type="primary">
            Сохранить
          </el-button>
          <el-button v-if="isLastPage" @click="goTo(+1)">
            Далее
          </el-button>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'
import PromotionStepper from '~/components/Page/Promotion/PromotionStepper.vue'
import PageContent from '~/components/Shared/PageContent.vue'
import Promotion from '~/core/models/Promotion'

@Component({ name: 'Creating', components: { PageContent, PageHeader, PromotionStepper } })
export default class Creating extends Vue {
  promotion: Promotion = new Promotion()

  step: number = 0

  get isLastPage (): boolean {
    return this.step !== this.stepPages.length - 1
  }

  get stepPages (): Array<string> {
    return ['settings', 'segments-and-points', 'discounts', 'clients', 'news-letter']
  }

  beforeMount () {
    const currentPage = this.$route.path.split('/').splice(-1)[0]
    this.step = this.stepPages.findIndex(page => page === currentPage) || 0
  }

  goTo (index:number) {
    this.$router.push({ name: `promotion-creating-${this.stepPages[this.step + index]}` })
    this.step = this.step + index
  }

  back () {
    this.$router.push({ name: 'promotion' })
  }
}
</script>
<style scoped lang="sass">
.content-block
  padding: 16px 24px 24px 21px
</style>
