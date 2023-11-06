import styles from './SelectPageSize.module.css';
import { ChangeSelectEvent } from '../../types/types';
import { PageSizeProps } from '../../interfaces/pagination.interface';

const optionValues = [1, 5, 10, 15, 20, 25];

export default function SelectPageSize({
  onInputValueChange,
  value,
}: PageSizeProps) {
  const handleSelectChange = (event: ChangeSelectEvent) => {
    const value = event.target.value;
    onInputValueChange(Number(value));
  };

  return (
    <div className={styles.inputContainer}>
      <h6 className={styles.mark}>Items on page: </h6>
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
  );
}
