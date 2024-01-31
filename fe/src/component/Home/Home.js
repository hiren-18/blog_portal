// import React, { useState } from 'react';
// // import BlogList from './BlogList';
// import SingleBlog from './SingleBlog';
// import './Home.css';

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);

  // const fetchBlogs = async () => {
  //   try {
  //     const response = await fetch('/api/v1/blog/all', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const data = await response.json();
  //     console.log(data);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const contentType = response.headers.get('content-type');
  //     if (contentType && contentType.includes('application/json')) {
  //       const fetchedBlogs = data.blogs;
  //       setBlogs(fetchedBlogs);
  //     } else {
  //       console.error('Invalid content type in response:', contentType);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching blogs:', error.message);
  //   }
  // };

//   const handleBlogClick = (blogId) => {
//     const selected = blogs.find((blog) => blog._id === blogId);
//     setSelectedBlog(selected);
//   };

//   return (
//     <div className="blog-container">
//       <h1>Blog Portal</h1>
//       <button onClick={fetchBlogs}>Fetch Blogs</button>
//       {blogs.length > 0 && (
//         <div className="blog-list">
//           {blogs.map((blog) => (
//             <div key={blog._id} className={`blog-card ${selectedBlog && selectedBlog._id === blog._id ? 'expanded' : ''}`}>
//               <h2>{blog.title}</h2>
//               <p>{blog.content}</p>
//               <button onClick={() => handleBlogClick(blog._id)}>Read More</button>
//             </div>
//           ))}
//           {selectedBlog && <SingleBlog blog={selectedBlog} />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = ({ fetchBlogs }) => {
  return (
    <div className="home-container">
      <h1>Blogs Portal</h1>
      <button onClick={fetchBlogs}>Show Blogs</button>
      <Link to="/blogs">
        <button>Go to Blogs</button>
      </Link>
    </div>
  );
};

export default Home;