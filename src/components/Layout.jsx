import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-col items-center">
            <nav className="w-full bg-gray-800 text-white p-4">
                <ul className="flex justify-center space-x-4">
                    <li className="hover:text-gray-300">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-gray-300">
                        <a href="/profile">Profile</a>
                    </li>
                    <li className="hover:text-gray-300">
                        <a href="/upload">Upload</a>
                    </li>
                </ul>
            </nav>
            <main className="w-full flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;