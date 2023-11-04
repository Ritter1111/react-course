import { ICard } from '../interfaces/search-result.interface';
import { API_URL } from './consts';

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

export const fetchCard = async (id: number): Promise<ICard> => {
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
