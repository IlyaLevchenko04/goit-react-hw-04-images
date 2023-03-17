import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ resp, handleLargeImage, children }) => {
  return (
    <>
      <ul className="gallery">
        {resp.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              handleLargeImage={handleLargeImage}
            />
          );
        })}
      </ul>
      {children}
    </>
  );
};

ImageGallery.propTypes = {
  resp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleLargeImage: PropTypes.func.isRequired,
};
