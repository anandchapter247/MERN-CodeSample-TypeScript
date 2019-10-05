export interface IPaginationProps {
  totalRecords: number;
  onPageChanged: (currentPage: number) => void;
  currentPag: number;
}

export interface IPaginationState {
  pageLimit: number;
}
