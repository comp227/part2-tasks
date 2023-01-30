const Task = ({ task, toggleImportance }) => {
    const label = task.important
        ? 'make not important' : 'make important';

    return (
        <li className='task'>
            <span>{task.content}</span>
            <button onClick={toggleImportance}>{label}</button>
        </li>
    );
};

export default Task;