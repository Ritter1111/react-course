import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './UncontrolledForm.module.css';
import { saveFormData } from '../../store/Forms/Uncontrolled_form.slice';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../../validations/FormValidations';
import * as yup from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validateErrors, setValidateErrors] = useState<ValidationErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  // const countryRef =  useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const imageToBase64 = (image: File) => {
    const reader = new FileReader();

    reader.onload = () => {
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
          picture: reader.result as string,
          newData: true,
        })
      );
    };

    reader.readAsDataURL(image);
  };

  const handleLoadLocalFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      imageToBase64(file);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await userSchema.validate(
        {
          name: nameRef.current?.value,
          age: ageRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          password2: password2Ref.current?.value,
          gender: genderRef.current?.value || '',
          acceptTerm: acceptTermRef.current?.checked,
          picture: pictureRef.current?.files,
        },
        { abortEarly: false }
      );
      setValidateErrors({});
      navigate('/');
    } catch (error) {
      const errors: ValidationErrors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((er) => {
          errors[er.path as string] = er.message;
        });
      }
      setValidateErrors(errors);
    }
  };

  console.log(validateErrors);
  console.log(pictureRef.current?.files![0]);

  return (
    <div className={styles.container}>
      <form onSubmit={submitForm}>
        <div className={styles.uncontrolled__form}>
          <h3> UncontrolledForm:</h3>
          <label htmlFor="name">Name:</label>
          <input placeholder="Name" id="name" ref={nameRef} />
          <div style={{ color: 'red' }}>{validateErrors['name']}</div>

          <label htmlFor="age">Age:</label>
          <input placeholder="Age" id="age" ref={ageRef} />
          <div style={{ color: 'red' }}>{validateErrors['age']}</div>

          <label htmlFor="email">email :</label>
          <input placeholder="email" id="email" ref={emailRef} />
          <div style={{ color: 'red' }}>{validateErrors['email']}</div>

          <label htmlFor="password">password:</label>
          <input placeholder="password" id="password" ref={passwordRef} />
          <div style={{ color: 'red' }}>{validateErrors['password']}</div>

          <label htmlFor="password2"> confirm password:</label>
          <input placeholder="password" id="password2" ref={password2Ref} />
          <div style={{ color: 'red' }}>{validateErrors['password2']}</div>

          <label>gender :</label>
          <select id="gender" ref={genderRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div style={{ color: 'red' }}>{validateErrors['gender']}</div>

          <label htmlFor="picture">Choose Picture:</label>
          <input
            type="file"
            name="picture"
            id="picture"
            ref={pictureRef}
            onChange={handleLoadLocalFile}
          />
          <div style={{ color: 'red' }}>{validateErrors['picture']}</div>

          <label>
            <input type="checkbox" name="acceptTerm" ref={acceptTermRef} />
            Accept terms & Conditions
          </label>
          <div style={{ color: 'red' }}>{validateErrors['acceptTerm']}</div>

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
