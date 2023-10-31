import { IMyInputProps } from '../../interfaces/search-bar.interface';

export default function MyInput({
  placeholder,
  className,
  ...props
}: IMyInputProps) {
  return <input placeholder={placeholder} className={className} {...props} />;
}
