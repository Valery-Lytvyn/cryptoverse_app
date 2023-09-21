import { Link, useRouteError } from "react-router-dom";
import { Text, Title } from "../constants/antConst";
import { ROUTES } from "../constants/routes";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;
  return (
    <div className="error">
      <Title level={2}>Oops!</Title>
      <Title level={2}>Sorry, an unexpected error has occurred.</Title>
      <Text>{error?.statusText || error?.message}</Text>
      <Link to={ROUTES.index}>Back to Home</Link>
    </div>
  );
}

export default ErrorPage;
