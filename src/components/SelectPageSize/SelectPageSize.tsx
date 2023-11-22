import { optionValues } from "../../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { saveLimitItem } from "../../store/ItemsLimit/items.slice";
import styles from "./SelectPageSize.module.css";
import { useRouter } from "next/router";

export const SelectPageSize: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const limitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(saveLimitItem(Number(value)));
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: value },
    });
  };
  return (
    <>
      <div className={styles.inputContainer}>
        <select
          className={styles.inputSize}
          value={Number(router.query.limit)}
          onChange={limitChange}
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
