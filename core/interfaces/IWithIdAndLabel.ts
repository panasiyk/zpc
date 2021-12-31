import IWithId from '~/core/interfaces/IWithId'

export default interface IWithIdAndLabel extends IWithId{
  id: number
  label: string
  [key: string]: any
}
