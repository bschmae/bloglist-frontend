import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> form calls event handler with the right details', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

   const { container } = render(<BlogForm handleBlogForm={createBlog} />);

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')

    const createButton = screen.getByText('create new blog');

    await user.type(titleInput, 'title');
    await user.type(authorInput, 'author');
    await user.type(urlInput, 'url');
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toBe('title');
    expect(createBlog.mock.calls[0][1]).toBe('author');
    expect(createBlog.mock.calls[0][2]).toBe('url');
});