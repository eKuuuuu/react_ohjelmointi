import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
            {showLogin ? <LoginForm /> : <RegisterForm />}
            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </>
    );
};

export default Login;