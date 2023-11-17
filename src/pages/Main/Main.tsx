import { useCallback, useEffect, useState } from 'react';
import { CardList } from '../../components/CardList/CardList';
import { CardSearch } from '../../components/CardSearch/CardSearch';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
// import { useFetching } from '../../hooks/useFetching';
import { useQueryParams } from '../../hooks/useQueryParams';
import { ErrorBtn } from '../../components/Error/ErrorBtn/ErrorBtn';
import { SelectPageSize } from '../../components/SelectPageSize/SelectPageSize';
import { Outlet } from 'react-router-dom';
import styles from './Main.module.css';
import { setSearchParam } from '../../utils/localStorage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetCardsQuery } from '../../store/api/api';

export default function Main() {
  const {
    queryPage,
    queryLimit,
    querySearch,
    setDefaultQueryParametr,
    setSearchParams,
  } = useQueryParams();
  // const [limitPageItem, setLimitPageItem] = useState(Number(queryLimit));
  // const { pageInfo, fetchAllCards, setPageInfo } = useFetching();
  const sValue = useSelector((state: RootState) => state.search.searchTerm);
  const itemLimit = useSelector((state: RootState) => state.limit.itemLimit);
  const { data, isLoading } = useGetCardsQuery({
    page: Number(queryPage),
    param: sValue || querySearch,
    limit: itemLimit || Number(queryLimit),
  });

  console.log(queryPage);

  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });

  useEffect(() => {
    if (data) {
      setPageInfo({
        currPage: data?.pagination.current_page,
        totalPages: data?.pagination.last_visible_page,
      });
    }
  }, [data]);

  const getCards = useCallback(
    async (value: string, page: number, limit: number) => {
      // fetchAllCards(value, page, limit);
      // refetch()

      setSearchParams({
        page: String(page),
        q: value === '' ? '' : value || sValue || querySearch,
        limit: String(limit || queryLimit),
      });
      if (querySearch) {
        setSearchParam('searchValue', querySearch);
      }
    },
    [
      // fetchAllCards,
      setSearchParams,
      pageInfo.currPage,
      querySearch,
      setDefaultQueryParametr,
      queryLimit,
    ]
  );
  useEffect(() => {
    // getCards(
    //   querySearch,
    //   setDefaultQueryParametr(queryPage, 1),
    //   setDefaultQueryParametr(queryLimit, 10)
    // );
    // setLimitPageItem(10);
  }, []);

  useEffect(() => {
    getCards(querySearch, 1, itemLimit);
    // setLimitPageItem(itemLimit);
  }, [itemLimit]);

  const onPageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pageInfo.totalPages) {
        setPageInfo({ ...pageInfo, currPage: newPage });
        // getCards(sValue, newPage, itemLimit);
      }
    },
    [pageInfo.totalPages, sValue, itemLimit]
  );

  return (
    <div className={styles.app} data-testid="main">
      <Outlet />
      <ErrorBtn />
      <CardSearch getCards={getCards} limitItem={itemLimit} />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <SelectPageSize />
          {data && <CardList cards={data?.data} />}
          {data && (
            <Pagination
              onPageChange={onPageChange}
              currPage={pageInfo.currPage}
              totalPages={pageInfo.totalPages}
            />
          )}
        </>
      )}
    </div>
  );
}
