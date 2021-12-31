<template>
  <div class="page">
    <page-header page-name="Главная" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PageHeader from '~/components/Shared/PageHeader/PageHeader.vue'

@Component({ head: { title: 'Главная' }, components: { PageHeader } })
export default class MainPage extends Vue {
}
</script>
