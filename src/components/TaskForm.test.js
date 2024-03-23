import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "./TaskForm";
import userEvent from "@testing-library/user-event";

test("<TaskForm /> updates parent state and calls onSubmit", async () => {
    const createTask = jest.fn();
    const user = userEvent.setup();

    render(<TaskForm createTask={createTask} />);

    const input = screen.getByPlaceholderText("write task here");
    const sendButton = screen.getByText("save");

    await user.type(input, "testing a form...");
    await user.click(sendButton);

    expect(createTask.mock.calls).toHaveLength(1);
    expect(createTask.mock.calls[0][0].content).toBe("testing a form...");
});