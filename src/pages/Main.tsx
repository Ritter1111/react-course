import { useEffect, useState } from 'react';
import { fetchCards } from '../utils/api';
import { getSearchParam, setSearchParam } from '../utils/localStorage';
import styles from '../styles/App.module.css';
import { ICardData } from '../interfaces/Card.interface';
import CardList from '../components/CardList/CardList';
import CardSearch from '../components/CardSearch/CardSearch';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';

export default function Main() {
  const [data, setData] = useState<{ data: ICardData[] }>({ data: [] });
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({currPage: 1, totalPages: 0})
  const limit = 10;

  const getCards = async (value?: string) => {
    setLoading(true);

    if (value) {
      setSearchParam('searchValue', value);
    }
    const cardsData = await fetchCards(pageInfo.currPage, value, limit);
    setData(cardsData);
    if (cardsData.pagination && cardsData.pagination.last_visible_page) {
      setPageInfo({currPage: cardsData.pagination.current_page , totalPages:cardsData.pagination?.last_visible_page })
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
  }, [pageInfo.currPage]);

  const handleSearchClick = () => {
    getCards(value);
    setValue('');
  };

  const onPageChange = (newPage: number) => {
    console.log('dsd');
    if (newPage >= 1 && newPage <= pageInfo.totalPages) {
      setPageInfo({...pageInfo, currPage: newPage})
    }
  };

  return (
    <div className={styles.app}>
      <Pagination
        onPageChange={onPageChange}
        currPage={pageInfo.currPage}
        totalPages={pageInfo.totalPages}
      />
      <div className={styles.container}>
        <CardSearch
          handleInputChange={(e) => setValue(e.target.value)}
          handleSearchClick={handleSearchClick}
          value={value}
        />
        {loading ? <Loader /> : <CardList data={data.data} />}
      </div>
    </div>
  );
}
