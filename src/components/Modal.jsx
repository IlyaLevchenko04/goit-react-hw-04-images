import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ imageInfo, handleLargeImage }) => {
  const onBakcdropClick = e => {
    if (e.currentTarget === e.target) {
      return handleLargeImage();
    }
  };

  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        return handleLargeImage();
      }
    };
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [handleLargeImage]);

  return (
    <div className="overlay" onClick={onBakcdropClick}>
      <div className="modal">
        <img src={imageInfo} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleLargeImage: PropTypes.func.isRequired,
  imageInfo: PropTypes.string.isRequired,
};
