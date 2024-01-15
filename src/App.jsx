import {useState, useEffect } from "react";
import axios from "axios";
import Task from "./components/Task";

const App = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('use effect')
        axios
            .get('http://localhost:3001/tasks')
            .then(response => {
                console.log('promise fulfilled')
                setTasks(response.data)
            })
    }, [])

    console.log('rendered', tasks.length, 'tasks')

    const addTask = (event) => {
        event.preventDefault()
        const taskObject = {
            content: newTask,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: tasks.length + 1,
        }

        setTasks(tasks.concat(taskObject))
        setNewTask('')
    }

    const handleTaskChange = (event) => {
        console.log(event.target.value)
        setNewTask(event.target.value)
    }

    const tasksToShow = showAll? tasks: tasks.filter(task => task.important)

    return (
        <div>
            <h1>Tasks</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll? 'important': 'all'}
                </button>
            </div>
            <ul>
                {tasksToShow.map(task =>
                    <Task key={task.id} task={task} />
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