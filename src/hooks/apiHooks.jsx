import { useState, useEffect } from 'react';

const useMedia = () => {
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

export default useMedia;
