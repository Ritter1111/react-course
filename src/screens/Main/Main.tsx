import { useEffect, useState } from "react";
import { CardList } from "../../components/CardList/CardList";
import { CardSearch } from "../../components/CardSearch/CardSearch";
import { Loader } from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination/Pagination";
import { ErrorBtn } from "../../components/Error/ErrorBtn/ErrorBtn";
import { SelectPageSize } from "../../components/SelectPageSize/SelectPageSize";
import { useGetCardsQuery } from "../../store/api/api";
import { useRouter } from "next/router";
import styles from "../../screens/Main/Main.module.css";

export default function Main() {
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });
  const router = useRouter();

  const { data, isFetching } = useGetCardsQuery({
    page: Number(router.query.page) || 1,
    param:
      String(router.query.q) || router.query.q === undefined
        ? ""
        : String(router.query.q),
    limit: Number(router.query.limit) || 10,
  });

  useEffect(() => {
    if (data) {
      setPageInfo({
        currPage: data?.pagination.current_page,
        totalPages: data?.pagination.last_visible_page,
      });
    }
  }, [data, isFetching]);

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
      {isFetching && <Loader />}
      {!isFetching && data && (
        <>
          <SelectPageSize />
          <CardList cards={data?.data} />
          <Pagination pageInfo={data.pagination} />
        </>
      )}
    </div>
  );
}
