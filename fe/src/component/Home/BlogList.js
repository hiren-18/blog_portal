// components/BlogList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css'; // Import the CSS file

const BlogList = ({ blogs, handleBlogClick }) => {
  return (
    <div className="blog-cards-container">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <Link to={`/blogs/${blog._id}`}>
            <button onClick={() => handleBlogClick(blog._id)}>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
