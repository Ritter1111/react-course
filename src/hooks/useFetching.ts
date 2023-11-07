import { useState } from 'react';
import { fetchCard, fetchCards } from '../utils/api';
import { useAppContext } from '../context';

export const useFetching = () => {
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });
  const { setItems, setSearchValue, setDetailsData } = useAppContext();

  const fetchAllCards = async (
    value?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    value && setSearchValue(value);

    const cardsData = await fetchCards(page, value, limit);

    setPageInfo({
      currPage: cardsData.pagination.current_page,
      totalPages: cardsData.pagination.last_visible_page,
    });

    setItems(cardsData.data);
    setLoading(false);
  };

  const fetchCardById = async (id: number) => {
    setLoading(true);

    const cardsData = await fetchCard(id);
    setDetailsData(cardsData.data);

    setLoading(false);
  };

  return {
    loading,
    pageInfo,
    fetchAllCards,
    setPageInfo,
    fetchCardById,
  };
};
