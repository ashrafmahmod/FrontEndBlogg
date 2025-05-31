import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateComment } from "../../redux/apiCalls/commentApiCall";
const UpdateCommentModal = ({ setUpdateComment, CommentForUpdate }) => {
  const [text, setText] = useState(CommentForUpdate?.text);
  const dispatch = useDispatch();
  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("pleas write something");
    dispatch(updateComment(CommentForUpdate?._id, { text }));
    setUpdateComment(false);
  };

  return (
    <div className="update-modal">
      <form className="update-modal-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setUpdateComment(false)}
          ></i>
        </abbr>
        <h1 className="update-modal-title">Edit Comment</h1>
        <input
          type="text"
          className="update-modal-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" className="update-modal-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
