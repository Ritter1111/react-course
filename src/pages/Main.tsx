import { useEffect, useState } from 'react';
import { fetchCards } from '../utils/api';
import { getSearchParam, setSearchParam } from '../utils/localStorage';
import styles from '../styles/App.module.css';
import { ICardData } from '../interfaces/Card.interface';
import CardList from '../components/CardList/CardList';
import CardSearch from '../components/CardSearch/CardSearch';
import Loader from '../components/Loader/Loader';

export default function Main() {
  const [data, setData] = useState({ results: [] as ICardData[] });
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  // const [currPage, setCurrPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1)
  const currPage = 1

  const getCards = async (value?: string) => {
    setLoading(true);

    if (value) {
      setSearchParam('searchValue', value);
    }

    const cardsData = await fetchCards(currPage, value);
    setData(cardsData);
    if(cardsData.count) {
      // setTotalPages(cardsData.count)
    }
    setLoading(false);
  };

  useEffect(() => {
    if (getSearchParam('searchValue')) {
      getCards(getSearchParam('searchValue'));
      setValue(getSearchParam('searchValue'));
    } else {
      getCards();
    }
  }, []);

  const handleSearchClick = () => {
    getCards(value);
    setValue('');
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <CardSearch
          handleInputChange={(e) => setValue(e.target.value)}
          handleSearchClick={handleSearchClick}
          value={value}
        />
        {loading ? <Loader /> : <CardList results={data.results} />}
      </div>
    </div>
  );
}
