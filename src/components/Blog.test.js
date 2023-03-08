import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('blog', () => {
    const mockBlogUpdate = jest.fn();

    const blog = {
        title: 'title',
        url: 'www.url.com',
        likes: 0,
        author: 'author',
    }

    beforeEach(() => {
    let componenet = render(<Blog 
            blog={blog}
            updateBlog={mockBlogUpdate}
            />)
    });

    test('renders content', () => {
        const element1 = screen.getByText('title - author');

        expect(element1).toBeDefined();

    });

    test('if the like button is clicked twice, the event handler is called twice', async () => {

        const user = userEvent.setup();
        const button = screen.getByText('like');
        await user.click(button);
        await user.click(button);

        expect(mockBlogUpdate.mock.calls).toHaveLength(2);
    });
});