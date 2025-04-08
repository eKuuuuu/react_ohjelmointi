import { useRef, useEffect } from 'react';

const SingleView = ({ item, setSelectedItem }) => {
    const dialogRef = useRef(null);

    // Open or close the dialog based on the item
    useEffect(() => {
        if (item) {
            openModal();
        } else {
            closeModal();
        }
    }, [item]);

    const openModal = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    return (
        <dialog ref={dialogRef}>
            {item && (
                <>
                    <button onClick={handleClose}>&#10005; Close</button>
                    {item.media_type.includes('video') ? (
                        <video src={item.filename} controls />
                    ) : (
                        <img src={item.filename} alt={item.title} />
                    )}
                    <h3>{item.title}</h3>
                    <p>{item.description || 'No description available.'}</p>
                    <p>Created At: {new Date(item.created_at).toLocaleString()}</p>
                    <p>File Size: {(item.filesize / 1024).toFixed(2)} KB</p>
                    <p>Media Type: {item.media_type}</p>
                </>
            )}
        </dialog>
    );
};

export default SingleView;