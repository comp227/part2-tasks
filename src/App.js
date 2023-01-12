import { useState } from 'react' // highlight-line
import Task from './components/Task'

const App = (props) => {
    const [tasks, setTasks] = useState(props.tasks)
    // highlight-start
    const [newTask, setNewTask] = useState(
        'a new task...'
    )
    // highlight-end

    const addTask = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
    }

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task =>
                    <Task key={task.id} task={task} />
                )}
            </ul>
            <form onSubmit={addTask}>
                <input value={newTask} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App;
