// Logout.jsx
import { useEffect } from 'react';
import { useUserContext } from '../hooks/contextHooks';

const Logout = () => {
    const { handleLogout } = useUserContext();

    useEffect(() => {
        handleLogout(); // Log out the user when the component is loaded
    }, [handleLogout]);

    return <p>Logging out...</p>;
};

export default Logout;