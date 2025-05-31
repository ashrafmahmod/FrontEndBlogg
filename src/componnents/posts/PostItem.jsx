import { Link } from "react-router-dom";
// import "./post.css"; // i imported it in parent component postlist
const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={post?.image.url} alt="" className="post-item-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link className="post-item-username" to={profileLink}>
              {username ? username : post?.user.username}
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(post?.createdAt).toString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${post?.category}`}
          >
            {post?.category}
          </Link>
        </div>
        <p className="post-item-description">
          {post?.description}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
          voluptates sapiente delectus consequatur repudiandae fugiat? Cum
          sapiente labore consequatur sunt? Labore accusantium nulla nobis
          quibusdam, quasi quam! Qui, asperiores sint! Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Quo voluptates sapiente delectus
          consequatur repudiandae fugiat? Cum sapiente labore consequatur sunt?
          Labore accusantium nulla nobis quibusdam, quasi quam! Qui, asperiores
          sint!
        </p>
        <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
