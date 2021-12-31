import { createDecorator } from 'vue-class-component'
import { debounce } from 'lodash'

export default function Debounced (delay: number) {
    return createDecorator((componentOptions, handler) => {
        const originalFunction = componentOptions.methods?.[handler]

        if (!componentOptions.methods) {
            componentOptions.methods = {}
        }

        componentOptions.methods[handler] = debounce(function (...args: any[]) {
            // @ts-ignore
            originalFunction?.apply(this, args)
        }, delay)
    })
}
