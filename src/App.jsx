import {useState, useEffect } from "react";
import Task from "./components/Task";
import taskService from './services/tasks'
import Notification from "./components/Notification.jsx";

const App = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    useEffect(() => {
        taskService
            .getAll()
            .then(initialTasks => {
                setTasks(initialTasks)
            })
    }, [])

    console.log('rendered', tasks.length, 'tasks')

    const addTask = (event) => {
        event.preventDefault()
        const taskObject = {
            content: newTask,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }

        taskService
            .create(taskObject)
            .then(returnedTask => {
                setTasks(tasks.concat(returnedTask))
                setNewTask('')
            })
    }

    const handleTaskChange = (event) => {
        console.log(event.target.value)
        setNewTask(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        const task = tasks.find(t => t.id === id)
        const changedTask = { ...task, important: !task.important }

        taskService
            .update(id, changedTask)
            .then(returnedTask => {
                setTasks(tasks.map(task => task.id !== id ? task : returnedTask))
            })
            .catch(error => {
                setErrorMessage(
                    `Task '${task.content}' was already deleted from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setTasks(tasks.filter(t => t.id !== id))
            })
    }

    const tasksToShow = showAll? tasks: tasks.filter(task => task.important)

    return (
        <div>
            <h1>Tasks</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll? 'important': 'all'}
                </button>
            </div>
            <ul>
                {tasksToShow.map(task =>
                    <Task
                        key={task.id}
                        task={task}
                        toggleImportance={() => toggleImportanceOf(task.id)}
                    />
                )}
            </ul>
            <form onSubmit={addTask}>
                <input
                    value={newTask}
                    onChange={handleTaskChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App