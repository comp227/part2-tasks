import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import axios from 'axios'

axios
    .get('http://localhost:3001/tasks')
    .then(response => {
        const tasks = response.data
        console.log(tasks)
        ReactDOM.createRoot(document.getElementById('root')).render(
            <App tasks={tasks}/>
        );

    })
