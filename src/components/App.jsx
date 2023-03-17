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

      setApiRespond(state => [...state, ...hits]);
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

// export class App extends Component {
//   state = {
//     q: '',
//     apiRespond: [],
//     modalImage: '',
//     status: 'idle',
//     modal: false,
//     pageCounter: 1,
//     totalImages: 0,
//   };

// componentDidUpdate(prevProps, prevState) {
//   const { q, pageCounter } = this.state;
//   if (q !== prevState.q || pageCounter !== prevState.pageCounter) {
//     this.setState({ status: 'pending' });

//     getImages(q, pageCounter).then(({ hits, totalHits }) => {
//       if (hits.length === 0) {
//         this.setState({ status: 'idle' });
//         return alert('There are no pictures');
//       }

//       return this.setState(prevState => {
//         return {
//           apiRespond: [...prevState.apiRespond, ...hits],
//           totalImages: totalHits,
//           status: 'resolved',
//         };
//       });
//     });
//   }
// }

// onSubmit = q => {
//   this.setState({ q, pageCounter: 1, apiRespond: [], totalImages: 0 });
// };

// handleModal = () => {
//   return this.setState(prevState => {
//     return { modal: !prevState.modal };
//   });
// };

// handleLargeImage = (modalImage = '') => {
//   this.handleModal();
//   this.setState({ modalImage });
// };

// handleLoadMore = () => {
//   this.setState(prevState => ({
//     pageCounter: prevState.pageCounter + 1,
//   }));
// };

//   render() {
//     const { status, modal, apiRespond, modalImage, totalImages } = this.state;

// if (status === 'idle') {
//   return <Searchbar onSubmit={this.onSubmit} />;
// }

// if (status === 'pending') {
//   return (
//     <>
//       <Searchbar onSubmit={this.onSubmit} />
//       <ImageGallery
//         handleLargeImage={this.handleLargeImage}
//         resp={apiRespond}
//       />
//       <Loader />
//     </>
//   );
// }

// if (status === 'resolved') {
//   return (
//     <>
//       <Searchbar onSubmit={this.onSubmit} />
//       <ImageGallery
//         handleLargeImage={this.handleLargeImage}
//         resp={apiRespond}
//       />
//       {apiRespond.length !== totalImages && (
//         <Button handleLoadMore={this.handleLoadMore} />
//       )}
//       {modal && (
//         <Modal
//           handleLargeImage={this.handleLargeImage}
//           imageInfo={modalImage}
//         />
//       )}
//     </>
//   );
// }
//   }
// }
