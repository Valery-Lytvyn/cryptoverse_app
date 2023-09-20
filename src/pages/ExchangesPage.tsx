import { useState, useEffect } from "react";
import { Col, Collapse, Row, Avatar } from "antd";
import millify from "millify";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { Loader } from "../components";
import { Panel, Text } from "../constants/antConst";
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
            }) => (
              <Col span={24} key={uuid}>
                <Collapse>
                  <Panel
                    key={uuid}
                    showArrow={false}
                    header={
                      <Row key={uuid}>
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
                    }
                  >
                    <a href={coinrankingUrl} target="_blank" rel="noreferrer">
                      {coinrankingUrl}
                    </a>
                  </Panel>
                </Collapse>
              </Col>
            )
          )}
      </Row>
      {loading && <Loader />}
    </>
  );
};

export default ExchangesPage;
