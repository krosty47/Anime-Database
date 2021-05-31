import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'


export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')


    function HandleSubmit(e){
        e.preventDefault()

        signup(emailRef.current.value, passwordRef.current.value)
    }

    if(passwordRef.current.value !== passwordconfirmRef.current.value){
        return setError('Password do not match')

    }


    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <div>
                            <h2>Sign Up</h2>
                            <form>
                                <label>Email</label>
                                <input type='text' name='email' ref={emailRef}></input>
                                <label>Password</label>
                                <input type='password' name='email' ref={passwordRef}></input>
                                <label>Password Confirmation</label>
                                <input type='password' name='email' ref={passwordconfirmRef}></input>
                            </form>
                            <button className='SignUp' type='submit'>Sign Up</button>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
