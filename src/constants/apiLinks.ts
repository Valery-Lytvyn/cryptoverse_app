export const API_LINKS = {
  coins: (count: string) => `/coins?limit=${count}`,
  coin: (coinId: string) => `/coin/${coinId}`,
  history: (coinId: string, timePeriod: string) =>
    `/coin/${coinId}/history?timePeriod=${timePeriod}`,
  exchanges: `/coin/Qwsogvtv82FCd/exchanges`,
  news: (newsCategory: string, count: string) =>
    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
};
