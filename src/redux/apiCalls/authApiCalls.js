import { authActions } from "../slices/authSlice";
import request from "../../utiities/request";
import { toast } from "react-toastify";
// login user
export function loginUser(user) {
  return async (dispatch) => {
    // fetch
    // try {
    //   const response = await fetch("http://localhost:8000/api/auth/login", {
    //     method: "POST",
    //     body: JSON.stringify(user),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   const data = await response.json();

    //   dispatch(authActions.login(data));
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    // } catch (error) {
    //   console.log(error);
    // }
    // axios
    try {
      // const res = await axios.post("http://localhost:8000/api/auth/login",user)
      // dispatch(authActions.login(res.data));
      // const { data } = await axios.post(
      //   "http://localhost:8000/api/auth/login",
      //   user
      // );
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}
// register
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// verify email
export function verifyemail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);

      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
