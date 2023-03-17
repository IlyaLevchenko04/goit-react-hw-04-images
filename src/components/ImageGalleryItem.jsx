import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  largeImageURL,
  handleLargeImage,
  webformatURL,
}) => {
  const onClick = e => {
    e.preventDefault();
    handleLargeImage(largeImageURL);
  };

  return (
    <li className="gallery-item item" onClick={onClick}>
      <img src={webformatURL} alt="" className="image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  handleLargeImage: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
