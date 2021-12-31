import { Middleware } from '@nuxt/types'
import DirectoryTypeEnum from '~/core/enums/DirectoryTypeEnum'

const middleware: Middleware = ({ params, error }) => {
  if (!params.type) {
    error({
      statusCode: 404,
      message: 'Не указан тип справочника'
    })
  }

  if (!(Object.values(DirectoryTypeEnum) as string[]).includes(params.type as string)) {
    error({
      statusCode: 404,
      message: 'Некорректный тип справочника'
    })
  }
}

export default middleware
