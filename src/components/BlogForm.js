import React, { useState } from 'react';

const BlogForm = ({ handleBlogForm }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const onSubmiteHandleForm = (event) => {
        event.preventDefault();
        handleBlogForm(title, author, url);
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
    <form onSubmit={ onSubmiteHandleForm }>
        <div >
            <h1>Add new blog</h1>
            Title
            <input
                type='text'
                value={title}
                name='title'
                onChange={({ target }) => setTitle(target.value)}
            />
            <br></br>
            Author 
            <input 
                type='text'
                value={author}
                name='author'
                onChange={({ target }) => setAuthor(target.value)}
            />
            <br></br>
            URL 
            <input 
                type='text'
                value={url}
                name='url'
                onChange={({ target }) => setUrl(target.value)}
                />
        </div>
        <button type='submit'>Create</button>
    </form>
    )
};

export default BlogForm;