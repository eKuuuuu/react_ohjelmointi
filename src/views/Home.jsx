import { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {fetchData} from "../utils/fetchData.js";

const Home = () => {
    const [mediaArray, setMediaArray] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);

    const getUsername = async (userId) => {
        try {
            const user = await fetchData(`${import.meta.env.VITE_MEDIA_API}/users/${userId}`);
            return user.username;
        } catch (error) {
            console.error(`Error fetching username for userId ${userId}:`, error);
            return 'Unknown';
        }
    };

    const getMedia = async () => {
        try {
            const media = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
            const mediaWithUserData = await Promise.all(
                media.map(async (item) => {
                    const user = await fetchData(`${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`);
                    return { ...item, username: user.username };
                })
            );
            setMediaArray(mediaWithUserData);
        } catch (error) {
            console.error('Error fetching media or user data:', error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    console.log('mediaArray:', mediaArray);

    return (
        <>
            <h2>My Media</h2>
            <table>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Owner</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {mediaArray.map((item) => (
                    <MediaRow
                        key={item.media_id}
                        item={item}
                        setSelectedItem={setSelectedItem}
                    />
                ))}
                </tbody>
            </table>
            <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
        </>
    );
};

export default Home;