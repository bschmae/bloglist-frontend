import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
    const blog = {
        title: 'title',
        author: 'author',
    };

    render(<Blog blog={blog} />)

    const element = screen.getByText('title - author');
    expect(element).toBeDefined();
});

