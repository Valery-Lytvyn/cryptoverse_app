export const ROUTES = {
  index: "/",
  cryptocurrencies: "/cryptocurrencies",
  details: (coinId: string | null) =>
    coinId ? `/crypto/${coinId}` : "/crypto/:coinId",
  exchanges: "/exchanges",
  news: "/news",
};
