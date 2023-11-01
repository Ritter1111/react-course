import { API_URL } from './consts';
import { ICard } from '../interfaces/Card.interface';

export const fetchCards = async (page: number, param?: string): Promise<ICard> => {
  const apiUrl = param
    ? `${API_URL}/?page=${page}&search=${param.trim()}`
    : `${API_URL}/?page=${page}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
