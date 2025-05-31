import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import { useEffect } from "react";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCall";
const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);

  // delete user handler using sweet alert
  const delteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        // swal("User Has Been Deleted", {
        //   icon: "success",
        // });
        dispatch(deleteProfile(userId));
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
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={item.profilephoto?.url}
                        alt=""
                        className="table-user-image"
                      />
                      <span className="table-user-name">{item.username}</span>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td>
                    <div className="table-button-group">
                      <button>
                        <Link to={`/profile/${item._id}`}>View Profile</Link>
                      </button>
                      <button onClick={() => delteUserHandler(item._id)}>
                        Delete User
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

export default UsersTable;
