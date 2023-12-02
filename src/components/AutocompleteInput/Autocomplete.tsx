import { useState, ChangeEvent } from "react";
import { countries } from "../../utils/countries";
import styles from "./Autocomplete.module.css";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "../../types/types";

interface AutocompleteProps {
  country?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegister<IFormData>;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ country, register }) => {
  const [value, setValue] = useState("");
  const allCountries = countries.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.autocomplete}>
      <div className={styles.inputContainer}>
        <label htmlFor="countries"></label>
        <input
          type="text"
          placeholder="Search country"
          onChange={handleChange}
          value={value}
          ref={country}
          {...(register && register('country'))}
          list="country-list"
        />
      </div>
      <datalist id="country-list">
        {allCountries.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </div>
  );
};
