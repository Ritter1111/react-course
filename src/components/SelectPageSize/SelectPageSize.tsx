import styles from './SelectPageSize.module.css';
import { optionValues } from '../../utils/consts';

export interface PageSizeProps {
  onInputValueChange: (value: number) => void;
  value: number;
}

export const SelectPageSize: React.FC<PageSizeProps> = ({
  onInputValueChange,
  value,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onInputValueChange(Number(value));
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <select
          className={styles.inputSize}
          value={value}
          onChange={handleSelectChange}
        >
          {optionValues.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
