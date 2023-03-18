import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Button } from './Button';
import { Loader } from './Loader';
import { getImages } from '../services/PixabayApi';
import '../index.css';

export const App = () => {
  const [q, setQ] = useState('');
  const [apiRespond, setApiRespond] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [status, setStatus] = useState('idle');
  const [totalImages, setTotalImages] = useState(0);
  const [pageCounter, setPageCounter] = useState(1);
  const [modal, setModal] = useState(false);

  const handleLoadMore = () => {
    setPageCounter(state => state + 1);
  };

  const onSubmit = q => {
    setQ(q);
    setPageCounter(1);
    setApiRespond([]);
    setTotalImages(0);
  };

  const handleLargeImage = (modalImage = '') => {
    handleModal();
    setModalImage(modalImage);
  };

  const handleModal = () => {
    setModal(state => !state);
  };

  useEffect(() => {
    if (q === '') {
      return;
    }

    setStatus('pending');
    getImages(q, pageCounter).then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        setStatus('idle');
        return alert('There are no pictures');
      }

      const mapedHits = hits.map(({ id, webformatURL, largeImageURL }) => {
        return {
          id,
          webformatURL,
          largeImageURL,
        };
      });

      setApiRespond(state => [...state, ...mapedHits]);
      setTotalImages(totalHits);
      setStatus('resolved');
    });
  }, [q, pageCounter]);

  if (status === 'idle') {
    return <Searchbar onSubmit={onSubmit} />;
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery handleLargeImage={handleLargeImage} resp={apiRespond} />
        <Loader />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery handleLargeImage={handleLargeImage} resp={apiRespond} />
        {apiRespond.length !== totalImages && (
          <Button handleLoadMore={handleLoadMore} />
        )}
        {modal && (
          <Modal handleLargeImage={handleLargeImage} imageInfo={modalImage} />
        )}
      </>
    );
  }
};
