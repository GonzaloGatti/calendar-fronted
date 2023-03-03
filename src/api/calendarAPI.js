import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables()

const calendarAPI = axios.create({
    baseURL: VITE_API_URL
}) 

// TODO: configurar interceptores
// cada vez que se realiza una request (petición), se envia con el token en el header
calendarAPI.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default calendarAPI