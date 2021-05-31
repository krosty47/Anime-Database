import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function HandleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch {
            setError('Failed to Log In')
        }
        setLoading(false)
    }


    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <div>
                            <h2>Log In</h2>
                            <p>{error}</p>
                            <form onSubmit={HandleSubmit}>
                                <label>Email</label>
                                <input type='text' name='email' ref={emailRef}></input>
                                <label>Password</label>
                                <input type='password' name='email' ref={passwordRef}></input>
                                <button disabled={loading} className='LogIn' type='submit'>Log In</button>
                            </form>
                            <div>
                                <Link to='/forgot-password'>Forgot Password?</Link>
                            </div>
                        </div>
                        <div>Need an account? Log In <Link to='/signup'>Sign Up</Link></div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
