// LoginForm.jsx
import { useState } from 'react';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const { handleLogin } = useUserContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const doLogin = async () => {
        try {
            await handleLogin(inputs); // Call handleLogin with user inputs
        } catch (e) {
            alert(e.message); // Show error message if login fails
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="button" onClick={doLogin}>
                Login
            </button>
        </form>
    );
};

export default LoginForm;