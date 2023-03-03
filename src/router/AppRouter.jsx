import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import { useAuthStore } from "../hooks"

export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])


  if (status === 'checking') {
    return (
      <div className='container'>
        <h3>Cargando...</h3>
      </div>
    )
  }

  return (
    <Routes>
      {
        ( status === 'not-authenticated' )
          ? (
            <>
              <Route path="/auth/*" element={<LoginPage/>} />
              {/* En caso de poner otro path que no sea /auth/* sin estar autenticado, nos redirige al LoginPage */}
              <Route path="/*" element={<Navigate to="/auth/login"/>} />
            </>
          )
            
          : (
            <>
              <Route path="/" element={<CalendarPage/>} />
              {/* En caso de poner otro path que no sea / estando autenticado, nos redirige al CalendarPage */}
              <Route path="/*" element={<Navigate to="/"/>} />
            </>
          )
      }
    </Routes>
  )
}
