export default interface INavMenuItem {
  title: string
  icon?: string
  href?: string
  children?: INavMenuItem[]
}
