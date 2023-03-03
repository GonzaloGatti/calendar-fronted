import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import './styles.css'

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordRepeat: '',
}

export const LoginPage = () => {

    const { loginEmail, loginPassword, onInputChange: onInputChangeLogin } = useForm(loginFormFields)

    const { registerName, registerEmail, registerPassword, registerPasswordRepeat,
    onInputChange: onInputChangeRegister  } = useForm(registerFormFields)

    const { startLogin, startRegister, errorMessage } = useAuthStore()

    useEffect(() => {
      if ( errorMessage !== undefined ){
        Swal.fire('Error en la autenticación', errorMessage, 'error')
      }
    
    }, [errorMessage])
    

    const loginSubmit = ( event ) => {
        event.preventDefault()
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = ( event ) => {
        event.preventDefault()
        if ( registerPassword !== registerPasswordRepeat) {
            Swal.fire('Error en el registro', 'Las contraseñas no son identicas', 'error')
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword})
    }

  return (
    <div className="login-wrap">
        <div className="login-html" >
            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
                {/* LOGIN */}
                <form className="sign-in-htm" onSubmit={ loginSubmit }>
                    <div className="group">
                        <label htmlFor="user" className="label">Email</label>
                        <input 
                            id="user" 
                            type="text" 
                            className="input"
                            name="loginEmail"
                            value={ loginEmail }
                            onChange={ onInputChangeLogin }                               
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Password</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            data-type="password"
                            name="loginPassword"
                            value={ loginPassword }
                            onChange={ onInputChangeLogin }     
                        />
                    </div>
                    <div className="group">
                        <input type="submit" className="button sign-in-button" value="Sign In"/>
                    </div>
                    {/* <div className="hr"></div> */}
                    {/* <div className="foot-lnk">
                        <a href="#forgot">Forgot Password?</a>
                    </div> */}
                </form>
                {/* REGISTER */}
                <form className="sign-up-htm" onSubmit={ registerSubmit }>
                    <div className="group">
                        <label htmlFor="user" className="label">Username</label>
                        <input 
                            id="user" 
                            type="text" 
                            className="input"
                            name="registerName"
                            value={ registerName }
                            onChange={ onInputChangeRegister } 
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="email" className="label">Email</label>
                        <input 
                            id="email" 
                            type="text" 
                            className="input" 
                            name="registerEmail"
                            value={ registerEmail }
                            onChange={ onInputChangeRegister } 
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Password</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            data-type="password"
                            name="registerPassword"
                            value={ registerPassword }
                            onChange={ onInputChangeRegister } 
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Repeat Password</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input"
                            data-type="password"
                            name="registerPasswordRepeat"
                            value={ registerPasswordRepeat }
                            onChange={ onInputChangeRegister }
                            />
                    </div>
                    <div className="group">
                        <input type="submit" className="button" value="Sign Up"/>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                        <label className="foot-lnk-label" htmlFor="tab-1">Already Member?</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
