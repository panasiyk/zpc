export default class Filter {
  name: string = ''
  title: string = ''
  type: string = ''

  constructor (name: string, title: string, type: string) {
    this.name = name
    this.title = title
    this.type = type
  }
}
