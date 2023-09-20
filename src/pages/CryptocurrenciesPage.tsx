import { useState, useEffect } from "react";
import { Card, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loader } from "../components";
import { ROUTES } from "../constants/routes";
import millify from "millify";
import { CryptoData, CryptocurrenciesPageProps } from "../types";
import { MAX_COUNT_COINS, MIN_COUNT_COINS } from "../constants";

const CryptocurrenciesPage = ({ simplified }: CryptocurrenciesPageProps) => {
  const {
    data: cryptosList,
    isFetching,
    isError,
  } = useGetCryptosQuery(simplified ? MIN_COUNT_COINS : MAX_COUNT_COINS);
  const [cryptos, setCryptos] = useState<[] | CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredData = cryptosList?.data?.coins.filter((item: CryptoData) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setCryptos(filteredData);
    } else {
      if (cryptosList && !isFetching && !isError) {
        setCryptos(cryptosList?.data?.coins);
      }
    }
    setIsLoading(false);
  }, [cryptosList, searchTerm, isFetching, isError]);

  const loading = isLoading || isFetching;

  return (
    <>
      {!simplified && (
        <div className="search_crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto_card_container">
        {cryptos &&
          cryptos.map(
            ({ uuid, rank, name, iconUrl, price, marketCap, change }) => (
              <Col xs={24} sm={12} lg={6} className="crypto_card" key={uuid}>
                <Link to={ROUTES.details(uuid)}>
                  <Card
                    title={`${rank}. ${name}`}
                    extra={<img className="crypto_image" src={iconUrl} />}
                    hoverable
                  >
                    <p>Price: {millify(+price)}</p>
                    <p>Market Cap: {millify(+marketCap)}</p>
                    <p>Daily Change: {millify(+change)}%</p>
                    <p>ID:{uuid}</p>
                  </Card>
                </Link>
              </Col>
            )
          )}
      </Row>
      {loading && <Loader />}
    </>
  );
};

export default CryptocurrenciesPage;
