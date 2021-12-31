<template>
  <button class="btn_arrow">
    <svg version="1.1" width="14px" height="10px" xmlns="http://www.w3.org/2000/svg" :style="rotationAngle">
      <g transform="matrix(1 0 0 1 -102 -2801 )">
        <path d="M 12.3862660944205 0.590435315757207  L 0.583690987124442 0.590435315757207  L 6.59227467811161 8.3157572041692  L 12.3862660944205 0.590435315757207  Z " fill-rule="nonzero" fill="#ffffff" stroke="none" transform="matrix(1 0 0 1 102 2801 )" />
        <path d="M 0.583690987124442 0.590435315757207  L 6.59227467811161 8.3157572041692  L 12.3862660944205 0.590435315757207  " stroke-width="1" stroke="#333333" fill="none" transform="matrix(1 0 0 1 102 2801 )" />
      </g>
    </svg>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ name: 'BtnArrow' })
export default class BtnArrow extends Vue {
  @Prop({ default: 'left' }) side!: 'left' | 'right' |'top' |'bottom' ;

  get rotationAngle () {
    let side = 0
    switch (this.side) {
      case 'bottom': side = 0; break
      case 'right': side = -90; break
      case 'left': side = 90; break
      case 'top': side = 180; break
    }
    return { transform: `rotate(${side}deg)` }
  }
}
</script>
<style scoped lang="sass">
.btn_arrow
  outline: none
  border: 0
  background: none
  cursor: pointer
</style>
