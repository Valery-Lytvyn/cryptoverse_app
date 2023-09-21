export const ROUTES = {
  index: "/cryptoverse_app",
  cryptocurrencies: "/cryptocurrencies",
  details: (coinId: string | null) =>
    coinId ? `/crypto/${coinId}` : "/crypto/:coinId",
  exchanges: "/exchanges",
  news: "/news",
};
