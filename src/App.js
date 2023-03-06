import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      }); 

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage({ 
        text:'Invalid username or password',
        type: 'error'
      });
      setUsername('');
      setPassword('');
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    };
  };

  const handleLoggout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleBlogForm = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title, 
        author, 
        url,
      });
      setBlogs(blogs.concat(blog));
      setMessage({ 
        text: `A new blog '${blog.title}' has been added by ${blog.author}.`,
        type: 'success'
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({
        text: `${error} Failed to add blog.`,
        type: 'error'
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log('error', error);
    }
  };
  
  if (user === null) {
    return (
    <div>
      <h1>Log in to application </h1>
      <Notification message={message} />
      <Toggle showLabel='login' hideLabel='cancel'>
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} 
        />
      </Toggle>
    </div>
        )
      };

  return (
    <div>     
      <h1>Blogs</h1> 
      <Notification message={message} />
      <p>{user.username} logged in <button onClick={handleLoggout}>logout</button></p>
      <BlogForm handleBlogForm={handleBlogForm}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};
export default App;