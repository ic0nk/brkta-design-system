// Framework-neutral Pagination contract
export interface PaginationContract {
  current: number;
  total: number;
  onPageChange?: (page: number) => void;
}
