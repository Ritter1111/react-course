import { useEffect, useState } from "react";
import { CardList } from "../../components/CardList/CardList";
import { CardSearch } from "../../components/CardSearch/CardSearch";
import { Loader } from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination/Pagination";
import { ErrorBtn } from "../../components/Error/ErrorBtn/ErrorBtn";
import { SelectPageSize } from "../../components/SelectPageSize/SelectPageSize";
import styles from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetCardsQuery } from "../../store/api/api";
import { setMainPageLoading } from "../../store/loadingSlice/loading.slice";
import { useRouter } from "next/router";

export default function Main() {
  const sValue = useSelector((state: RootState) => state.search.searchTerm);
  const loading = useSelector((state: RootState) => state.loading.mainLoading);
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isFetching } = useGetCardsQuery({
    page: Number(router.query.page) || 1,
    param: sValue,
    limit: Number(router.query.limit),
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

  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageInfo.totalPages) {
      setPageInfo({ ...pageInfo, currPage: newPage });
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      });
    }
  };

  return (
    <div className={styles.app} data-testid="main">
      <ErrorBtn />
      <CardSearch />
      {loading && <Loader />}
      {!loading && data && (
        <>
          <SelectPageSize />
          <CardList cards={data?.data} />
          <Pagination onPageChange={onPageChange} pageInfo={pageInfo} />
        </>
      )}
    </div>
  );
}
