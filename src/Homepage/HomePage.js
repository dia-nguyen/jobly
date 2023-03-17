import userContext from "../User/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import joblyLogo from "../jobly-logo.svg";

/**
 * Renders HomePage
 * App -> RouteList -> HomePage
 */
function HomePage() {
  const { user } = useContext(userContext);

  return (
    <div className="HomePage">

      <h1>Jobly <img src={joblyLogo} alt="jobly logo" /> </h1>
      <h3>All the jobs in one, convenient place.</h3>
      {user ? (
        <p className="mt-4">{`Welcome back ${user.firstName}!`}</p>
      ) : (
        <div className="HomePage-btn">
          <Link to="/login" className="btn btn-primary me-2">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
