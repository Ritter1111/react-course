import { CardList } from "@/components/CardList/CardList";
import { getCards, getCard, getRunningQueriesThunk } from "@/store/api/api";
import { wrapper } from "@/store/store";
import { InferGetServerSidePropsType } from "next";
import styles from "../../screens/Main/Main.module.css";
import { CardSearch } from "@/components/CardSearch/CardSearch";
import { ErrorBtn } from "@/components/Error/ErrorBtn/ErrorBtn";
import { SelectPageSize } from "@/components/SelectPageSize/SelectPageSize";
import { Pagination } from "@/components/Pagination/Pagination";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { limit, page, q } = context.query;

    const cardsResponce = await store.dispatch(
      getCards.initiate({
        page: Number(page) || 1,
        param: String(q) || q === undefined ? "" : String(q),
        limit: Number(limit) || 10,
      }),
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cardsResponce,
      },
    };
  },
);

export default function MainPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { cardsResponce } = props;

  const cardData = cardsResponce?.data?.data || [];
  const paginationData = cardsResponce.data?.pagination || {
    last_visible_page: 0,
    has_next_page: false,
    current_page: 1,
  };
  return (
    <div className={styles.app} data-testid="main">
      <ErrorBtn />
      <CardSearch />
      <SelectPageSize />
      <CardList cards={cardData} />
      <Pagination pageInfo={paginationData} />
    </div>
  );
}
