import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'



export function validate(input) {
    let errors = {}

    if (!input.email) {
        errors.email = 'Username is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'Username is invalid';
    } else {
        if (!input.password) {
            errors.password = 'Password is required';
        } else if (!/(?=.*[0-9])/.test(input.password)) {
            errors.password = 'Password is invalid';
        }
    }
    return errors;
};

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        // setErrors termina guardando el objeto que retorna la function validate
    }


    async function HandleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        }
        catch {
            setError('Failed to Log In')
        }
        setLoading(false)
    }

    //<div className='back'><Link to='/'>BACK TO ANIME DATABASE</Link></div>

    return (

        <div className='center' >
            <form method='post' onSubmit={HandleSubmit}>
            <h2>Log In</h2>
            <p>{error}</p>
                <div className='txt_field'>
                    <input type='text' name='email' ref={emailRef} value={input.email} onChange={handleInputChange} required />
                    <label>Email</label>
                    <span></span>
                    {errors.email && (
                        <p className="danger">{errors.email}</p>
                    )}
                </div>
                <div className='txt_field'>
                    <input type='password' name='password' ref={passwordRef} value={input.password} onChange={handleInputChange} required />
                    <label>Password</label>
                    <span></span>
                    {errors.password && (
                        <p className="danger">{errors.password}</p>
                    )}
                </div>
                <div className='pass'>
                    <Link className='pass' to='/forgot-password'>Forgot Password?</Link>
                </div>
                <button disabled={loading} className='LogIn' type='submit'>Log In</button>
            </form>
            <div className='signup_link'>Need an account?<Link className='signup_link2' to='/signup'>Sign Up</Link></div>
        </div>
    )
}
