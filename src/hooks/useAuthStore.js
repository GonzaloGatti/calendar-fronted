import { useDispatch, useSelector } from "react-redux"
import { calendarAPI } from "../api"
import { onLogoutCalendar } from "../store"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())

        try {
            const { data } = await calendarAPI.post('/auth', { email, password })

            if ( data.ok === false ) {
                return dispatch(onLogout('Complete los campos'))
            }

            // almacenamos el token en el localStorage
            localStorage.setItem('token', data.token)

            // guardamos el horario en el que se creo el token en el localStorage 
            localStorage.setItem('token-init-date', new Date().getTime())

            // realizamos el login con la información del user
            dispatch(onLogin({name: data.name, uid:data.uid}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 1000);
        }
    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking())

        try {
            const { data } = await calendarAPI.post('/auth/new', { name, email, password })

            if ( data.ok === false ) {
                return dispatch(onLogout('Complete los campos'))
            }

            // almacenamos el token en el localStorage
            localStorage.setItem('token', data.token)

            // guardamos el horario en el que se creo el token en el localStorage 
            localStorage.setItem('token-init-date', new Date().getTime())

            // realizamos el login con la información del user
            dispatch(onLogin({name: data.name, uid:data.uid}))

        } catch (error) {
            dispatch(onLogout(error.response.data.msg))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 1000);
        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token')

        if ( !token ) {
            return dispatch(onLogout())
        }

        try {
            const { data } = await calendarAPI.get('/auth/renew')

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.name, uid:data.uid}))
            
        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
        localStorage.clear()
    }

    return{
        // propiedades
        status,
        user,
        errorMessage,

        // métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}