import { useEffect, useState } from 'react';
import { fetchCards } from '../utils/api';
import { getSearchParam, setSearchParam } from '../utils/localStorage';
import Loader from './Loader/Loader';
import CardSearch from './CardSearch/CardSearch';
import CardList from './CardList/CardList';
import styles from '../styles/App.module.css';
import { ICardData } from '../interfaces/Card.interface';

export default function App() {
  const [data, setData] = useState({ results: [] as ICardData[] });
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const getCards = async (value?: string) => {
    const cardsData = await fetchCards(value);
    setData(cardsData)
     if (value) {
       setSearchParam('searchValue', value);
     }
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if (getSearchParam('searchValue')) {
        getCards(getSearchParam('searchValue'));
        setValue(getSearchParam('searchValue'))
      } else {
        getCards();
      }
      setLoading(false);
    }, 1500);
  }, [])

  const handleSearchClick = () => {
    getCards(value)
    setValue('')
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <CardSearch
          handleInputChange={(e) => setValue(e.target.value)}
          handleSearchClick={handleSearchClick}
          value={value}
        />
        {loading ? (
          <Loader />
        ) : (
          <CardList results={data.results} />
        )}
      </div>
    </div>
  );
}
