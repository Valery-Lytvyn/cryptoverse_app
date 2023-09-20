export interface CryptocurrenciesPageProps {
  simplified?: boolean;
}
export interface NewsPageProps {
  simplified?: boolean;
}

export interface CryptoData {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  price: string;
  marketCap: string;
  change: string;
}

interface Provider {
  image: { thumbnail: { contentUrl: string } };
  name: string;
}
export interface NewsData {
  datePublished: string;
  url: string;
  name: string;
  image: { thumbnail: { contentUrl: string } };
  description: string;
  provider: Provider[];
}

export interface CryptoDetails {
  name: string;
  symbol: string;
  price: string;
  rank: number;
  marketCap: string;
  allTimeHigh: { price: string; timestamp: number };
  numberOfMarkets: number;
  numberOfExchanges: number;
  supply: { confirmed: boolean; circulating: string; total: string };
  description: string;
  links: [{ name: string; url: string; type: string }];
}

export interface LineChartProps {
  coinHistory: {
    data: { change: string; history: [{ price: string; timestamp: number }] };
  };
  currentPrice: string;
  coinName: string;
}

export interface OptionData {
  items: string;
}
export interface ExchangesList {
  uuid: string;
  rank: number;
  iconUrl: string;
  name: string;
  numberOfMarkets: number;
  price: string;
  coinrankingUrl: string;
}

export interface GlobalStats {
  total: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
  totalMarkets: number;
}
