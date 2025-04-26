// ProtectedRoute.jsx
import { Navigate } from 'react-router';
import { UserContext } from '../hooks/contextHooks';

const ProtectedRoute = ({ children }) => {
    const { user } = UserContext();

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;