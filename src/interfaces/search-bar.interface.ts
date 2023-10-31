export interface IMyInputProps {
  className: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export interface IMyButtonProps {
  className: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface ICardSearchProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: (event: React.MouseEvent<HTMLElement>) => void;
  // throwError: (event: React.MouseEvent<HTMLElement>) => void;
  value: string;
  // hasError: boolean;
}
