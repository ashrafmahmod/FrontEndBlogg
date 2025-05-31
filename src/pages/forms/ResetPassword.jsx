import { useEffect, useState } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const dispacth = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispacth(getResetPassword(userId, token));
  }, [userId, token]);

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "") return toast.error("Password name is required");
    dispacth(resetPassword(password, { userId, token }));
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
