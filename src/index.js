import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import axios from 'axios'

const promise = axios.get('http://localhost:3001/tasks')
console.log(promise)

promise.then(response => {
    console.log(response)
})

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

const tasks = [
    {
        id: 1,
        content: 'Wash the dishes',
        date: '2022-05-30T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Take out the trash',
        date: '2022-05-30T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'Buy salty snacks',
        date: '2022-05-30T19:20:14.298Z',
        important: true
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(
    <App tasks={tasks} />
);
