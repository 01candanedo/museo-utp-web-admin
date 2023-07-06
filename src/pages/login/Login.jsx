import '../../styles/login.css';
import '../../styles/normalize.css';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { AuthenticateService } from "../../services/authenticate.service";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        if (email && password) {
            AuthenticateService.login(email, password)
            .then(() => {
                navigate("/dashboard")
                window.location.reload()
            })
            .catch(() => {
                setError('Error en la solicitud de inicio de sesión. Por favor, inténtalo nuevamente.')
            }).finally(() => {
                setTimeout(() => {
                    setError('')
                }, 3000);
            });
        } else {
            setError('Por favor, ingresa tu usuario y contraseña.')
        }
    }

    return (
        <div className="main-container">
            <div className="left"></div>
            <div className="right">
                <div className="right-container-form">
                    {error && <div className= 'error-title'>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <h2 className='login-text degradado-verde'>Inicio de Sesión</h2>
                        <p className='welcome-text'>¡Bienvenido de nuevo! Inicia sesión para acceder a tu cuenta</p>
                        <input type="email" placeholder='Correo electrónico' value={email} onChange={(event) => setEmail(event.target.value)}/>
                        <input type="password" placeholder='Contraseña' value={password} onChange={(event) => setPassword(event.target.value)}/>
                        <p className='signup-prompt'><Link to={"/register"} >¿Aún no tienes una cuenta?</Link></p>
                        <button className='btn-login' type='submit'>Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
        )
}

export default Login
