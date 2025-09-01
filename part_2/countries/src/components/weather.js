import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCity = (city) => {

    if (!city) throw new Error('City is required')
    return axios.get(baseUrl, {
        params: {
            q: city,
            appid: apiKey,
            units: 'metric'
        }
    }).then(response => response.data)
}

export default {
    getCity : getCity
}