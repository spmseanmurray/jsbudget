import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function StandardSubmittableInput({
  id, type, placeholder, onChange, icon, value, onClick,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="label-text">{placeholder}</div>
      <div className="input-group">
        <input id={id} required type={type} value={value} placeholder={placeholder} className="input input-bordered w-full" onChange={onChange} />
        <button type="submit" className="input input-bordered border-l-0 hover:bg-base-content/30" onClick={onClick}>
          <FontAwesomeIcon
            icon={icon}
            size="xl"
            color="#a6adba"
          />
        </button>
      </div>
    </div>
  );
}

export default StandardSubmittableInput;
