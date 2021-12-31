import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import { required, min_value as minValue, max_value as maxValue } from 'vee-validate/dist/rules'
import ru from 'vee-validate/dist/locale/ru.json'

localize('ru', ru)
extend('required', required)
extend('min_value', minValue)
extend('max_value', maxValue)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
