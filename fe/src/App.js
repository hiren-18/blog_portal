import './App.css';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,useNavigate} from 'react-router-dom';
import Home from './component/Home/Home';
import BlogList from './component/Home/BlogList';
import SingleBlog from './component/Home/SingleBlog';
import SignUp from './component/Signup/Signup';
import Login from './component/Login/Login';
import { Navigate } from 'react-router-dom';
// import {useHistory} from 'react-router-dom'


const App = () => {

  // const history=useHistory();

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogImage, setNewBlogImage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      fetchBlogs();
    }
  }, [loggedIn]);

  const handleSignUp = (newUsername) => {
    setLoggedIn(true);
    setUsername(newUsername);
    // alert(`Signed up with username: ${newUsername}`);
    navigate('/blogs');
  };

  const handleLogin = (loginUsername,token) => {
    setLoggedIn(true);
    setUsername(loginUsername);
    setAccessToken(token);
    alert(`Logged in as ${loginUsername}`);
    navigate('/blogs');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setAccessToken('');
    // alert('Logged out');
    navigate('/');
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/v1/blog/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedBlogs = data.blogs;
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };


  const handleGoToAddBlog = () => {
    navigate('/add-blog');
  };

  const handleBlogClick = (blogId) => {
    const selected = blogs.find((blog) => blog._id === blogId);
    setSelectedBlog(selected);
  };
  const handleAddBlog = async () => {
    try {

      const response = await fetch('/api/v1/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title: newBlogTitle, content: newBlogContent ,photoPath:newBlogImage}),
      });

      if (!response.ok) {
        throw new Error(`Adding blog failed with status: ${response.status}`);
      }

     
      const data = await response.json();
      setBlogs([...blogs, data.blog]);

   
      setNewBlogTitle('');
      setNewBlogContent('');
      setNewBlogImage('')
      navigate(-1);
    } catch (error) {
      console.error('Adding blog failed:', error.message);
    }
  };



  return (
    <div className="app-container">
      <div>
        <h1>Blog Portal</h1>

        {!loggedIn ? (
          <div>
            <SignUp onSignUp={handleSignUp} />
            <Login onLogin={handleLogin} />
          </div>
        ) : (
          <div>
          <div>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleGoToAddBlog}>Add Blog</button>
          </div>
</div>
        )}
      </div>


    
     


     


      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home fetchBlogs={fetchBlogs} /> : <Navigate to="/login" />}
        />
        <Route
          path="/blogs"
          element={
            loggedIn ? (
              <BlogList blogs={blogs} handleBlogClick={handleBlogClick} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
              path="/add-blog"
              element={
                <div>
                  <h2>Add Blog</h2>
                  <label>
                    Title:
                    <input
                      type="text"
                      value={newBlogTitle}
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                    />
                  </label>
                  <label>
                    Content:
                    <textarea
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                    />
                  </label>
                  <label>
                    PhotoPath:
                    <textarea
                      type="file"
                      value={newBlogImage}
                      onChange={(e) => setNewBlogImage(e.target.value)}
                    />
                  </label>
                  <button onClick={handleAddBlog}>Add Blog</button>
                </div>
              }
            />
        <Route path="/blogs/:blogId" element={<SingleBlog blog={selectedBlog} />} />
        {/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
      </Routes>
    </div>
  );
};

export default App;

