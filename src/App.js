const Task = ({ task }) => {
  return (
      <li>{task.content}</li>
  )
}

const App = ({ tasks }) => {
  return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks.map(task =>
              <Task key={task.id} task={task} />
          )}
        </ul>
      </div>
  )
}

export default App;
