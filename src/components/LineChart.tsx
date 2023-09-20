import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { LineChartProps } from "../types";
import { dateConverter } from "../services";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Title } from "../constants/antConst";

const LineChart = ({ coinHistory, currentPrice, coinName }: LineChartProps) => {
  const [coinPrice, setCoinPrice] = useState<string[]>([]);
  const [coinTimestamp, setCoinTimestamp] = useState<string[]>([]);

  useEffect(() => {
    const historyData = coinHistory?.data?.history;

    if (historyData) {
      const priceArr: string[] = [];
      const timestampArr: string[] = [];
      historyData.map((item) => {
        priceArr.push(item.price);
        timestampArr.push(dateConverter(item.timestamp));
      });
      setCoinTimestamp(timestampArr);
      setCoinPrice(priceArr);
    }
  }, [coinHistory]);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className="chart_header">
        <Title level={2} className="chart_title">
          {coinName} Price Chart
        </Title>
        <Col className="price_container">
          <Title level={5} className="price_change">
            {coinHistory?.data?.change} %
          </Title>
          <Title level={5} className="current_price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
