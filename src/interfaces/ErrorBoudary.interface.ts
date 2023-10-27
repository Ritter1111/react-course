export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: unknown;
}

export interface ErrorBtnProps {
  throwError: (event: React.MouseEvent<HTMLElement>) => void;
}
