import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/consts";
import { CardData } from "../../types/types";
import { HYDRATE } from "next-redux-wrapper";

export interface ICard {
  pagination: IPagination;
  data: CardData[];
}

export interface IPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

export type DataInfo = {
  data: CardData;
};

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
    getCard: builder.query<CardData, string>({
      query: (id) => `${id}`,
      transformResponse: (response: DataInfo) => response.data,
    }),
  }),
});

export const { useGetCardsQuery, useGetCardQuery } = animeApi;
