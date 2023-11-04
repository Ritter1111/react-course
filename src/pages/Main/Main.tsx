import { useCallback, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CardSearch from '../../components/CardSearch/CardSearch';
import Loader from '../../components/Loader/Loader';
import NotFoundData from '../../components/NotFound/NotFoundData';
import Pagination from '../../components/Pagination/Pagination';
import SelectPageSize from '../../components/SelectPageSize/SelectPageSize';
import useFetching from '../../hooks/useFetching';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from './Main.module.css';
import ErrorBtn from '../../components/Error/ErrorBtn/ErrorBtn';

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
      page: String(page || pageInfo.currPage) || queryPage,
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

  const handleInputValueChange = (value: number) => {
    getCards(querySearch, 1, value);
    setLimitPageItem(value);
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
      <ErrorBtn />
      <CardSearch
        handleInputChange={(e) => setValue(e.target.value)}
        handleSearchClick={() => getCards(value, 1, limitPageItem)}
        value={value}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {!data || data.length === 0 ? (
            <NotFoundData />
          ) : (
            <>
              <Pagination
                onPageChange={onPageChange}
                currPage={pageInfo.currPage}
                totalPages={pageInfo.totalPages}
              />
              <SelectPageSize
                onInputValueChange={handleInputValueChange}
                value={limitPageItem}
              />
              <CardList data={data} />
            </>
          )}
        </>
      )}
    </div>
  );
}
