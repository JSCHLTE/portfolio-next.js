"use client";

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import AnimatedText from '../utils/animated-text/AnimatedText'
import '../forms.css'

const Login = () => {

  const [loginValues, setLoginValues] = useState({
    username: '',
    password: ''
  });

  const router = useRouter();

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginValues.username, loginValues.password);
      router.push('/admin')
    } catch (error) {
      console.error("❌ Login failed:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target

    setLoginValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (

    <>
        <h1 className='login-title'><AnimatedText text='Login'/></h1>
        <form id='loginForm' onSubmit={handleLogin}>
          <div className='username-wrapper'>
            <label htmlFor='username'>
              Email:
              <input type="email" id='username' name='username' onChange={handleChange} value={loginValues.username} required/>
            </label>
          </div>
          <div className='password-wrapper'>
            <label htmlFor='password'>
              Password:
              <input type="password" id='password' name='password' onChange={handleChange} value={loginValues.password} required/>
            </label>
          </div>
          <button className='login-button'>Login</button>
        </form>
    </>
  )
}

export default Login