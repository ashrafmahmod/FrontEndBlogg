import { useState } from "react";
import "./comment-list.css";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import { formatDistanceToNow } from "date-fns"; // Import the function
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";
const CommentList = ({ comments }) => {
  const { user } = useSelector((state) => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [CommentForUpdate, setCommentForUpdate] = useState(null);
  const dispatch = useDispatch();
  // update comment handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };
  // delete post handler using sweet alert
  const delteCommenttHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        // swal("Comment Has Been Deleted", {
        //   icon: "success",
        // });
        dispatch(deleteComment(commentId));
      }
      //  else {
      //   swal("Something went wrong!");
      // }
    });
  };
  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => {
        return (
          <div className="comment-item" key={comment._id}>
            <div className="comment-item-info">
              <div className="coment-item-username">{comment.username}</div>
              <div className="comment-item-time">
                {" "}
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}{" "}
              </div>
            </div>
            <p className="comment-item-text">{comment.text}</p>
            {user?._id === comment?.user && (
              <div className="comment-item-icon-wrapper">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => updateCommentHandler(comment)}
                ></i>
                <i
                  onClick={() => delteCommenttHandler(comment?._id)}
                  className="bi bi-trash-fill"
                ></i>
              </div>
            )}
          </div>
        );
      })}
      {updateComment && (
        <UpdateCommentModal
          CommentForUpdate={CommentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
