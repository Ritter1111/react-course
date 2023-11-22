import { useEffect, useState } from "react";
import { CardList } from "../../components/CardList/CardList";
import { CardSearch } from "../../components/CardSearch/CardSearch";
import { Loader } from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination/Pagination";
// import { useQueryParams } from '../../hooks/useQueryParams';
import { ErrorBtn } from "../../components/Error/ErrorBtn/ErrorBtn";
import { SelectPageSize } from "../../components/SelectPageSize/SelectPageSize";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetCardsQuery } from "../../store/api/api";
import { setMainPageLoading } from "../../store/loadingSlice/loading.slice";

export default function Main() {
  // const { queryPage, queryLimit, setSearchParams } = useQueryParams();
  const sValue = useSelector((state: RootState) => state.search.searchTerm);
  const itemLimit = useSelector((state: RootState) => state.limit.itemLimit);
  const loading = useSelector((state: RootState) => state.loading.mainLoading);
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });
  const dispatch = useDispatch();

  const { data, isFetching } = useGetCardsQuery({
    page: 1,
    param: sValue,
    limit: itemLimit,
  });

  useEffect(() => {
    dispatch(setMainPageLoading(isFetching));

    if (data) {
      setPageInfo({
        currPage: data?.pagination.current_page,
        totalPages: data?.pagination.last_visible_page,
      });
    }
  }, [data, isFetching, dispatch]);

  // const setParams = (page: number, limit: number) => {
  //   // setSearchParams({
  //   //   page: String(page) || queryPage,
  //   //   limit: String(limit || queryLimit),
  //   // });
  // };

  // useEffect(() => {
  //   setParams(1, itemLimit);
  // }, [itemLimit]);

  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageInfo.totalPages) {
      setPageInfo({ ...pageInfo, currPage: newPage });
    }
  };

  return (
    <div className={styles.app} data-testid="main">
      <Outlet />
      <ErrorBtn />
      <CardSearch limitItem={itemLimit} />
      {loading && <Loader />}
      {!loading && data && (
        <>
          <SelectPageSize />
          <CardList cards={data?.data} />
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
