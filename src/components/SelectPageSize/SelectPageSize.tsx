import styles from './SelectPageSize.module.css';
import { optionValues } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { saveLimitItem } from '../../store/ItemsLimit/items.slice';

export interface PageSizeProps {}

export const SelectPageSize: React.FC<PageSizeProps> = () =>
  // {
  // onInputValueChange,
  // value,
  // }
  {
    const dispatch = useDispatch();
    const itemLimit = useSelector((state: RootState) => state.limit.itemLimit);

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value = event.target.value;
      dispatch(saveLimitItem(Number(value)));
      // onInputValueChange(itemLimit);
    };
    // console.log(itemLimit);

    return (
      <>
        <div className={styles.inputContainer}>
          <select
            className={styles.inputSize}
            value={itemLimit}
            onChange={handleSelectChange}
            data-testid="select-input"
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
