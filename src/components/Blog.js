import Toggle from "./Toggle"

const Blog = ({ blog, updateBlog }) => {
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
  }

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
      </Toggle>
  </div> 
  ); 
};


export default Blog