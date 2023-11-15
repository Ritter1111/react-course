import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/consts';
import { ICard } from '../../utils/api';
import { CardData } from '../../types/types';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    getCards: builder.query<
      ICard,
      { page?: number; param?: string; limit?: number }
    >({
      query: ({ page, param, limit }) =>
        param
          ? `?page=${page}&limit=${limit}&q=${param.trim()}`
          : `?page=${page}&limit=${limit}`,
    }),
    getCard: builder.query<CardData, string>({ query: (id) => `${id}` }),
  }),
});

export const { useGetCardsQuery, useGetCardQuery } = animeApi;
