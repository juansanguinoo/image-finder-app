import Form from './components/Form';
import React, { useState, useEffect } from 'react';
import ImageList from './components/ImageList';

function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (search === '') return;

    const consultAPI = async () => {
      const imagesPerPage = 30;
      const key = '30912023-59fafcc1a1e5a829f5f0e8ba4';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`;

      const response = await fetch(url);
      const result = await response.json();

      setImages(result.hits);

      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calculateTotalPages);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    };

    consultAPI();
  }, [search, currentPage]);

  const previousPage = () => {
    const newCurrentPage = currentPage - 1;

    if (newCurrentPage === 0) return;

    setCurrentPage(newCurrentPage);
  };

  const nextPage = () => {
    const newCurrentPage = currentPage + 1;

    if (newCurrentPage > totalPages) return;

    setCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Search Engine</p>
        <Form setSearch={setSearch} />
      </div>
      <div className="row justify-content-center">
        <ImageList images={images} />

        {currentPage === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={previousPage}>
            &laquo; Previous
          </button>
        )}
        {currentPage === totalPages ? null : (
          <button type="button" className="btn btn-info" onClick={nextPage}>
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
