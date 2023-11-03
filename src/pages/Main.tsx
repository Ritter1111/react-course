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
import PageSize from '../components/PageSize/PageSize';

export default function Main() {
  const [data, setData] = useState<{ data: ICardData[] }>({ data: [] });
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 0 });
  const [limitPageItem, setLimitPageItem] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryPageParam = searchParams.get('page');
  const queryLimitParam = searchParams.get('limit');
  const querySearchParam = searchParams.get('q');
  const searchValue = getSearchParam('searchValue');
  console.log(queryLimitParam);
  
  const defaultLimit = queryLimitParam && queryLimitParam !== "0" ? queryLimitParam : "10";

  const getCards = async (value?: string, page?: number, limit?: number) => {
    setLoading(true);

    value && setSearchParam('searchValue', value);

    const cardsData = await fetchCards(page || pageInfo.currPage, value, limit);

    cardsData.pagination &&
      setPageInfo({
        currPage: cardsData.pagination.current_page,
        totalPages: cardsData.pagination?.last_visible_page,
      });

    setData(cardsData);

    setSearchParams({
      page: String(page) || queryPageParam || String(pageInfo.currPage),
      q: value || querySearchParam || searchValue,
      limit: String(limit) ||  defaultLimit,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (searchValue) {
      setValue(searchValue);
    }
    getCards(
      querySearchParam || '',
      Number(queryPageParam),
      Number(defaultLimit)
    );
  }, []);

  const handleInputValueChange = (value: string) => {
    getCards(querySearchParam || '', 1, Number(value));
    setLimitPageItem(Number(value));
  };

  const onPageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pageInfo.totalPages) {
        setPageInfo({ ...pageInfo, currPage: newPage });
        getCards(value, newPage, limitPageItem);
      }
    },
    [pageInfo.totalPages]
  );

  return (
    <div className={styles.app}>
      <CardSearch
        handleInputChange={(e) => setValue(e.target.value)}
        handleSearchClick={() => getCards(value, 1, limitPageItem)}
        value={value}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Pagination
            onPageChange={onPageChange}
            currPage={pageInfo.currPage}
            totalPages={pageInfo.totalPages}
          />
          <PageSize onInputValueChange={handleInputValueChange} />
          <CardList data={data.data} />
        </>
      )}
    </div>
  );
}
