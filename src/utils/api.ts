import { ICard } from '../interfaces/Card.interface';
import { API_URL } from './consts';

export const fetchCards = (param?: string): Promise<ICard> => {
  const apiUrl = param
    ? `${API_URL}/?page=1&name=${param.trim()}`
    : `${API_URL}/?page=1`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
