import { profileActions } from "../slices/profileSlice";
import request from "../../utiities/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
// get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// upload profile photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      // const state = getState();
      const { data } = await request.post(
        `api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            // Authorization: "Bearer " + state.auth.user.tokens, // token from redux tolkit
            Authorization: "Bearer " + getState().auth.user.token, // token from redux tolkit
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilephoto));
      dispatch(authActions.setUserPhoto(data.profilephoto));

      toast.success(data.message);
      // modify the user in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilephoto = data?.profilephoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// update profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      // const state = getState();
      const { data } = await request.put(
        `api/users/profile/${userId}`,
        profile,
        {
          headers: {
            // Authorization: "Bearer " + state.auth.user.tokens, // token from redux tolkit
            Authorization: "Bearer " + getState().auth.user.token, // token from redux tolkit
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      // modify the user in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// delete profile (account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      // const state = getState();
      const { data } = await request.delete(
        `api/users/profile/${userId}`,

        {
          headers: {
            // Authorization: "Bearer " + state.auth.user.tokens, // token from redux tolkit
            Authorization: "Bearer " + getState().auth.user.token, // token from redux tolkit
          },
        }
      );

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(profileActions.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}
// get users count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      // const state = getState();
      const { data } = await request.get(
        `api/users/count`,

        {
          headers: {
            // Authorization: "Bearer " + state.auth.user.tokens, // token from redux tolkit
            Authorization: "Bearer " + getState().auth.user.token, // token from redux tolkit
          },
        }
      );

      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// get users profile (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      // const state = getState();
      const { data } = await request.get(
        `api/users/profile`,

        {
          headers: {
            // Authorization: "Bearer " + state.auth.user.tokens, // token from redux tolkit
            Authorization: "Bearer " + getState().auth.user.token, // token from redux tolkit
          },
        }
      );

      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
