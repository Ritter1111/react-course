import { useForm } from 'react-hook-form';
import styles from './ReactHookForm.module.css';
import { IFormData } from '../../types/types';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../../store/Forms/Uncontrolled_form.slice';
import { useNavigate } from 'react-router-dom';

export default function ReactHookForm() {
  const { register, handleSubmit } = useForm<IFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: IFormData) => {
    dispatch(saveFormData(data));
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.uncontrolled__form}>
          <h3> ReactHookForm:</h3>
          <label htmlFor="name">Name:</label>
          <input placeholder="Name" id="name" {...register('name')} />

          <label htmlFor="age">Age:</label>
          <input placeholder="Age" id="age" {...register('age')} />

          <label htmlFor="email">email :</label>
          <input placeholder="email" id="email" {...register('email')} />

          <label htmlFor="password">password:</label>
          <input
            placeholder="password"
            id="password"
            {...register('password')}
          />

          <label htmlFor="password2"> confirm password:</label>
          <input
            placeholder="password"
            id="password2"
            {...register('password2')}
          />

          <label>gender :</label>
          <label htmlFor="gender">
            <input
              type="radio"
              value="male"
              id="gender"
              {...register('gender')}
            />
            male
          </label>
          <label htmlFor="gender">
            <input
              type="radio"
              value="female"
              id="gender"
              {...register('gender')}
            />
            female
          </label>

          <label htmlFor="picture">Choose Picture:</label>
          <input type="file" name="picture" id="picture" />

          <label>
            <input type="checkbox" {...register('acceptTerm')} />
            Accept terms & Conditions
          </label>

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
