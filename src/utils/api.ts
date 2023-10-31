import { ICard } from '../interfaces/card.interface';
import { API_URL } from './consts';

export const fetchCards = async (param?: string): Promise<ICard> => {
  const apiUrl = param
    ? `${API_URL}/?page=1&name=${param.trim()}`
    : `${API_URL}/?page=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
