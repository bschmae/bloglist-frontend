import Toggle from "./Toggle"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog);
  }
};

  return (
  <div className='blog' style={blogStyle}>
      <p>{ blog.title } - { blog.author }</p>
      <Toggle showLabel='view' hideLabel='hide'>
        <p>{ blog.url }</p>
        <br></br>
        <p>likes: { blog.likes }</p> 
        <button id='like-button' onClick={ handleLike }>like</button>
        <br></br>
        <p>user: { blog.user ? blog.user.username : '' }</p>
        <br></br>
        <button onClick={handleDelete}>remove</button>
      </Toggle>
  </div> 
  ); 
};


export default Blog