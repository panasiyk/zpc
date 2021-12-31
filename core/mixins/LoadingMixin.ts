import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LoadingMixin extends Vue {
    isLoading: boolean = false

    async wrapLoading (func: Function) {
        this.isLoading = true

        try {
            return await func()
        } finally {
            this.isLoading = false
        }
    }
}
