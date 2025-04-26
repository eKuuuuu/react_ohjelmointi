import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLike } from '../hooks/apiHooks';
import { UserContext } from '../contexts/UserContext';

const Likes = ({ mediaId }) => {
    const { user } = UserContext();
    const { getLikesByMediaId, getLikesByUser, postLike, deleteLike } = useLike();
    const [likes, setLikes] = useState([]);
    const [userLikes, setUserLikes] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            const mediaLikes = await getLikesByMediaId(mediaId);
            setLikes(mediaLikes);

            if (user) {
                const userLikes = await getLikesByUser(user.id);
                setUserLikes(userLikes.some((like) => like.media_id === mediaId));
            }
        };

        fetchLikes();
    }, [mediaId, user, getLikesByMediaId, getLikesByUser]);

    const handleLike = async () => {
        if (userLikes) {
            await deleteLike(mediaId, user.token);
        } else {
            await postLike(mediaId, user.token);
        }
        const updatedLikes = await getLikesByMediaId(mediaId);
        setLikes(updatedLikes);
        setUserLikes(!userLikes);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`px-3 py-2 text-sm rounded ${
                    userLikes ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
                }`}
                onClick={handleLike}
                disabled={!user}
            >
                {userLikes ? 'Unlike ❤️' : 'Like 🤍'}
            </button>
            <span>{likes.length} Likes</span>
        </div>
    );
};

Likes.propTypes = {
    mediaId: PropTypes.number.isRequired,
};

export default Likes;