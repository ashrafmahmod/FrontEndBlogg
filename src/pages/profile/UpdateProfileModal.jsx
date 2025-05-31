import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

const UpdateProfileModal = ({ setUpdateprofile, profile }) => {
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const updatedUser = { username, bio };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }
    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateprofile(false);
  };

  return (
    <div className="update-modal">
      <form className="update-modal-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setUpdateprofile(false)}
          ></i>
        </abbr>
        <h1 className="update-modal-title">Update Your Profile</h1>
        <input
          type="text"
          className="update-modal-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          className="update-modal-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <input
          type="password"
          className="update-modal-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit" className="update-modal-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
