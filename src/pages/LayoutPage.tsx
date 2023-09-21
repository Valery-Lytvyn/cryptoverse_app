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
import ErrorPage from "./ErrorPage";

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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default LayoutPage;
