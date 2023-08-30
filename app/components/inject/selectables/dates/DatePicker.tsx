import React, { useState } from 'react';
import {
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
  OnTimeChangeProps,
} from '@elastic/eui';

export const DatePicker = ({
  start, 
  end,
  setStart,
  setEnd
}:any)  => {

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
    localStorage.setItem('start-date', JSON.stringify(start));
    localStorage.setItem('end-date', JSON.stringify(end));
  };

  return (
    <EuiSuperDatePicker
      start={start}
      end={end}
      onTimeChange={onTimeChange}
      width={'restricted'}
    />
  );
};