import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../contexts/UserContext';

const MediaRow = ({ item }) => {
    const { user } = UserContext();

    const isOwner = user && (user.role === 'admin' || user.id === item.ownerId);

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <span>{item.title}</span>
            <div className="flex space-x-2">
                <a
                    href={`/media/${item.id}`}
                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    View
                </a>
                {isOwner && (
                    <>
                        <button
                            className="px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => console.log('modify', item)}
                        >
                            Modify
                        </button>
                        <button
                            className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => console.log('delete', item)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

MediaRow.propTypes = {
    item: PropTypes.object.isRequired,
};

export default MediaRow;