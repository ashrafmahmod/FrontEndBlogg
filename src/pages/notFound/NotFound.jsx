import "./not-found.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found-title">
        404
        <h1 className="not-found-text">Page Not Found</h1>
        <Link to={"/"} className="not-found-link">
          Go to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
