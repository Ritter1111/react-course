import { useCallback, useEffect, useState } from 'react';
import { fetchCards } from '../utils/api';
import { getSearchParam, setSearchParam } from '../utils/localStorage';
import styles from '../styles/Main.module.css';
import CardList from '../components/CardList/CardList';
import CardSearch from '../components/CardSearch/CardSearch';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import { ICardData } from '../interfaces/search-result.interface';
import { useSearchParams } from 'react-router-dom';

export default function Main() {
  const [data, setData] = useState<{ data: ICardData[] }>({ data: [] });
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 0 });
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const getCards = async (value?: string, page?: number) => {
    setLoading(true);

    value && setSearchParam('searchValue', value);

    const cardsData = await fetchCards(page || pageInfo.currPage, value, limit);

    cardsData.pagination &&
      setPageInfo({
        currPage: cardsData.pagination.current_page,
        totalPages: cardsData.pagination?.last_visible_page,
      });

    setData(cardsData);
    page &&
      setSearchParams({
        page: page.toString(),
        q: getSearchParam('searchValue'),
      });
    setLoading(false);
  };

  useEffect(() => {
    if (getSearchParam('searchValue')) {
      setValue(getSearchParam('searchValue'));
    } else {
      getCards();
    }
  }, []);

  const handleSearchClick = () => {
    getCards(value);
    setSearchParams({
      page: pageInfo.currPage.toString(),
      q: getSearchParam('searchValue'),
    });
    setValue('');
  };

  useEffect(() => {
    const pageQueryParam = searchParams.get('page');
    const queryQueryParam = searchParams.get('q');

    if (pageQueryParam && queryQueryParam) {
      setPageInfo({ ...pageInfo, currPage: parseInt(pageQueryParam) });
      getCards(queryQueryParam, parseInt(pageQueryParam));
    }

    if (queryQueryParam) {
      setValue(queryQueryParam);
    }
  }, [searchParams]);

  const onPageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pageInfo.totalPages) {
        setPageInfo({ ...pageInfo, currPage: newPage });
        setSearchParams({ page: newPage.toString(), q: value });
      }
    },
    [pageInfo.totalPages]
  );

  return (
    <div className={styles.app}>
      <CardSearch
        handleInputChange={(e) => setValue(e.target.value)}
        handleSearchClick={handleSearchClick}
        value={value}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <CardList data={data.data} />
          <Pagination
            onPageChange={onPageChange}
            currPage={pageInfo.currPage}
            totalPages={pageInfo.totalPages}
          />
        </>
      )}
    </div>
  );
}
