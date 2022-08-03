import React from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';

function StandardDatePicker({ selected, onChange, label }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="label-text">{label}</div>
      <div className="flex flex-row">
        <span className="bg-base-300 w-16 px-3 flex flex-grow flex-col justify-center rounded-l-lg">
          <FontAwesomeIcon icon={faCalendar} size="xl" />
        </span>
        <DatePicker
          className="input input-bordered rounded-l-none w-full"
          selected={selected}
          onChange={onChange}
          popperPlacement="top-start"
        />
      </div>
    </div>
  );
}

export default StandardDatePicker;
