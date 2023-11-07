import { CardData } from '../components/CardList/CardList';
import { API_URL } from './consts';

interface ICard {
  pagination?: IPagination;
  data: CardData[];
}

interface IPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

type DataInfo = {
  data: CardData;
};

export const fetchCards = async (
  page?: number,
  param?: string,
  limit?: number
): Promise<ICard> => {
  const apiUrl = param
    ? `${API_URL}?page=${page}&limit=${limit}&q=${param.trim()}`
    : `${API_URL}?page=${page}&limit=${limit}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCard = async (id: number): Promise<DataInfo> => {
  const apiUrl = `${API_URL}/${id}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
