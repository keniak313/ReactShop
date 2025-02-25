import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div>
      <i>{error.statusText || error.message}</i>
      <hr />
      <Link to="/">
        You can go back to the home page by clicking here.
      </Link>      
    </div>
  );
};

export default ErrorPage;
