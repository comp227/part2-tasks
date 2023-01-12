const App = (props) => {
  const { tasks } = props

  return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks.map(task =>
              <li key={task.id}>
                {task.content}
              </li>
          )}
        </ul>
      </div>
  )
}

export default App;
