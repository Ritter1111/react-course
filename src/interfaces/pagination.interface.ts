export interface IPaginationProps {
  onPageChange: (currPage: number) => void;
  currPage: number;
  totalPages: number;
}

export interface PageSizeProps {
  onInputValueChange: (value: number) => void;
  value: number
}
