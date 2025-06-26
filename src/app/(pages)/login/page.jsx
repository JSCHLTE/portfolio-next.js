import LoginForm from './LoginForm';
import AnimatedText from '@/app/utils/animated-text/AnimatedText';

export const metadata = {
  title: 'Admin | Jordan Schulte',
  description: 'Login for the website to access admin',
  robots: 'noindex, nofollow',
};

const Login = () => {
  return (
    <>
      <h1 className='login-title'><AnimatedText text='Login'/></h1>
      <LoginForm />
    </>
  )
}

export default Login