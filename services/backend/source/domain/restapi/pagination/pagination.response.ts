export interface TPaginationRes<T> {
    rows: T[];
    total: number;
    pages: number;
}
