import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCalls";
const HeaderRight = () => {
  // const auth = useSelector(state=>state.auth)
  // const user = auth.user
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  // logout handler
  const logoutHandler = function () {
    setDropdown(false);
    dispatch(logoutUser());
  };
  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              className="header-right-username"
              onClick={() => setDropdown((prev) => !prev)}
            >
              {user.username}
            </span>
            <img
              src={user?.profilephoto.url}
              alt="user-photo"
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  onClick={() => setDropdown(false)}
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={logoutHandler} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {" "}
          <Link to={"/login"} className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to={"/register"} className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
