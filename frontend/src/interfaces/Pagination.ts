export interface IPaginationProps {
  totalRecords: number;
  onPageChanged: (currentPage: number) => void;
  currentPage: number;
  pageLimit?: number;
  pageNeighbours?: number;
}

export interface IPaginationState {
  currentPage: number;
}
