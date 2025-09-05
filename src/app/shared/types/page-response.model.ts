export interface PageResponse<T> {
    content: T,
    numberOfElements: number,
    totalElements: number,
    first: boolean,
    last: boolean
}
