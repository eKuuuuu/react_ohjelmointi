// Layout.jsx
import { useEffect } from 'react';
import { useUserContext } from '../hooks/contextHooks';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    const { user, handleAutoLogin } = useUserContext();

    useEffect(() => {
        handleAutoLogin(); // Check for a valid token on app load
    }, [handleAutoLogin]);

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/upload">Upload</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
            <main>
                <Outlet /> {/* Render child routes */}
            </main>
        </div>
    );
};

export default Layout;