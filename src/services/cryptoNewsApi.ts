import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINKS } from "../constants/apiLinks";

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_APP_NEWS_RAPIDAPI_HOST,
};
const baseUrl = import.meta.env.VITE_APP_NEWS_API_URL;

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(API_LINKS.news(newsCategory, count)),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
