import axios from 'axios'


const baseUrl = import.meta.env.MODE === "development"
  ? "http://localhost:3001/api/persons"
  : "/api/persons";


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const create = (nameObject) => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
}

const update = (id, nameObject) => {
    const request = axios.put(`${baseUrl}/${id}`, nameObject)
    return request.then(response => response.data)
}

const del = (id, nameObject) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll : getAll,
    create : create,
    update : update,
    del : del
}