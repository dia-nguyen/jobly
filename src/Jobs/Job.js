import userContext from "../User/userContext";
import { useContext, useState } from "react";
import Errors from "../Utilities/Errors";
import JoblyApi from "../api";

/**
 * Renders a job card
 * Props: job - object like { id, title, salary, equity }
 */
function Job({ job }) {
  const { user, setUser } = useContext(userContext);
  const [errors, setErrors] = useState([]);

  const username = user.username;

  async function applyForJob(evt) {
    evt.preventDefault();
    try {
      await JoblyApi.applyToJob(username, job.id);
      const updatedUser = await JoblyApi.getUser(username);
      setUser((curr) => ({ ...curr, data: updatedUser }));
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="Job col-md-6 mb-3">
      <div className="card">
        {errors.length !== 0 && <Errors errors={errors} />}
        <div className="card-body">
          <h4 className="card-title">{job.title}</h4>
          <p className="card-text">{job.companyName}</p>
          <p className="card-text">Salary:{job.salary}</p>
          <p className="card-text">Equity:{job.equity}</p>
          {!user.applications.includes(job.id) ? (
            <button className="btn btn-sm btn-danger mt-2 float-end" onClick={applyForJob}>
              Apply
            </button>
          ) : (
            <button className="btn btn-sm btn-success mt-2 float-end" disabled>
              You've Applied
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Job;
