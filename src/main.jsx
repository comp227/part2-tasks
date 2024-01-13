import ReactDOM from 'react-dom/client'

import App from './App'

// let's see if this works again with send-all?
const tasks = [
    {
        id: 1,
        content: 'Wash the dishes',
        date: '2023-01-10T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Take out the trash',
        date: '2023-01-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'Buy salty snacks',
        date: '2023-01-10T19:20:14.298Z',
        important: true
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(
    <App tasks={tasks} />
)

const result = tasks.map(task => task.id)
console.log(result)