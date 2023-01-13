import {useState, useEffect} from 'react'
import axios from "axios";
import Task from './components/Task'
import taskService from './services/tasks'

const App = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        taskService
            .getAll()
            .then(response => {
                setTasks(response.data)
            })
    }, [])

    console.log('rendered', tasks.length, 'tasks')
    const addTask = event => {
        event.preventDefault()
        const taskObject = {
            content: newTask,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        taskService
            .create(taskObject)
            .then(response => {
                setTasks(tasks.concat(response.data))
                setNewTask('')
            })
    }

    const handleTaskChange = (event) => {
        console.log(event.target.value)
        setNewTask(event.target.value)
    }

    const toggleImportanceOf = id => {
        const task = tasks.find(t => t.id === id)
        const changedTask = { ...task, important: !task.important }

        taskService
            .update(id, changedTask)
            .then(response => {
                setTasks(tasks.map(t => t.id !== id ? t : response.data))
            })
    }

    const tasksToShow = showAll
        ? tasks
        : tasks.filter(task => task.important)

    return (
        <div>
            <h1>Tasks</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
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
                <input value={newTask} onChange={handleTaskChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    );
}

export default App;
