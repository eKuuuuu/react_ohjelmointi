import PropTypes from 'prop-types';

const MediaRow = ({ item, setSelectedItem }) => {
    return (
        <tr>
            <td>
                <img src={item.thumbnail} alt={item.title} />
            </td>
            <td>{item.title}</td>
            <td>{item.description || 'No description available.'}</td>
            <td>{new Date(item.created_at).toLocaleString()}</td>
            <td>{(item.filesize / 1024).toFixed(2)} KB</td>
            <td>{item.media_type}</td>
            <td>
                <button onClick={() => setSelectedItem(item)}>View</button>
            </td>
        </tr>
    );
};

MediaRow.propTypes = {
    item: PropTypes.object.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;