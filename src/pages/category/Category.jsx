import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../componnents/posts/PostList";
// import { posts } from "../../dummyData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";
const Category = () => {
  const { postsCate } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);
  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span>Category not found
          </h1>
          <Link to={"/posts"} className="category-not-found-link">
            Go to posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-tite">Posts Based On {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
