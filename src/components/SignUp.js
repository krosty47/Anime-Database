import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function HandleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordconfirmRef.current.value) {
            return setError('Password do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        }
        catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }


    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <div>
                            <h2>Sign Up</h2>
                            <p>{error}</p>
                            <form onSubmit={HandleSubmit}>
                                <label>Email</label>
                                <input type='text' name='email' ref={emailRef}></input>
                                <label>Password</label>
                                <input type='password' name='email' ref={passwordRef}></input>
                                <label>Password Confirmation</label>
                                <input type='password' name='email' ref={passwordconfirmRef}></input>
                                <button disabled={loading} className='SignUp' type='submit'>Sign Up</button>
                            </form>
                        </div>
                        <div>Already have an account? Sign Up <Link to='/login'>Log In</Link></div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
