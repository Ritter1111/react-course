import React from 'react'
import styles from './UncontrolledForm.module.css'

export default function UncontrolledForm() {

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('fdfgjd')
  }

  return (
    <div className={styles.container}>
      UncontrolledForm:
      <form onSubmit={submitForm}>
        <div className={styles.uncontrolled__form}>

     
        <label htmlFor='name'>Name:</label>
        <input placeholder='Name' id='name'/>

        <label htmlFor='age'>Age:</label>
        <input placeholder='Age' id='age'/>

        <label htmlFor='email'>email :</label>
        <input placeholder='email' id='email'/>

        <label htmlFor='password'>password:</label>
        <input placeholder='password' id='password'/>

        <label htmlFor='password2'> confirm password:</label>
        <input placeholder='password' id='password2'/>

        <label >gender :</label>
        <label htmlFor='gender'>
          <input type='radio' name='gender' value='male' id='gender '/>
          male
        </label>
        <label htmlFor='gender'>
          <input type='radio' name='gender' value='female' id='gender '/>
          female
        </label>

        <label>
          <input type="checkbox" name="acceptTerm" />
          Accept terms & Conditions
        </label>

        <label  htmlFor='picture'>Choose Picture:</label>
        <input type="file" name="picture" id='picture'/>

        <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
