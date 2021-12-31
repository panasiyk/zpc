export default class Pagination {
  currentPage: number = 1
  totalItems?: number
  totalPages?: number
  perPage?: number

  fromHeaders (headers: any): Pagination {
    this.currentPage = parseInt(headers['x-pagination-current-page'])
    this.totalItems = parseInt(headers['x-pagination-total-count'])
    this.totalPages = parseInt(headers['x-pagination-page-count'])
    this.perPage = parseInt(headers['x-pagination-per-page'])

    return this
  }
}
