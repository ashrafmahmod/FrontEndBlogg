import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post.title);
  const [description, setDescroption] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const { categories } = useSelector((state) => state.category);
  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title cant be empty");
    if (category.trim() === "")
      return toast.error("post category cant be empty");
    if (description.trim() === "")
      return toast.error("post description cant be empty");
    dispatch(updatePost({ title, description, category }, post?._id));
    setUpdatePost(false);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="update-modal">
      <form className="update-modal-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setUpdatePost(false)}
          ></i>
        </abbr>
        <h1 className="update-modal-title">Update Post</h1>
        <input
          type="text"
          className="update-modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="update-modal-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {" "}
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          rows="5"
          className="update-modal-textarea"
          value={description}
          onChange={(e) => setDescroption(e.target.value)}
        ></textarea>
        <button type="submit" className="update-modal-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
