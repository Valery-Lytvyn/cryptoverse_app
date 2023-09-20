import { useState, useEffect } from "react";
import { Col, Row, Select } from "antd";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { LineChart, Loader } from "../components";

import { CryptoDetails } from "../types";
import { Option, Text, Title } from "../constants/antConst";
import { time } from "../constants";

const CryptoDetailsPage = () => {
  const { coinId } = useParams();

  const [timePeriod, setTimePeriod] = useState<string>(time[2]);
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails | object>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const { data, isFetching, isError } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  useEffect(() => {
    if (data && !isFetching && !isError) {
      setCryptoDetails(data.data?.coin);
      setIsLoading(false);
    }
  }, [data, isFetching, isError]);

  const {
    name,
    symbol,
    price,
    rank,
    marketCap,
    allTimeHigh,
    numberOfMarkets,
    numberOfExchanges,
    supply,
    description,
    links,
  } = cryptoDetails as CryptoDetails;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${price && millify(+price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${price && millify(+price)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${marketCap && millify(+marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${allTimeHigh?.price && millify(+allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${supply?.total && millify(+supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${supply?.circulating && millify(+supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const loading = isLoading || isFetching;

  return (
    <>
      <Col className="coin_detail_container">
        <Col className="coin_heading_container">
          <Title level={2} className="coin_name">
            {name} ({symbol})Price
          </Title>
          <p>
            {name} live price in US Dollar (USD). View value statistics, market
            cap and supply.
          </p>
        </Col>
        <Select
          defaultValue={time[2]}
          className="select_timeperiod"
          placeholder="Select Time Period"
          onChange={(value: string) => setTimePeriod(value)}
        >
          {time.map((period) => (
            <Option key={period}>{period}</Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(+price)}
          coinName={name}
        />
        <Col className="stats_container">
          <Col className="coin_value_statistics">
            <Col className="coin_value_statistics_heading">
              <Title level={3} className="coin_details_heading">
                {name} Value Statistics
              </Title>
              <p>
                An overview showing the statistics of {name}, such as the base
                and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin_stats" key={title}>
                <Col className="coin_stats_name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other_stats_info">
            <Col className="coin_value_statistics_heading">
              <Title level={3} className="coin_details_heading">
                Other Stats Info
              </Title>
              <p>
                An overview showing the statistics of {name}, such as the base
                and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin_stats" key={title}>
                <Col className="coin_stats_name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin_desc_link">
          <Row className="coin_desc">
            <Title level={3} className="coin_details_heading">
              What is {name}
            </Title>
            <Text> {description}</Text>
          </Row>
          <Col className="coin_links">
            <Title level={3} className="coin_details_heading">
              {name} Links
            </Title>
            {links &&
              links.map(({ type, name, url }) => (
                <Row className="coin_link" key={name}>
                  <Title level={5} className="link_name">
                    {type}
                  </Title>
                  <a href={url} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </Row>
              ))}
          </Col>
        </Col>
      </Col>

      {loading && <Loader />}
    </>
  );
};

export default CryptoDetailsPage;
