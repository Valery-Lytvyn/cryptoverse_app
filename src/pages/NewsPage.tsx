import { useEffect, useState } from "react";
import { Avatar, Card, Col, Row, Select } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Option, Text, Title } from "../constants/antConst";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Loader } from "../components";
import {
  CRYPTO,
  MAX_COUNT_COINS,
  MAX_COUNT_NEWS,
  MIN_COUNT_NEWS,
} from "../constants";
import { NewsData, NewsPageProps } from "../types";

const noImage = "https://img.icons8.com/wired/64/no-image.png";

const NewsPage = ({ simplified }: NewsPageProps) => {
  const [newsCategory, setNewsCategory] = useState({ CRYPTO });
  const { data, isFetching, isError } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? MIN_COUNT_NEWS : MAX_COUNT_NEWS,
  });
  const { data: coinsData } = useGetCryptosQuery(MAX_COUNT_COINS);
  const [cryptoNews, setCryptosNews] = useState<[] | NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionValue, setOptionValue] = useState([]);

  useEffect(() => {
    if (data && !isFetching && !isError) {
      setCryptosNews(data.value);
      setIsLoading(false);
    }
  }, [data, isFetching, isError]);

  useEffect(() => {
    if (coinsData) {
      setOptionValue(coinsData.data?.coins);
    }
  }, [coinsData]);

  const loading = isLoading || isFetching;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select_news"
              placeholder="Select a Crypto"
              optionFilterProp="items"
              onChange={(value) => setNewsCategory(value)}
            >
              <Option value={CRYPTO}>Cryptocurrency</Option>
              {optionValue &&
                optionValue.map(({ name }) => (
                  <Option value={name} key={name}>
                    {name}
                  </Option>
                ))}
            </Select>
          </Col>
        )}
        {cryptoNews &&
          cryptoNews.length > 0 &&
          cryptoNews.map(
            ({ datePublished, url, name, image, description, provider }) => (
              <Col xs={24} sm={12} lg={8} key={`${datePublished}${url}`}>
                <Card hoverable className="news_card">
                  <a href={url} target="_blank" rel="noreferrer">
                    <div className="news_image_container">
                      <Title className="news_title" level={4}>
                        {name}
                      </Title>
                      <img
                        src={image?.thumbnail?.contentUrl || noImage}
                        alt={name}
                        style={{ maxWidth: "200px", maxHeight: "100px" }}
                      />
                    </div>
                    <p>
                      {description.length > 100
                        ? `${description.substring(0, 100)}...`
                        : description}
                    </p>
                    <div className="provider_container">
                      <div>
                        <Avatar
                          src={
                            provider[0].image?.thumbnail?.contentUrl || noImage
                          }
                          alt="news"
                        />
                        <Text className="provider_name">
                          {provider[0].name}
                        </Text>
                        <Text>
                          {moment(datePublished).startOf("s").fromNow()}
                        </Text>
                      </div>
                    </div>
                  </a>
                </Card>
              </Col>
            )
          )}
      </Row>
      {loading && <Loader />}
    </>
  );
};

export default NewsPage;
