import { useState } from "react";

const TaskForm = ({ createTask }) => {
    const [newTask, setNewTask] = useState("");

    const addTask = (event) => {
        event.preventDefault();
        createTask({
            content: newTask,
            important: false,
        });

        setNewTask("");
    };

    return (
        <div>
            <h2>Create a new task</h2>

            <form onSubmit={addTask}>
                <input
                    value={newTask}
                    onChange={event => setNewTask(event.target.value)}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default TaskForm;