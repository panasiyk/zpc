<template>
  <v-tooltip max-width="300px" bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>
          mdi-information-outline
        </v-icon>
      </v-btn>
    </template>
    Скидки — название условное. Так у нас называются разные маркетинговые действия: предоставление бонусов,
    подарков, вывод информации на чеке, отправка смс и пр. Можно создавать новые действия, устанавливая для них
    разные приоритеты и правила применения.
  </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TreeInformationTooltip extends Vue {
}
</script>

<style scoped>

</style>
