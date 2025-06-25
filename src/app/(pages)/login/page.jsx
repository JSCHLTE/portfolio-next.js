"use client";

import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import AnimatedText from '@/app/utils/animated-text/AnimatedText'
import '@/app/forms.css'
import checkIfAdmin from '@/app/utils/check-if-admin/checkIfAdmin';
import NotificationBox from '@/app/utils/notifications/NotificationBox';

const Login = () => {

  const [loginValues, setLoginValues] = useState({
    username: '',
    password: ''
  });
  const [notifications, setNotifications] = useState(undefined);

  const router = useRouter();

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginValues.username, loginValues.password);

      const isAdmin = await checkIfAdmin(userCredential.user.uid);
      console.log(isAdmin)
      if(isAdmin) {
        router.push('/admin');
      } else {
        router.push('/login');
      }

    } catch (error) {
      handleNotification("failed", "Login Failed", "Username or password is incorrect");
      setLoginValues(prev => ({...prev, password: ''}))
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

  const handleNotification = (type, message, desc) => {
    setNotifications({
      type: [type],
      message: [message],
      desc: [desc]
    })
  }

  useEffect(() => {
    if(notifications) {
        const timeout = setTimeout(() => {
            setNotifications(null)
        }, 7500)

    return () => clearTimeout(timeout)
}
  }, [notifications])

  return (

    <>
        <h1 className='login-title'><AnimatedText text='Login'/></h1>
        {notifications && (
      <NotificationBox
        type={notifications.type}
        message={notifications.message}
        desc={notifications.desc}
      />
    )}
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
          <button className='login-button button-press'>Login</button>
        </form>
    </>
  )
}

export default Login