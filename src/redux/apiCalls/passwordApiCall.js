import { passwordActions } from "../slices/passwordSlice";
import request from "../../utiities/request";
import { toast } from "react-toastify";
// forgot password
export function forgotPassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// get reset password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(passwordActions.setError());
    }
  };
}
// get reset password
export function resetPassword(newPassword, user) {
  return async () => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
