import ISelectItem from '~/core/interfaces/ISelectItem'

export function mapToSelectItems (map: any): ISelectItem[] {
  const keys = Object.keys(map)

  return keys.map((key: any) => ({ value: key, text: map[key] }))
}
