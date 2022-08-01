import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function StandardInput({
  id, type, placeholder, onChange, icon, value,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="label-text">{placeholder}</div>
      {icon ? (
        <div className="input-group">
          <span className="w-16 justify-center">
            <FontAwesomeIcon icon={icon} size="xl" />
          </span>
          <input id={id} required type={type} value={value} placeholder={placeholder} className="input input-bordered w-full" onChange={onChange} />
        </div>
      ) : (
        <input id={id} required type={type} value={value} placeholder={placeholder} className="input input-bordered w-full" onChange={onChange} />
      ) }
    </div>
  );
}

export default StandardInput;
