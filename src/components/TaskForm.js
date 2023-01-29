import { useState } from 'react';

const TaskForm = ({ createTask }) => {
    const [newTask, setNewTask] = useState('');

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = (event) => {
        event.preventDefault();
        createTask({
            content: newTask,
            important: false,
        });

        setNewTask('');
    };

    return (
        <div>
            <h2>Create a new task</h2>

            <form onSubmit={addTask}>
                <input
                    id='new-task'
                    value={newTask}
                    onChange={handleChange}
                    placeholder='write task here'
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default TaskForm;