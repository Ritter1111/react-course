import { Details } from "@/components/Details/Details";
import { MainLayout } from "@/components/layout/mainLayout";
import { wrapper } from "@/store/store";
import { getCard, getCards, getRunningQueriesThunk } from "@/store/api/api";
import { CardData, IPagination } from "@/types/types";
import { initialPaginationData } from "@/utils/consts";
import { FC } from "react";

interface DetailsMainProps {
  data: CardData;
  cards: CardData[];
  pagination: IPagination;
}

const DetailsContent: FC<DetailsMainProps> = ({ data, cards, pagination }) => {
  return (
    <MainLayout cards={cards} pagination={pagination}>
      <Details data={data} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { limit, page, q, id } = context.query;

    const detailsResponse = id
      ? await store.dispatch(getCard.initiate(id.toString()))
      : null;

    const cardsResponse = await store.dispatch(
      getCards.initiate({
        page: Number(page) || 1,
        param: q === undefined ? "" : String(q),
        limit: Number(limit) || 10,
      }),
    );

    await Promise.all([
      store.dispatch(getRunningQueriesThunk()),
      detailsResponse,
      cardsResponse,
    ]);

    return {
      props: {
        data: detailsResponse?.data || null,
        cards: cardsResponse?.data?.data || [],
        pagination: cardsResponse?.data?.pagination || initialPaginationData,
      },
    };
  },
);

export default DetailsContent;
