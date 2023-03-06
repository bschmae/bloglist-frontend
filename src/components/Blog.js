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
  <div style={blogStyle}>
      { blog.title } - { blog.author }
      <Toggle showLabel='view' hideLabel='hide'>
        { blog.url }
        <br></br>
        likes: { blog.likes } 
        <button onClick={ handleLike }>like</button>
        <br></br>
        user: { blog.user ? blog.user.username : '' }
        <br></br>
        <button onClick={handleDelete}>remove</button>
      </Toggle>
  </div> 
  ); 
};


export default Blog