import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import Home from './views/Home';
import Layout from './components/Layout';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <UserProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/single" element={<Single />} />
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
            </UserProvider>
        </Router>
    );
};

export default App;