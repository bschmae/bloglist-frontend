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
                <div className='testDiv' />
            </Toggle>
        ).container;
    });

    test('rendres its children', () => {
        expect(container.querySelector('.testDiv')).toBeDefined()
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent');

        expect(div).toHaveStyle('display: none');
    });

    test('expect click view button to display children', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('view');
        await user.click(button);

        const div = container.querySelector('.togglableContent');

        expect(div).not.toHaveStyle('display: none');
    });
}); 

