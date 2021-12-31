import IWeekDay from '~/core/interfaces/IWeekDay'
import IWithId from '~/core/interfaces/IWithId'
import IItemWithDateInterval from '~/core/interfaces/IItemWithDateInterval'

export default class Promotion {
  name: string = ''
  startDate: string = ''
  endDate: string = ''
  persistent: boolean = false
  activeDays: IWeekDay[] = []
  isForAllPoints: boolean = false
  selectedPointSegments: IWithId[] = []
  selectedDiscounts: IItemWithDateInterval[] = [
    {
      item: {
        id: 1,
        label: 'First discount'
      },
      startDate: '',
      endDate: ''
    },
    {
      item: {
        id: 2,
        label: 'Second discount'
      },
      startDate: '',
      endDate: ''
    },
    {
      item: {
        id: 3,
        label: 'Third discount'
      },
      startDate: '',
      endDate: ''
    }
  ]
  selectedClientSegments: IWithId[] = []
}
