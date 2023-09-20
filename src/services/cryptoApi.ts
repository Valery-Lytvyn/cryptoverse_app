import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINKS } from "../constants/apiLinks";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_APP_CRYPTO_RAPIDAPI_HOST,
};
const baseUrl = import.meta.env.VITE_APP_CRYPTO_API_URL;

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(API_LINKS.coins(count)),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(API_LINKS.coin(coinId)),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(API_LINKS.history(coinId, timePeriod)),
    }),
    getExchanges: builder.query({
      query: () => createRequest(API_LINKS.exchanges),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
