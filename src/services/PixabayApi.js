export const getImages = (q, pageCounter) => {
  return fetch(
    `https://pixabay.com/api/?q=${q}&page=${pageCounter}&key=32923550-e97d894c3a0a0654cb5be36c1&image_type=photo&orientation=horizontal&per_page=12`
  ).then(data => data.json());
};
