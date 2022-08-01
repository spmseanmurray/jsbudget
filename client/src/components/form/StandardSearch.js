import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function StandardSearch({ onChange, onClick, placeholder }) {
  return (
    <div className="input-group justify-end">
      <input type="text" placeholder={placeholder} className="input input-bordered bg-neutral bg-opacity-50" onChange={(input) => onChange(input.target.value)} />
      <button type="submit" className="btn btn-square btn-primary" onClick={onClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default StandardSearch;
