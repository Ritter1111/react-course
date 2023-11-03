export interface IPaginationProps {
  onPageChange: (currPage: number) => void;
  currPage: number;
  totalPages: number;
}
