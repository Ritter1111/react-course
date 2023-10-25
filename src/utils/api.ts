import { ICard } from "../interfaces/Card.interface";

export const fetchCards = (param?: string): Promise<ICard> => {
  const apiUrl = param
    ? `https://rickandmortyapi.com/api/character/?name=${param.trim()}`
    : 'https://rickandmortyapi.com/api/character/';

  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw error;
    });
};