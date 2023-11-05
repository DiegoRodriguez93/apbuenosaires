import React, { useState, useCallback } from 'react';
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import { Layout } from '../components/Layout';

type Range = {
  startDate?: Date;
  endDate?: Date;
  key?: string;
};

export const Reservas = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const onDatesChange = useCallback(({ startDate, endDate }: any) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  const onFocusChange = useCallback((focusedInput: FocusedInputShape | null) => {
    setFocusedInput(focusedInput);
  }, []);

  return (
    <Layout>
      <h1>Reservas</h1>
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
      />
      {/*       <DateRangePicker
        ranges={ranges}
        onChange={(item) => setRanges([item.selection])}
        locale={es}
        staticRanges={definedRanges}
      /> */}
    </Layout>
  );
};
