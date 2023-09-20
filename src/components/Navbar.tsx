import { useState, useEffect } from "react";
import { Avatar, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  FundOutlined,
  MenuOutlined,
  BoldOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../constants/routes";
import icon from "../assets/logo.webp";
import { Title } from "../constants/antConst";

const menuItems = [
  {
    key: "Home",
    icon: <HomeOutlined />,
    label: <Link to={ROUTES.index}>Home</Link>,
  },
  {
    key: "Cryptocurrencies",
    icon: <FundOutlined />,
    label: <Link to={ROUTES.cryptocurrencies}>Cryptocurrencies</Link>,
  },
  {
    key: "Exchanges",
    icon: <MoneyCollectOutlined />,
    label: <Link to={ROUTES.exchanges}>Exchanges</Link>,
  },
  {
    key: "News",
    icon: <BoldOutlined />,
    label: <Link to={ROUTES.news}>News</Link>,
  },
];

const SMALL_DISPLAY = 768;

const Navbar = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<null | number>(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize;
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize && screenSize < SMALL_DISPLAY) {
      setIsActiveMenu(false);
    } else {
      setIsActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar">
      <div className="nav_container">
        <div className="logo_container">
          <Avatar src={icon} alt="bitcoin" size="large" />
          <Title level={2} className="logo">
            <Link to={ROUTES.index}>Crypto</Link>
          </Title>
          {screenSize && screenSize < SMALL_DISPLAY && (
            <Button
              className="menu_control-container"
              onClick={() => setIsActiveMenu(!isActiveMenu)}
            >
              <MenuOutlined />
            </Button>
          )}
        </div>
        <div onClick={() => setIsActiveMenu(false)}>
          {isActiveMenu && <Menu theme="dark" items={menuItems} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
