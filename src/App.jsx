import {useState, useEffect } from "react";
import Task from "./components/Task";
import taskService from './services/tasks'
import loginService from './services/login'
import Notification from "./components/Notification.jsx";

const Footer = () => {
    const footerStyle = {
        marginTop: 30,
        paddingBottom: 15,
        color: 'orange',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            Task app, Department of Computer Science, University of the Pacific
        </div>
    )
}

const App = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        taskService
            .getAll()
            .then(initialTasks => {
                setTasks(initialTasks)
            })
    }, [])

    console.log('rendered', tasks.length, 'tasks')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    
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
            .catch(() => {
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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const taskForm = () => (
        <form onSubmit={addTask}>
            <input
                value={newTask}
                onChange={handleTaskChange}
            />
            <button type="submit">save</button>
        </form>
    )
    
    return (
        <div>
            <h1>Tasks</h1>
            <Notification message={errorMessage}/>

            {!user && loginForm()}
            {user &&
                <div>
                    <p>{user.name} logged in</p>
                    {taskForm()}
                </div>
            }
            
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {tasksToShow.map((task, i) =>
                    <Task
                        key={i}
                        task={task}
                        toggleImportance={() => toggleImportanceOf(task.id)}
                    />
                )}
            </ul>
            <Footer/>
        </div>
    )
}

export default App