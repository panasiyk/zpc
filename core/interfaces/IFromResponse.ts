export default interface IFromResponse<T> {
  fromResponse (data: any, headers?: any): T
}
