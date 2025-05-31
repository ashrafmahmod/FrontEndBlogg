import "./post-page.css";
import PostList from "../../componnents/posts/PostList";
import Sidebar from "../../componnents/sidebar/Sidebar";
// import { categories } from "../../dummyData";
import Pagination from "../../componnents/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import { useEffect, useState } from "react";
const POST_PER_PAGE = 3;
const PostsPage = () => {
  const { postsCount, posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);
  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        {/* <Sidebar categories={categories} /> */}
        <Sidebar />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostsPage;
