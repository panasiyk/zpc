import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'

@Component
export default class ModalMixin extends Vue {
  @Prop({ type: Function, default: null }) onClose!: Function | null
  @Prop({ type: Function, default: null }) onOpen!: Function | null

  modal: boolean = false

  @Watch('modal')
  onModalChange () {
    if (this.modal) {
      if (this.onOpen) {
        this.onOpen()
      }
    } else if (this.onClose) {
      this.onClose()
    }
  }

  closeModal () {
    this.modal = false
  }

  openModal () {
    this.modal = true
  }
}
