import IWithIdAndLabel from '~/core/interfaces/IWithIdAndLabel'

export default interface IItemWithDateInterval {
  item: IWithIdAndLabel
  startDate: string | null | undefined
  endDate: string | null | undefined
}
