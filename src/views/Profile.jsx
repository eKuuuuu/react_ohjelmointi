import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks.jsx';

const Profile = () => {
    const { getUserByToken } = useUser();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserByToken();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        };
        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;