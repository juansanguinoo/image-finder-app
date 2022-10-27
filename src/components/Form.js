import React, { useState } from 'react';
import Error from './Error';

const Form = ({ setSearch }) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term.trim() === '') {
      setError(true);
      return;
    }

    setError(false);
    setSearch(term);

    // Send to main component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for an image, e.g. football or coffee"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Search"
          />
        </div>
      </div>

      {error ? <Error message="Add a search term" /> : null}
    </form>
  );
};

export default Form;
