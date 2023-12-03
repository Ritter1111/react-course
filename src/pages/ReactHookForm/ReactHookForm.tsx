import { useForm } from 'react-hook-form';
import styles from './ReactHookForm.module.css';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../../store/Forms/Uncontrolled_form.slice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../validations/FormValidations';
import { imageToBase64 } from '../../utils/imageReader';
import { useState } from 'react';
import { countries } from '../../utils/countries';

export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  country: string;
  gender: string;
  acceptTerm: boolean;
  picture: FileList;
}

export const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });
  const [value] = useState('');
  const allCountries = countries.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormData) => {
    const image = data.picture ? await imageToBase64(data.picture[0]) : '';
    dispatch(
      saveFormData({ ...getValues(), picture: image || '', newData: true })
    );
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.uncontrolled__form}>
          <h3> ReactHookForm:</h3>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            {...register('name')}
          />
          <p className={styles.errorMessage}>
            {errors.name && errors.name.message}
          </p>

          <label htmlFor="age">Age:</label>
          <input type="text" placeholder="Age" id="age" {...register('age')} />
          <p className={styles.errorMessage}>
            {errors.age && errors.age.message}
          </p>

          <label htmlFor="email">Email :</label>
          <input
            type="text"
            placeholder="email"
            id="email"
            {...register('email')}
          />
          <p className={styles.errorMessage}>
            {errors.email && errors.email.message}
          </p>

          <label htmlFor="password">Password:</label>
          <input
            type="text"
            placeholder="password"
            id="password"
            {...register('password')}
          />
          <p className={styles.errorMessage}>
            {errors.password && errors.password.message}
          </p>

          <label htmlFor="password2">Confirm password:</label>
          <input
            placeholder="password"
            id="password2"
            type="text"
            {...register('password2')}
          />
          <p className={styles.errorMessage}>
            {errors.password2 && errors.password2.message}
          </p>

          <label>Gender :</label>
          <select id="gender" className={styles.gender} {...register('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="picture">Choose Picture:</label>

          <input type="file" id="picture" {...register('picture')} />
          <p className={styles.errorMessage}>
            {errors.picture && errors.picture.message}
          </p>

          <div className={styles.autocomplete}>
            <div className={styles.inputContainer}>
              <label htmlFor="countries"></label>
              <input
                type="text"
                placeholder="Search country"
                {...register('country')}
                list="country-list"
              />
            </div>
            <datalist id="country-list">
              {allCountries.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </div>

          <p className={styles.errorMessage}>
            {errors.picture && errors.country?.message}
          </p>

          <label>
            <input type="checkbox" {...register('acceptTerm')} />
            Accept terms & Conditions
          </label>
          <p className={styles.errorMessage}>
            {errors.acceptTerm && errors.acceptTerm.message}
          </p>

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
