import { useState, useEffect } from "react";
import { Col, Collapse, Row, Avatar } from "antd";
import millify from "millify";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { Loader } from "../components";
import { Text } from "../constants/antConst";
import { ExchangesList } from "../types";

const ExchangesPage = () => {
  const { data, isFetching, isError } = useGetExchangesQuery({});
  const [exchangesList, setExchangesList] = useState<ExchangesList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && !isFetching && !isError) {
      setExchangesList(data?.data?.exchanges);
      setIsLoading(false);
    }
  }, [data, isFetching, isError]);

  const loading = isLoading || isFetching;

  return (
    <>
      <Row>
        <Col span={14}>Exchanges</Col>
        <Col span={6}>Markets</Col>
        <Col span={4}>Change</Col>
      </Row>
      <Row>
        {exchangesList &&
          exchangesList.map(
            ({
              uuid,
              rank,
              iconUrl,
              name,
              price,
              numberOfMarkets,
              coinrankingUrl,
            }) => {
              const items = [
                {
                  key: uuid,
                  label: (
                    <Row>
                      <Col span={14}>
                        <Text>
                          <strong>{rank}.</strong>
                        </Text>
                        <Avatar className="exchange_image" src={iconUrl} />
                        <Text>
                          <strong>{name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>${millify(+price)}</Col>
                      <Col span={4}>{millify(numberOfMarkets)}</Col>
                    </Row>
                  ),
                  children: (
                    <a href={coinrankingUrl} target="_blank" rel="noreferrer">
                      {coinrankingUrl}
                    </a>
                  ),
                },
              ];
              return (
                <Col span={24} key={uuid}>
                  <Collapse items={items} defaultActiveKey={["1"]} />
                </Col>
              );
            }
          )}
      </Row>
      {loading && <Loader />}
    </>
  );
};

export default ExchangesPage;
