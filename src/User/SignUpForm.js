import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../Utilities/Errors";
import "./SignUpForm.css";

/**
 * SignUp Form
 *
 * Props: signUp - function to call from parent
 *
 * State:
 * - formData - input changing
 * - errors - array of errors from API to display
 *
 *  * App -> RouteList -> SignupForm
 */
function SignUpForm({ signUp }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  /** Handles form input changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  /** On submit, calls parent function and redirects to home*/
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signUp(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="SignUpForm m-auto">
      {errors.length !== 0 && <Errors errors={errors} />}
      <h3 className="text-center mb-3">Sign Up</h3>
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control mb-2"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            className="form-control mb-2"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            className="form-control mb-2"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control mb-2"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <div className="d-block text-center mt-4">
            <button className="btn btn-primary w-100">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
