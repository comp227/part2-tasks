import axios from 'axios'

const baseUrl = 'http://localhost:3001/tasks'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This task is not saved to server',
        date: '2023-01-10T17:30:31.098Z',
        important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }