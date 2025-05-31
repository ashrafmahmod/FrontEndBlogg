import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  // delete post handler using sweet alert
  const deltePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        // swal("Post Has Been Deleted", {
        //   icon: "success",
        // });
        dispatch(deletePost(postId));
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
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={item.user?.profilephoto?.url}
                        alt=""
                        className="table-user-image"
                      />
                      <span className="table-user-name">
                        {item.user.username}
                      </span>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className="table-button-group">
                      <button>
                        <Link to={`/posts/details/${item._id}`}>View Post</Link>
                      </button>
                      <button onClick={() => deltePostHandler(item._id)}>
                        Delete Post
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

export default PostsTable;
