import {useState, useEffect, useCallback} from 'react';
import {fetchData} from "../utils/fetchData.js";

export const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        // Fetch media data (replace with your API logic)
        const fetchMedia = async () => {
            const response = await fetch(import.meta.env.VITE_MEDIA_API + '/media');
            const data = await response.json();
            setMediaArray(data);
        };

        fetchMedia();
    }, []);

    return mediaArray;
};

export const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };
        const loginResult = await fetchData(
            import.meta.env.VITE_AUTH_API + '/auth/login',
            fetchOptions,
        );

        console.log('loginResult', loginResult.token);

        window.localStorage.setItem('token', loginResult.token);

        return loginResult;
    };

    return { postLogin };
};

export const useUser = () => {
    const postUser = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };
        return await fetchData(
            import.meta.env.VITE_AUTH_API + '/users',
            fetchOptions,
        );
    };

    const getUserByToken = useCallback(async (token) => {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer: ' + token,
            },
        };

        const userResult = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/token',
            fetchOptions,
        );

        console.log('userResult', userResult);

        return userResult;
    }, []);

    return { getUserByToken, postUser };
};


export default {useMedia, useAuthentication, useUser};
