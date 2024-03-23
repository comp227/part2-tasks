const Task = ({ task, toggleImportance }) => {
    const label = task.important
        ? "make not important" : "make important";

    return (
        <li className='task'>
            {task.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    );
};

export default Task;