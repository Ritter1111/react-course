import { IMyButtonProps } from '../../interfaces/search-bar.interface';

export default function MyButton({
  children,
  className,
  ...props
}: IMyButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
