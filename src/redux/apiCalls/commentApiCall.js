import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";
import request from "../../utiities/request";
import { toast } from "react-toastify";
// create comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newComment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postActions.addCommentToPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// update comment
export function updateComment(commentId, Comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        Comment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(postActions.updateCommentPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// delete comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(
        `/api/comments/${commentId}`,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(postActions.deleteCommentFromPost(commentId));
      dispatch(commentActions.deleteComent(commentId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// fetch all comments
export function fetchAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/comments`,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
