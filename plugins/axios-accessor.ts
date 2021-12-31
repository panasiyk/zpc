import { Plugin } from '@nuxt/types'
import QueryString from 'qs'

import { initializeAxios } from '~/core/utils/api'

const accessor: Plugin = ({ $axios }) => {
  $axios.defaults.paramsSerializer = (params) => {
    return QueryString.stringify(params, { arrayFormat: 'brackets' })
  }

  initializeAxios($axios)
}

export default accessor
