import { useState } from 'react';
import { setSearchParam } from '../utils/localStorage';
import { fetchCard, fetchCards } from '../utils/api';
import { ICardData } from '../interfaces/search-result.interface';

const useFetching = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ICardData[]>([]);
  const [delailsData, setDetailsData] = useState<ICardData>();
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });

  const fetchAllCards = async (
    value?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);

    value && setSearchParam('searchValue', value);

    const cardsData = await fetchCards(page, value, limit);

    if (cardsData.pagination) {
      setPageInfo({
        currPage: cardsData.pagination.current_page,
        totalPages: cardsData.pagination.last_visible_page,
      });
    }

    setData(cardsData.data);

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
    data,
    pageInfo,
    fetchAllCards,
    setPageInfo,
    fetchCardById,
    delailsData,
  };
};

export default useFetching;
