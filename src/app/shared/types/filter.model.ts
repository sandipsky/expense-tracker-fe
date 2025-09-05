export interface FilterData {
    pageIndex: number,
    pageSize: number,
    length?: number,
    sort: FilterSort[],
    filter: FilterSort[]
}

interface FilterSort {
    field: string,
    value: string
}