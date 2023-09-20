import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import {
  CryptoDetailsPage,
  CryptocurrenciesPage,
  ExchangesPage,
  HomePage,
  NewsPage,
} from "./index";
import { ROUTES } from "../constants/routes";

const LayoutPage = () => {
  return (
    <Layout>
      <div className="routes">
        <Routes>
          <Route path={ROUTES.index} element={<HomePage />} />
          <Route
            path={ROUTES.cryptocurrencies}
            element={<CryptocurrenciesPage />}
          />
          <Route path={ROUTES.exchanges} element={<ExchangesPage />} />
          <Route path={ROUTES.details(null)} element={<CryptoDetailsPage />} />
          <Route path={ROUTES.news} element={<NewsPage />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default LayoutPage;
