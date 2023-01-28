import { Link } from "react-router-dom";
import "./Company.css";

/**
 * Company - renders company information
 * Props:
 * - company - obj like { name, description, handle, ... }
 */
function Company({ company }) {

  return (
    <Link to={`/companies/${company.handle}`} className="Company col-md-6 mb-3">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{company.name}</h4>
          <p className="card-text">{company.description}</p>
          {company.logoUrl && <img src={company.logoUrl} className="float-end" alt={company.handle} />}
        </div>
      </div>
    </Link>
  );
}

export default Company;
