import {useCallback, useEffect, useState} from 'react';

import {fetchData} from '../utils/fetchData';
import {uniqBy} from 'lodash';

const authApiUrl = import.meta.env.VITE_AUTH_API;
const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {
            const mediaData = await fetchData(`${mediaApiUrl}/media`);
            const uniqueUserIds = uniqBy(mediaData, 'user_id');

            const userData = await Promise.all(
                uniqueUserIds.map((item) =>
                    fetchData(`${authApiUrl}/users/${item.user_id}`),
                ),
            );

            // duplikaattien poisto on tehtävänannon ulkopuolella, ei tarvitse toteuttaa
            const userMap = userData.reduce((map, {user_id, username}) => {
                map[user_id] = username;
                return map;
            }, {});

            const newData = mediaData.map((item) => ({
                ...item,
                username: userMap[item.user_id],
            }));

            setMediaArray(newData);
        } catch (error) {
            console.error('error', error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    const postMedia = async (file, inputs, token) => {
        const data = {
            ...inputs,
            ...file,
        };
        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer: ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        return await fetchData(`${mediaApiUrl}/media`, fetchOptions);
    };

    return {mediaArray, postMedia};
};

const useAuthentication = () => {
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

    return {postLogin};
};

const useUser = () => {
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

        return await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/token',
            fetchOptions,
        );
    }, []);

    return {getUserByToken, postUser};
};

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);

        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer: ' + token,
            },
            mode: 'cors',
            body: formData,
        };

        return await fetchData(
            import.meta.env.VITE_UPLOAD_SERVER + '/upload',
            fetchOptions,
        );
    };

    return {postFile};
};

const deleteMedia = async (id, token) => {
    const response = await fetch(`${import.meta.env.VITE_UPLOAD_SERVER}/media/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete media');
    }
    return response.json();
};

const modifyMedia = async (id, data, token) => {
    const response = await fetch(`${import.meta.env.VITE_UPLOAD_SERVER}/media/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to modify media');
    }
    return response.json();
};

const useLike = () => {
    const getLikesByMediaId = async (mediaId) => {
        return await fetchData(`${import.meta.env.VITE_MEDIA_API}/media/${mediaId}/likes`);
    };

    const getLikesByUser = async (userId) => {
        return await fetchData(`${import.meta.env.VITE_MEDIA_API}/users/${userId}/likes`);
    };

    const postLike = async (mediaId, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ media_id: mediaId }),
        };
        return await fetchData(`${import.meta.env.VITE_MEDIA_API}/likes`, fetchOptions);
    };

    const deleteLike = async (mediaId, token) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await fetchData(`${import.meta.env.VITE_MEDIA_API}/likes/${mediaId}`, fetchOptions);
    };

    return { getLikesByMediaId, getLikesByUser, postLike, deleteLike };
};

export {useMedia, useAuthentication, useUser, useFile, modifyMedia, deleteMedia, useLike};