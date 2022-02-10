import axios from 'axios'
const baseUrl = 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const initialTodos = JSON.parse(localStorage.getItem("todos"))
    console.log(initialTodos)
    localStorage.setItem("todos", JSON.stringify(initialTodos.concat(newObject)))
    return JSON.parse(localStorage.getItem("todos")).then(response => response)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
} 

export default { 
    getAll, 
    create,
    update,
    destroy
}