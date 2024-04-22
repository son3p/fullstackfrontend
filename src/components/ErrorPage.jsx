import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div className="error-page text-center">
    <h1>Oops! Page Not Found</h1>
    <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
    <p>Head back to <Link to="/">Home</Link>.</p>
    <img src="public/sad-cat-cat-in-front-of-sea.gif" alt="Error 404" className="img-fluid" />
  </div>
);

export default ErrorPage;