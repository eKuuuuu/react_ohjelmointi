import { createContext, useState } from 'react';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const response = await postLogin(credentials); // Post login credentials to API
            const { token, user } = response;
            localStorage.setItem('token', token); // Set token to local storage
            setUser(user); // Set user to state
            navigate('/'); // Navigate to home
        } catch (e) {
            console.error('Login failed:', e.message);
        }
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('token'); // Remove token from local storage
            setUser(null); // Set user to null
            navigate('/'); // Navigate to home
        } catch (e) {
            console.error('Logout failed:', e.message);
        }
    };

    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userResult = await getUserByToken(token);
                setUser(userResult.user);

                console.log('location', location);
                navigate(location.pathname);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };