import { ChangeEvent } from '../types/types';

export interface IMyInputProps {
  className: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent) => void;
  value?: string;
}

export interface IMyButtonProps {
  className: string;
  children: React.ReactNode;
  onClick?: (event: MouseEvent) => void;
}

export interface ICardSearchProps {
  handleInputChange: (event: ChangeEvent) => void;
  handleSearchClick: (event: MouseEvent) => void;
  value: string;
}
