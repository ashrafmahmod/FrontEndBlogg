import "./post.css";
import PostItem from "./PostItem";
const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
};

export default PostList;
