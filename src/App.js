import { useState } from 'react' // highlight-line
import Task from './components/Task'

const App = (props) => {
    const [tasks, setTasks] = useState(props.tasks)
    const [newTask, setNewTask] = useState('')
    const [showAll, setShowAll] = useState(true)

    const addTask = (event) => {
        event.preventDefault()
        const taskObject = {
            content: newTask,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: tasks.length + 1,
        }

        setTasks(tasks.concat(taskObject))
        setNewTask('')
    }

    const handleTaskChange = (event) => {
        console.log(event.target.value)
        setNewTask(event.target.value)
    }

    const tasksToShow = showAll
        ? tasks
        : tasks.filter(task => task.important)

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasksToShow.map(task =>
                    <Task key={task.id} task={task} />
                )}
            </ul>
            <form onSubmit={addTask}>
                <input value={newTask} onChange={handleTaskChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App;
