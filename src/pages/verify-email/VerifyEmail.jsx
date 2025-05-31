import "./verify-email.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { verifyemail } from "../../redux/apiCalls/authApiCalls";
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyemail(userId, token));
  }, [userId, token]);
  return (
    <section className="verify-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>{" "}
          <h1 className="verify-email-title">
            Your eamil has been successfully verified
          </h1>
          <Link to={"/login"} className="verify-email-link">
            Go to login page
          </Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
