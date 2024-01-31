// components/SingleBlog.js
import React from 'react';
import './BlogList.css'; // Import the CSS file

const SingleBlog = ({ blog }) => {
  return (
    <div className="single-blog-container">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      {blog.photoPath && (
        <img
          src={blog.photoPath}
          alt={`Image for ${blog.title}`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default SingleBlog;
