import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import {
  deleteComment,
  fetchAllComments,
} from "../../redux/apiCalls/commentApiCall";
const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, []);

  // delete comment handler using sweet alert
  const delteCommentHandler = (commentId) => {
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
      // else {
      //   swal("Something went wrong!");
      // }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={item.user.profilephoto.url}
                        alt=""
                        className="table-user-image"
                      />
                      <span className="table-user-name">
                        {item.user.username}
                      </span>
                    </div>
                  </td>
                  <td>{item.text}</td>
                  <td>
                    <div className="table-button-group">
                      <button onClick={() => delteCommentHandler(item._id)}>
                        Delete Comment
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
