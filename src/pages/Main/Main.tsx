import { useCallback, useEffect, useState } from 'react';
import { CardList } from '../../components/CardList/CardList';
import { CardSearch } from '../../components/CardSearch/CardSearch';
import { Loader } from '../../components/Loader/Loader';
import { NotFoundData } from '../../components/NotFound/NotFoundData';
import { Pagination } from '../../components/Pagination/Pagination';
import { useFetching } from '../../hooks/useFetching';
import { useQueryParams } from '../../hooks/useQueryParams';
import { ErrorBtn } from '../../components/Error/ErrorBtn/ErrorBtn';
import { SelectPageSize } from '../../components/SelectPageSize/SelectPageSize';
import { Outlet } from 'react-router-dom';
import styles from './Main.module.css';
import { useAppContext } from '../../context';

export default function Main() {
  const {
    queryPage,
    queryLimit,
    querySearch,
    setDefaultQueryParametr,
    setSearchParams,
  } = useQueryParams();
  const [limitPageItem, setLimitPageItem] = useState(Number(queryLimit));
  const { loading, pageInfo, fetchAllCards, setPageInfo } = useFetching();
  const { items, searchValue, setSearchValue } = useAppContext();

  const getCards = useCallback(
    async (value: string, page: number, limit: number) => {
      fetchAllCards(value, page, limit);

      setSearchParams({
        page: String(page || pageInfo.currPage) || queryPage,
        q: value || querySearch || searchValue,
        limit: String(limit || setDefaultQueryParametr(queryLimit, '10')),
      });
    },
    [
      fetchAllCards,
      setSearchParams,
      pageInfo.currPage,
      queryPage,
      querySearch,
      searchValue,
      setDefaultQueryParametr,
      queryLimit,
    ]
  );

  useEffect(() => {
    if (searchValue) {
      setSearchValue(searchValue);
    }
    getCards(
      querySearch,
      setDefaultQueryParametr(queryPage, '1'),
      setDefaultQueryParametr(queryLimit, '10')
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
        getCards(searchValue, newPage, limitPageItem);
      }
    },
    [getCards, pageInfo.totalPages, searchValue, limitPageItem]
  );

  return (
    <div className={styles.app}>
      <Outlet />
      <ErrorBtn />
      <CardSearch
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={() => getCards(searchValue, 1, limitPageItem)}
        value={searchValue}
      />
      {loading && <Loader />}
      {!loading && (
        <>
          {!items || items.length === 0 ? (
            <NotFoundData />
          ) : (
            <>
              <SelectPageSize
                onInputValueChange={handleInputValueChange}
                value={limitPageItem}
              />
              <CardList />
              <Pagination
                onPageChange={onPageChange}
                currPage={pageInfo.currPage}
                totalPages={pageInfo.totalPages}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
