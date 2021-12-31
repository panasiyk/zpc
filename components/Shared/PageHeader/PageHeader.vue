<template>
  <el-header height="78">
    <div class="topbar">
      <btn-arrow v-if="btnBack" @click.native="$router.back()" />
      <h1 class="topbar__title">
        {{ pageName }}
      </h1>
      <div class="topbar__btns">
        <slot />
      </div>
      <template v-if="tableFilter">
        <table-filter-input :table-configuration="tableConfiguration" />
        <selected-columns-button :table-configuration="tableConfiguration" />
      </template>
      <user-dropdown-button />
    </div>
  </el-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UserDropdownButton from '~/components/Shared/PageHeader/UserDropdownButton.vue'
import TableConfiguration from '~/core/models/Table/TableConfiguration'
import BtnArrow from '~/components/NewShared/BtnArrow.vue'
import SelectedColumnsButton from '~/components/Shared/PageHeader/SelectedColumnsButton.vue'
import TableFilterInput from '~/components/Shared/PageHeader/TableFilterInput/TableFilterInput.vue'

@Component({ components: { UserDropdownButton, BtnArrow, SelectedColumnsButton, TableFilterInput } })

export default class PageHeader extends Vue {
  @Prop({ type: String, required: true }) pageName!: string
  @Prop({ type: Boolean, required: false }) btnBack!: boolean
  @Prop({ type: Boolean, required: false }) tableFilter!: boolean
  @Prop({ type: Object, required: false }) tableConfiguration!: TableConfiguration
}
</script>

<style lang="sass">
@import 'assets/new-design/sass/vars'
.topbar
  height: 78px
  display: flex
  align-items: center
  padding: 0 36px 0 29px
  background-color: $white
</style>
