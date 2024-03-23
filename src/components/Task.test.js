import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Task from "./Task";

test("renders content", () => {
    const task = {
        content: "Component testing is done with react-testing-library",
        important: true
    };

    const { container } = render(<Task task={task} />);

    const element = screen.getByText("Component testing is done with react-testing-library");
    screen.debug(element);

    const div = container.querySelector(".task");
    expect(div).toHaveTextContent(
        "Component testing is done with react-testing-library"
    );
});

test("clicking the button calls event handler once", async () => {
    const task = {
        content: "Component testing is done with react-testing-library",
        important: true
    };

    const mockHandler = jest.fn();

    render(
        <Task task={task} toggleImportance={mockHandler} />
    );

    const user = userEvent.setup();
    const button = screen.getByText("make not important");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});

test("does not render this", () => {
    const task = {
        content: "This is a reminder",
        important: true
    };

    render(<Task task={task} />);

    const element = screen.queryByText("do not want this thing to be rendered");
    expect(element).toBeNull();
});