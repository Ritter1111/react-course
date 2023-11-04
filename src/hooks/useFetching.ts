import { useState } from 'react';
import { setSearchParam } from '../utils/localStorage';
import { fetchCards } from '../utils/api';
import { ICardData } from '../interfaces/search-result.interface';

const useFetching = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: ICardData[] }>({ data: [] });
  const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });

  const fetchAllCards = async (
    value: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);

    setSearchParam('searchValue', value);

    const cardsData = await fetchCards(page, value, limit);

    if (cardsData.pagination) {
      setPageInfo({
        currPage: cardsData.pagination.current_page,
        totalPages: cardsData.pagination.last_visible_page,
      });
    }

    setData(cardsData);

    setLoading(false);
  };

  return {
    loading,
    data,
    pageInfo,
    fetchAllCards,
    setPageInfo,
  };
};

export default useFetching;
