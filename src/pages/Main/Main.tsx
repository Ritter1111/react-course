import styles from './Main.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';

export default function Main() {
  const uncontrolledData = useSelector(
    (state: RootState) => state.uncontrolledForm.list
  );
  const [newIndex, setNewIndex] = useState<number | null>(null);

  useEffect(() => {
    const newIndex = uncontrolledData.findIndex((item) => item.newData);
    setNewIndex(newIndex);
    setTimeout(() => {
      setNewIndex(null);
    }, 1500);
  }, [uncontrolledData]);

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {uncontrolledData.map((item, idx) => (
          <div
            key={idx}
            className={
              newIndex === idx ? styles.indicator : styles.uncontrolledBox
            }
          >
            <div>Age: {item.age}</div>
            <div>Name: {item.name}</div>
            <div>Email: {item.email}</div>
            <div>Gender: {item.gender}</div>
            <div>Password: {item.password}</div>
            <div>Password2: {item.password2}</div>
            <div>Accept Terms: {item.acceptTerm}</div>
            <div>Country: {item.country}</div>
            <img src={item.picture} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
