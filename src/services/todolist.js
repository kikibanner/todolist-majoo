import axios from 'axios'
const baseUrl = 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { 
    getAll, 
}