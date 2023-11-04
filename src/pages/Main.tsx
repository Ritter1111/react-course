import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Main.module.css';
import CardList from '../components/CardList/CardList';
import CardSearch from '../components/CardSearch/CardSearch';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import PageSize from '../components/PageSize/PageSize';
import NotFoundData from '../components/NotFound/NotFoundData';
import { useQueryParams } from '../hooks/useQueryParams';
import useFetching from '../hooks/useFetching';

export default function Main() {
  const [value, setValue] = useState('');
  const [limitPageItem, setLimitPageItem] = useState(10);
  const {
    queryPage,
    queryLimit,
    querySearch,
    searchValue,
    setDefaultQueryParametr,
    setSearchParams,
  } = useQueryParams();

  const { loading, data, pageInfo, fetchAllCards, setPageInfo } = useFetching();

  const getCards = async (value: string, page: number, limit: number) => {
    fetchAllCards(value, page, limit);

    setSearchParams({
      page: String(page) || queryPage || String(pageInfo.currPage),
      q: value || querySearch || searchValue,
      limit: String(limit) || setDefaultQueryParametr(queryLimit, '10'),
    });
  };

  useEffect(() => {
    if (searchValue) {
      setValue(searchValue);
    }
    getCards(
      querySearch,
      Number(setDefaultQueryParametr(queryPage, '1')),
      Number(setDefaultQueryParametr(queryLimit, '10'))
    );
  }, []);

  const handleInputValueChange = (value: string) => {
    getCards(querySearch, 1, Number(value));
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
          {!data.data || data.data.length === 0 ? (
            <NotFoundData />
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
        </>
      )}
    </div>
  );
}
