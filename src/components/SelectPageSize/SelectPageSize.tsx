import { FC } from "react";
import { optionValues } from "../../utils/consts";
import styles from "./SelectPageSize.module.css";
import { useRouter } from "next/router";

export const SelectPageSize: FC = () => {
  const router = useRouter();

  const limitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: value },
    });
  };
  return (
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
  );
};
