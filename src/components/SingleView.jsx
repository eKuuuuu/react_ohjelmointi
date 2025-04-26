import PropTypes from 'prop-types';
import Likes from './Likes';

const SingleView = ({ item, setSelectedItem }) => {
    const handleClick = () => {
        setSelectedItem(null);
    };

    return (
        <>
            {item && (
                <dialog open>
                    <button onClick={handleClick}>&#10005;</button>
                    {item.media_type.includes('video') ? (
                        <video src={item.filename} controls />
                    ) : (
                        <img src={item.filename} alt={item.title} />
                    )}
                    <h3>Title: {item.title}</h3>
                    <p>Description: {item.description}</p>
                    <p>Uploader: {item.username || 'Unknown'}</p>
                    <p>Uploaded on: {new Date(item.upload_date).toLocaleString()}</p>
                    <p>File Size: {item.file_size} MB</p>
                    <p>Format: {item.media_type}</p>
                    <p>Views: {item.views || 0}</p>
                    <Likes mediaId={item.id} />
                </dialog>
            )}
        </>
    );
};

SingleView.propTypes = {
    item: PropTypes.object.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;