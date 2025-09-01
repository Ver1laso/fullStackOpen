import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const conutryUrl = 'https://studies.cs.helsinki.fi/restcountries/name'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getCountry = () => {
    const request = axios.get(`${conutryUrl}/${name}`)
    return request.then(response => response.data)
}


export default {
    getAll : getAll,
    getCountry : getCountry,
}