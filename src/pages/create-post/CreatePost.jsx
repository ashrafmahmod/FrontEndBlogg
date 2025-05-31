import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./create-post.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  console.log(categories);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title cant be empty");
    if (category.trim() === "")
      return toast.error("post category cant be empty");
    if (description.trim() === "")
      return toast.error("post description cant be empty");
    if (!file) return toast.error("post image cant be empty");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <section className=" create-post">
      {/* i add it on App file instead i add it in many compoentes */}
      {/* <ToastContainer
        // optional attributes
        theme="colored"
        position="top-center"
      /> */}
      <h1 className="create-post-title">Create New Post</h1>
      <form className="create-post-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input"
        >
          <option value="" disabled>
            select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {" "}
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
        ></textarea>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn">
          {loading ? "Loading..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
