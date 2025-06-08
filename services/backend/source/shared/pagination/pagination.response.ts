export interface PaginationRes<T> {
    rows: T[];
    total: number;
    pages: number;
}
