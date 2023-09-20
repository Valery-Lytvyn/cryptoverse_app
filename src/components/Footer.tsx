import { Space } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Text, Title } from "../constants/antConst";

const Footer = () => {
  return (
    <div className="footer">
      <Title level={5}>Cryptoverse</Title>
      <Text>All rights reserved</Text>
      <Space>
        <Link to={ROUTES.index}>Home</Link>
        <Link to={ROUTES.exchanges}>Exchanges</Link>
        <Link to={ROUTES.news}>News</Link>
      </Space>
    </div>
  );
};

export default Footer;
