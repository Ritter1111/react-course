export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: unknown;
}

export interface IErrorBtnProps {
  throwError: (event: React.MouseEvent<HTMLElement>) => void;
}
