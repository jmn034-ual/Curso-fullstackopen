import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const api_key = import.meta.env.VITE_SOME_KEY


const getAll = () => {
    const request = axios.get(baseUrl + 'all')
    return request.then(response => response.data)
}

const getCountrie = (nameCountrie) => {
    const request = axios.get(baseUrl+ `name/${nameCountrie}`)
    return request.then(response => response.data)
}

const getWeather = (nameCapital, code) =>{
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${nameCapital},${code}&units=metric&APPID=${api_key}`

    const request = axios.get(urlWeather)
    return request.then(response => response.data)
}

export default {getAll, getCountrie, getWeather}