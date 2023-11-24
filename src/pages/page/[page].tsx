import { getCards, getRunningQueriesThunk } from "@/store/api/api";
import { wrapper } from "@/store/store";
import { ICardProps, MainLayout } from "@/components/layout/mainLayout";
import { initialPaginationData } from "@/utils/consts";

export default function Home({ cards, pagination }: ICardProps) {
  return <MainLayout cards={cards} pagination={pagination} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { limit, page, q } = context.query;

    const cardsResponce = await store.dispatch(
      getCards.initiate({
        page: Number(page) || 1,
        param: q === undefined ? "" : String(q),
        limit: Number(limit) || 10,
      }),
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cards: cardsResponce?.data?.data || [],
        pagination: cardsResponce.data?.pagination || initialPaginationData,
      },
    };
  },
);
