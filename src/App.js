import {useState, useEffect, useRef} from 'react'
import Task from './components/Task'
import taskService from './services/tasks'
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import TaskForm from "./components/TaskForm";

const App = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [tasks, setTasks] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const taskFormRef = useRef()

    useEffect(() => {
        taskService
            .getAll()
            .then(initialTasks => {
                setTasks(initialTasks)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedTaskappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            taskService.setToken(user.token)
        }
    }, [])

    const addTask = (taskObject) => {
        taskFormRef.current.toggleVisibility()
        taskService
            .create(taskObject)
            .then(returnedTask => {
                setTasks(tasks.concat(returnedTask))
            })
    }

    const toggleImportanceOf = id => {
        const task = tasks.find(t => t.id === id)
        const changedTask = { ...task, important: !task.important }

        taskService
            .update(id, changedTask)
            .then(returnedTask => {
                setTasks(tasks.map(t => t.id !== id ? t : returnedTask))
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

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedTaskappUser', JSON.stringify(user)
            )
            taskService.setToken(user.token)
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

    const loginForm = () => {
        const hideWhenVisible = {display: loginVisible ? 'none' : ''}
        const showWhenVisible = {display: loginVisible ? '' : 'none'}

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>log in</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    const taskForm = () => (
        <Togglable buttonLabel='new task' ref={taskFormRef}>
            <TaskForm createTask={addTask} />
        </Togglable>
    )

    const tasksToShow = showAll
        ? tasks
        : tasks.filter(task => task.important)

    return (
        <div>
            <h1>Tasks</h1>
            <Notification message={errorMessage} />
            {!user && loginForm()}
            {user &&
                <div>
                    <p>{user.name} logged in</p>
                    {taskForm()}
                </div>
            }
            <div>
                <p>
                    <button onClick={() => setShowAll(!showAll)}>
                        show {showAll ? 'important' : 'all'}
                    </button>
                </p>
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
            <Footer/>
        </div>
    );
}

export default App;
