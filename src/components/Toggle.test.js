import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from './Toggle'


describe('toggle', () => {
    let container 

    beforeEach(() => {
        container = render(
            <Toggle showLabel='view' hideLabel='hide' >
                <p>url</p>
                <br></br>
                <p>likes</p>
            </Toggle>
        ).container;
    });

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent');
        expect(div).toHaveStyle('display: none');
    });

    test('expect click view button to display url and likes', async () => {
        const mockHandler = jest.fn();

        const user = userEvent.setup();
        const button = screen.getByText('view');
        await user.click(button);

        const div = container.querySelector('.togglableContent');

        const urlElement = screen.getByText('url');
        const likesElement = screen.getByText('likes');

        expect(urlElement).toBeDefined();
        expect(likesElement).toBeDefined();
        expect(div).not.toHaveStyle('display: none');
    });
}); 

