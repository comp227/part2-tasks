import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Task from './Task';

test('renders content', () => {
    const task = {
        content: 'Component testing is done with react-testing-library',
        important: true
    };

    const { container } = render(<Task task={task} />);
    const element = screen.getByText('Component testing is done with react-testing-library');
    screen.debug(element);

    const div = container.querySelector('.task');
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    );
});