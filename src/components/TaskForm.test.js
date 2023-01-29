import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskForm from './TaskForm';
import userEvent from '@testing-library/user-event';

test('<TaskForm /> updates parent state and calls onSubmit', async () => {
    const createTask = jest.fn();
    const user = userEvent.setup();

    render(<TaskForm createTask={createTask} />);

    const inputs = screen.getByRole('textbox');
    const sendButton = screen.getByText('save');

    await user.type(inputs[0], 'testing a form...');
    await user.click(sendButton);

    expect(createTask.mock.calls).toHaveLength(1);
    expect(createTask.mock.calls[0][0].content).toBe('testing a form...');
});