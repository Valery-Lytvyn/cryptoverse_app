import { useState, useEffect } from "react";
import { Col, Row, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { CryptocurrenciesPage, NewsPage } from ".";
import { Loader } from "../components";
import { GlobalStats } from "../types";
import { Title } from "../constants/antConst";
import { MIN_COUNT_COINS } from "../constants";

const HomePage = () => {
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isFetching, isError } = useGetCryptosQuery(MIN_COUNT_COINS);

  useEffect(() => {
    if (data && !isFetching && !isError) {
      setGlobalStats(data?.data?.stats);
      setIsLoading(false);
    }
  }, [data, isFetching, isError]);

  const statisticData = [
    { title: "Total Cryptocurrencies", value: globalStats?.total },
    { title: "Total Exchanges", value: globalStats?.totalExchanges },
    { title: "Total Market Cap", value: globalStats?.totalMarketCap },
    { title: "Total 24h Volume", value: globalStats?.total24hVolume },
    { title: "Total Markets", value: globalStats?.totalMarkets },
  ];

  const loading = isLoading || isFetching;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        {statisticData.map(({ title, value }) => (
          <Col span={12} key={title}>
            <Statistic title={title} value={millify(value || 0)} key={title} />
          </Col>
        ))}
      </Row>
      <div className="home_heading_container">
        <Title level={2} className="home_title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show_more">
          <Link to={ROUTES.cryptocurrencies}>Show more</Link>
        </Title>
      </div>
      <CryptocurrenciesPage simplified />
      <div className="home_heading_container">
        <Title level={2} className="home_title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to={ROUTES.news}>Show more</Link>
        </Title>
      </div>
      <NewsPage simplified />
      {loading && <Loader />}
    </>
  );
};

export default HomePage;
