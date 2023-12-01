import React, { ChangeEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './UncontrolledForm.module.css';
import { saveFormData } from '../../store/Forms/Uncontrolled_form.slice';
import { useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../../utils/imageReader';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  // const countryRef =  useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptTermRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const saveDataInStorage = (base64String: string) => {
      dispatch(
        saveFormData({
          name: nameRef.current!.value,
          age: ageRef.current!.value,
          email: emailRef.current!.value,
          // country: countryRef.current!.value,
          password: passwordRef.current!.value,
          password2: password2Ref.current!.value,
          gender: genderRef.current!.value,
          acceptTerm: acceptTermRef.current!.checked,
          picture: base64String,
          newData: true,
        })
      );
  }

  const handleLoadLocalFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      imageToBase64(file, saveDataInStorage);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitForm}>
        <div className={styles.uncontrolled__form}>
          <h3> UncontrolledForm:</h3>
          <label htmlFor="name">Name:</label>
          <input placeholder="Name" id="name" ref={nameRef} />

          <label htmlFor="age">Age:</label>
          <input placeholder="Age" id="age" ref={ageRef} />

          <label htmlFor="email">email :</label>
          <input placeholder="email" id="email" ref={emailRef} />

          <label htmlFor="password">password:</label>
          <input placeholder="password" id="password" ref={passwordRef} />

          <label htmlFor="password2"> confirm password:</label>
          <input placeholder="password" id="password2" ref={password2Ref} />

          <label>gender :</label>
          <label htmlFor="gender">
            <input
              type="radio"
              name="gender"
              value="male"
              id="gender "
              ref={genderRef}
            />
            male
          </label>
          <label htmlFor="gender">
            <input
              type="radio"
              name="gender"
              value="female"
              id="gender "
              ref={genderRef}
            />
            female
          </label>

          <label htmlFor="picture">Choose Picture:</label>
          <input
            type="file"
            name="picture"
            id="picture"
            ref={pictureRef}
            onChange={handleLoadLocalFile}
          />

          <label>
            <input type="checkbox" name="acceptTerm" ref={acceptTermRef} />
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
