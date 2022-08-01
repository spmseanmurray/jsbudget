import React from 'react';

function StandardSelect({
  id, placeholder, options, onChange, value,
}) {
  return (
    <div className="flex flex-grow flex-col gap-2">
      <div className="label-text">{placeholder}</div>
      <select id={id} required disabled={options.length < 1} value={value} className="select select-bordered w-full" onChange={onChange}>
        <option key="" value="" hidden>
          {placeholder}
        </option>
        {options.map((option) => <option key={option} value={option} className="min-h-3">{option}</option>)}
      </select>
    </div>
  );
}

export default StandardSelect;
