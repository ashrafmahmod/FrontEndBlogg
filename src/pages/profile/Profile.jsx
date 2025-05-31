import "./profile.css";
// import PostList from "../../componnents/posts/PostList";
// import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../componnents/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCalls";
const Profile = () => {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [updateprofile, setUpdateprofile] = useState(false);
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const state = useSelector((state) => state);
  // const state = useSelector((state) => state);
  console.log(state);

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);
  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) toast.warning("Thers no file!");
    const formDate = new FormData();
    formDate.append("image", file);
    dispatch(uploadProfilePhoto(formDate));
  };

  // delete account handler
  const delteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        // swal("Account Has Been Deleted", {
        //   icon: "success",
        // });
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
      //  else {
      //   swal("Something went wrong!");
      // }
    });
  };

  if (loading) {
    return <div className="profile-loader">Loading...</div>;
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilephoto.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                type="file"
                name="file"
                id="file"
                style={{
                  display: "none",
                }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-user-name">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button
            className="profile-update-btn"
            onClick={() => setUpdateprofile(true)}
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {/* <PostList posts={posts} /> */}
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>

      {user?._id === profile?._id && (
        <button
          onClick={
            //   () => {
            //   delteAccountHandler();
            // }
            delteAccountHandler
          }
          className="delete-account-btn"
        >
          Delete Your Account
        </button>
      )}

      {updateprofile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateprofile={setUpdateprofile}
        />
      )}
    </section>
  );
};

export default Profile;
